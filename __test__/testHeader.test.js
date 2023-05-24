/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../src/components/organism/Header';
import { useUser } from '@auth0/nextjs-auth0/client';

jest.mock('@auth0/nextjs-auth0/client');

const mockUser = {
    email: process.env.AUTH0_EMAIL,
    email_verified: true,
    sub: process.env.AUTH0_SUB,
}

describe('Header', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render a header with a login button if no user is logged in', () => {
        useUser.mockReturnValue({ user: null });

        const { getByText } = render(<Header />);

        expect(getByText('Login')).toBeInTheDocument();
    });

    it('should render a header with a logout button if a user is logged in', () => {
        useUser.mockReturnValue({ user: mockUser });
        const { getByAltText } = render(<Header />);

        expect(getByAltText('logoutIcon')).toBeInTheDocument();
    });
});
