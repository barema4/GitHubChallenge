import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TopArea } from '../TopArea';
import { ThemeContextProvider } from '../../../contexts/ThemeContext'

describe('Search a user', () => {
    it('Search a user by his github user name', async () => {
        render(<ThemeContextProvider> <TopArea setUser={() => { }} /></ThemeContextProvider>)

        const element = screen.getByTestId('username')
        fireEvent.change(element, { target: { value: 'barema4' } })
        const button = screen.getByTestId('search-username')
        fireEvent.click(button)
        expect(await screen.findByText('Fetching User')).toBeInTheDocument()
    })
})