import Home from '../src/pages/index'
import renderer from 'react-test-renderer'
import React from 'react'

jest.mock('next/link', () => {
    const Link = ({ children, ...props }) => (
        <a {...props}>{children}</a>
    );
    Link.displayName = 'Link';
    return Link;
});

describe('Home', () => {
    it('should match snapshot', () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});