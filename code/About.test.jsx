import { render, screen } from '@testing-library/react'
import About from '../pages/about'

describe('About', () => {

    it('should containe the text "About"', () => {
        render(<About />);

        const getElm = screen.getByText(/About/i);

        expect(getElm).toBeInTheDocument();
    });

    it('should containe the text "Back to the homse page"', () => {
        render(<About />);

        const getElm = screen.getByText(/Back to the home page/i);

        expect(getElm).toBeInTheDocument();
    });

    it('should containe the text "Lorem ipsum"', () => {
        render(<About />);

        const getElm = screen.getByText(/Lorem ipsum dolor sit amet/i);

        expect(getElm).toBeInTheDocument();
    });
});