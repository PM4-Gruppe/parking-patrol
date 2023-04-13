/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/organism/Header';
import { useUser } from '@auth0/nextjs-auth0/client';

jest.mock('@auth0/nextjs-auth0/client');

describe('Header', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('shoul render a header with a login button if no user is logged in', () => {
        useUser.mockReturnValue({ user: null });

        const { getByText } = render(<Header />);

        expect(getByText('HEADER')).toBeInTheDocument();
        expect(getByText('Link zu Github Repo:')).toBeInTheDocument();
        expect(getByText('Login')).toBeInTheDocument();
    });
});
