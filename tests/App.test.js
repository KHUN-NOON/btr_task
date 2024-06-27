import { describe } from "vitest"
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App Test', () => {
    it('renders the App Component', () => {
        render(<App/>)

        screen.debug()
    })
})