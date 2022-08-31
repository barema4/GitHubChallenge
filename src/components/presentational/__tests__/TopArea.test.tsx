import React from 'react'
import { render, screen } from '@testing-library/react'
import { TopArea } from '../TopArea';
import { ThemeContextProvider } from '../../../contexts/ThemeContext'

describe('Search a user', () => {
    it('Search a user by his github user name', async () => {
        render(<ThemeContextProvider> <TopArea username="barema4"
            name='barema'
            joinedAt='12/3/2021'
            bio='Hello world'
            pfp='well' /></ThemeContextProvider>)
        const element = screen.getByTestId('bio')
        expect(await screen.findByText('12/3/2021')).toBeInTheDocument()
        expect(await screen.findByText('barema')).toBeInTheDocument()
        expect(element.innerHTML).toBe('Hello world')
    })
})