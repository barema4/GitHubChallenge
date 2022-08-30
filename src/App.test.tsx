import { describe, expect, it } from 'vitest'
import App from './App'
import { render, screen, fireEvent } from '@testing-library/react';

describe('Test the app.js file', () => {

    it('uses block in app header', async () => {
        render(<App />)
        const element = screen.getByRole('banner')
        expect(element.className).toEqual('sc-bczRLJ iiCTS')
        expect(getComputedStyle(element).display).toEqual('block')
    })
    it('end to end test', async () => {
        render(<App />)
        const element = screen.getByTestId('username')
        fireEvent.change(element, { target: { value: 'barema4' } })
        const button = screen.getByTestId('search-username')
        fireEvent.click(button)
        expect(await screen.findByText('Fetching User')).toBeInTheDocument()
        const bioElement = screen.getByTestId('bio')
        expect(await screen.findByText('Joined 21 09 2017')).toBeInTheDocument()
        expect(await screen.findByText('@barema4')).toBeInTheDocument()
        expect(bioElement.innerHTML).toBe("A software engineer who loves solving problems and learning. I am proficient in Vue.js, React.js and Python")
    })
})