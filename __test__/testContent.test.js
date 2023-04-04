const { render, screen } = require('@testing-library/react')
const Home = require('../pages/index')
import '@testing-library/jest-dom'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /welcome to next\.js!/i,
        })

        expect(heading).toBeInTheDocument()
    })
})