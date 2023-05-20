/**
 * @jest-environment jsdom
 */
import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { PhotoChoose } from '../src/components/molecule/PhotoChoose';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { LocalEndpoint } from '../src/lib/ApiEndpoints/LocalEndpoint';
import {toastSuccess} from '../src/lib/toasts';
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock';
import fs from 'fs';

global.fetch = fetchMock;
global.URL.createObjectURL = jest.fn();
let PHOTO_FILE = './__test__/testImages/npp-1-2.jpg';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

jest.mock('../src/lib/toasts', () => ({
    toastSuccess: jest.fn(),
}));

jest.mock('../src/lib/ApiEndpoints/LocalEndpoint');

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

    it('goes back when the "Zurück" button is clicked', async () => {
        render(<PhotoChoose/>);
        const backButton = screen.getByRole('button', { name: 'Zurück' });
        fireEvent.click(backButton);
        await waitFor(() => expect(useRouter().back).toHaveBeenCalledTimes(1));
    });

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

    it('should update brand state and informationBrand state correctly', () => {
        render(<PhotoChoose />);
        const brandInput = screen.getByPlaceholderText('Marke');

        fireEvent.change(brandInput, { target: { value: 'New Brand' } });
        expect(brandInput.value).toBe('New Brand');

        const informationBrandText = screen.getByText('done');
        expect(informationBrandText).toBeInTheDocument();
    });

    it('should update model state and informationModel state correctly', () => {
       render(<PhotoChoose />);
       const modelInput = screen.getByPlaceholderText('Modell');

       fireEvent.change(modelInput, { target: { value: 'New Model' } });
       expect(modelInput.value).toBe('New Model');

       const informationModelText = screen.getByText('done');
       expect(informationModelText).toBeInTheDocument();
    });

    it('should handle submit correctly', async () => {
        const mockPostRequest = jest.fn();
        const photoFile = fs.readFileSync(PHOTO_FILE);
        const photoData = new File([photoFile], 'npp-1-2.jpg', { type: 'image/jpeg' });
        LocalEndpoint.prototype.postRequest = mockPostRequest;

        render(<PhotoChoose />);

        const imageInput = screen.getByTitle('file');
        const submitButton = screen.getByText('Prüfen');

        fireEvent.change(imageInput, { target: { files: [photoData] } });

        mockPostRequest.mockResolvedValueOnce({ success: true });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(toastSuccess).toHaveBeenCalledTimes(1);
            expect(toastSuccess).toHaveBeenCalledWith('Das Foto wurde erfolgreich hochgeladen!');
        });
    });

});