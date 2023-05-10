/**
 * @jest-environment jsdom
 */
import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { PhotoChoose } from '../src/components/molecule/PhotoChoose';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock';
import fs from 'fs';

global.fetch = fetchMock;
global.URL.createObjectURL = jest.fn();
let PHOTO_FILE = './storage/npp-1-2.jpg';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

describe('PhotoChoose', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({
            back: jest.fn(),
        })

    })

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('checks if the text "Bitte geben Sie eine Marke ein." is rendered', () => {
        render(<PhotoChoose/>)
        const labelElement = screen.getByText('Bitte geben Sie eine Marke ein.');
        expect(labelElement).toBeInTheDocument();
    });

    /*it('calls handleImageSelect when a file is selected', async () => {
        const handleImageSelectMock = jest.fn();
        const { getByTitle } = render(<PhotoChoose/>);
        const input = getByTitle('file');
        fireEvent.click(input);
        await waitFor(() => expect(handleImageSelectMock).toHaveBeenCalledTimes(1));
    });*/

    // it('calls handleSubmit when the "Prüfen" button is clicked', async () => {
    //     const handleSubmitMock = jest.fn();
    //     render(<PhotoChoose/>);
    //     const checkButton = screen.getByRole('button', { name: 'Prüfen' });
    //     fireEvent.click(checkButton);
    //     await waitFor(() => expect(handleSubmitMock).toHaveBeenCalledTimes(1));
    // });
    //
    // it('calls handleBackButton when the "Zurück" button is clicked', async () => {
    //     const handleBackButtonMock = jest.fn();
    //     render(<PhotoChoose/>);
    //     const backButton = screen.getByRole('button', { name: 'Zurück' });
    //     fireEvent.click(backButton);
    //     await waitFor(() => expect(handleBackButtonMock).toHaveBeenCalledTimes(1));
    // });

    it('renders the "Prüfen" button', () => {
        render(<PhotoChoose />);
        const checkButton = screen.getByRole('button', { name: 'Prüfen' });
        expect(checkButton).toBeInTheDocument();
    });

    it('renders the "Zurück" button', () => {
        render(<PhotoChoose />);
        const backButton = screen.getByRole('button', { name: 'Zurück' });
        expect(backButton).toBeInTheDocument();
    });

    it('renders the input field, to choose a file', () => {
        render(<PhotoChoose />);
        const fileInput = screen.getByTitle('file');
        expect(fileInput).toBeInTheDocument();
    });

    it('should display license plate after image selection', async () => {
        render(<PhotoChoose/>);
        const expected = 'AA-123-AA';
        const photoFile = fs.readFileSync(PHOTO_FILE);
        const photoData = new File([photoFile], 'npp-1-2.jpg', { type: 'image/jpeg' });
        const fileInput = screen.getByTitle('file');

        // Mocked response from fetch
        const mockedResponse = {
            json: async () => ({
                results: [{ plate: expected }]
            }),
        };

        global.fetch = jest.fn().mockResolvedValue(mockedResponse);
        fireEvent.change(fileInput, { target: { files: [photoData] } });
        await waitFor( () => expect(screen.getByPlaceholderText('Autonummer').value).toEqual(expected));
    });

    it('should handle file upload error', async () => {
        /*const checkButton = screen.getByRole('button', { name: 'Prüfen' });
        fireEvent.click(checkButton);*/
    });

    it('should handle error while getting license plate information', async () => {

    });
});