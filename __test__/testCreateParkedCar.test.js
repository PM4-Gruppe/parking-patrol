/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { CreateParkedCar } from '../src/components/organism/CreateParkedCar';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { LocalEndpoint } from '../src/lib/ApiEndpoints/LocalEndpoint';
import {toastError} from '../src/lib/toasts';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import fs from 'fs';
import { gql } from '@apollo/client/core';
import apolloClient from '../src/lib/apollo';


global.fetch = fetchMock;
global.URL.createObjectURL = jest.fn();
let PHOTO_FILE = './__test__/testImages/npp-1-2.jpg';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../src/lib/toasts', () => ({
    toastSuccess: jest.fn(),
    toastError: jest.fn(),
}));

jest.mock('@apollo/client', () => {
    const actualModule = jest.requireActual('@apollo/client');
    return {
        ...actualModule,
        gql: actualModule.gql || gql,
    };
});

jest.mock('@auth0/nextjs-auth0/client', () => ({
    UserProvider: ({ children }) => <div>{children}</div>,
}));

describe('CreateParkedCar', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({
            back: jest.fn(),
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('goes back when the "Zurück" button is clicked', async () => {
        render(
            <ApolloProvider client={apolloClient}>
                <CreateParkedCar />
            </ApolloProvider>
        );
        const backButton = screen.getByRole('button', { name: 'Zurück' });
        fireEvent.click(backButton);
        await waitFor(() => expect(useRouter().back).toHaveBeenCalledTimes(1));
    });

    it('renders the "Speichern" button', () => {
        render(
            <ApolloProvider client={apolloClient}>
                <CreateParkedCar />
            </ApolloProvider>
        );
        const checkButton = screen.getByRole('button', { name: 'Speichern' });
        expect(checkButton).toBeInTheDocument();
    });

    it('should display license plate after image selection', async () => {
        render(
            <ApolloProvider client={apolloClient}>
                <CreateParkedCar />
            </ApolloProvider>
        );

        const expected = 'AA-123-AA';
        const fileInput = screen.getByRole('textbox', {
            class: 'displayflex flex-col items-center justify-center w-full p-2 file:bg-green-700 file:hover:bg-green-800 file:text-white text-white file:rounded-lg file:border-transparent my-2',
        });

        fireEvent.change(fileInput, { target: { value: expected } });
        // Mocked response from fetch
        const mockedResponse = {
            json: () => Promise.resolve({ informationText: { expected } }),
        };

        global.fetch = jest.fn().mockResolvedValue(mockedResponse);
        await waitFor(() => expect(screen.getByPlaceholderText('Autonummer').value).toEqual(expected));
    });

    it('should handle submit correctly, when provided with wrong data', async () => {
        render(
            <ApolloProvider client={apolloClient}>
                <CreateParkedCar/>
            </ApolloProvider>
        );

        const photoFile = fs.readFileSync(PHOTO_FILE);
        const photoData = new File([photoFile], 'npp-1-2.jpg', { type: 'image/jpeg' });
        const mockPostRequest = jest.fn();

        LocalEndpoint.prototype.createImage = mockPostRequest;

        const fileInput = screen.getByRole('textbox', {
            class: 'displayflex flex-col items-center justify-center w-full p-2 file:bg-green-700 file:hover:bg-green-800 file:text-white text-white file:rounded-lg file:border-transparent my-2',
        });
        const submitButton = screen.getByText('Speichern');

        // Provide a file to CreateParkedCar component
        fireEvent.change(fileInput, { target: { files: [photoData] } });

        mockPostRequest.mockResolvedValueOnce({ success: true });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(toastError).toHaveBeenCalledTimes(1);
            expect(toastError).toHaveBeenCalledWith('Bitte wählen Sie ein Foto aus!');
        });
    });
});
