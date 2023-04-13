/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen  } from '@testing-library/react';
import { PhotoChoose } from '../components/molecule/PhotoChoose';
import '@testing-library/jest-dom';


jest.mock('@auth0/nextjs-auth0/client');


describe('PhotoChoose', () => {
    test('renders input field for selecting an image', () => {
        render(<PhotoChoose />);

        const labelElement = screen.getByText(/Bitte wählen Sie ein Foto aus oder machen Sie ein neues Foto!/i);
        expect(labelElement).toBeInTheDocument();
    });
});
