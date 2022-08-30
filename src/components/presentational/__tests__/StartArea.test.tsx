import React from 'react'
import { render, screen } from '@testing-library/react'
import { StartArea } from '../StartArea';
import { ThemeContextProvider } from '../../../contexts/ThemeContext'

describe('Search a user on github', () => {
    it('Displaying user github repos followers and following', async () => {
        render(<ThemeContextProvider> <StartArea repos="3" followers="20" following="15" /></ThemeContextProvider>)
        const element = screen.getByTestId('following')
        expect(element.innerHTML).toBe('15')
        expect(await screen.findByText('3')).toBeInTheDocument()
        expect(await screen.findByText('20')).toBeInTheDocument()

    })
})