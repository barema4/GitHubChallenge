import { describe, expect, it } from 'vitest'
import App from './App'
import { render, screen } from '@testing-library/react';

describe('Test the app.js file', () => {

    it('uses block in app header', async () => {
        render(<App />)
        const element = screen.getByRole('banner')
        expect(element.className).toEqual('sc-bczRLJ iiCTS')
        expect(getComputedStyle(element).display).toEqual('block')
    })
})