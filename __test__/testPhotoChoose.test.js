/**
 * @jest-environment jsdom
 */
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { CreateParkedCar } from '../src/components/organism/CreateParkedCar';
import { getPhotoInformations } from '../src/lib/photoAnalyzer';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

jest.mock('../src/lib/photoAnalyzer', () => ({
    getPhotoInformations: jest.fn()
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

jest.mock('../src/lib/toasts', () => ({
    toastSuccess: jest.fn(),
}));

jest.mock('../src/lib/ApiEndpoints/LocalEndpoint');

describe('CreateParkedCar', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({
            back: jest.fn(),
        })
    })

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('checks if the text "Bitte geben Sie eine Marke ein." is rendered', () => {
        render(<CreateParkedCar/>)
        const labelElement = screen.getByText('Bitte geben Sie eine Marke ein.');
        expect(labelElement).toBeInTheDocument();
    });

    it('goes back when the "Zurück" button is clicked', async () => {
        render(<CreateParkedCar/>);
        const backButton = screen.getByRole('button', { name: 'Zurück' });
        fireEvent.click(backButton);
        await waitFor(() => expect(useRouter().back).toHaveBeenCalledTimes(1));
    });

    it('renders the "Prüfen" button', () => {
        render(<CreateParkedCar />);
        const checkButton = screen.getByRole('button', { name: 'Prüfen' });
        expect(checkButton).toBeInTheDocument();
    });

    it('renders the "Zurück" button', () => {
        render(<CreateParkedCar />);
        const backButton = screen.getByRole('button', { name: 'Zurück' });
        expect(backButton).toBeInTheDocument();
    });

    it('renders the input field, to choose a file', () => {
        render(<CreateParkedCar />);
        const fileInput = screen.getByTitle('file');
        expect(fileInput).toBeInTheDocument();
    });

    it('should display license plate after image selection', async () => {
        render(<CreateParkedCar/>);
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

    it('should update brand state and informationBrand state correctly', () => {
        render(<CreateParkedCar />);
        const brandInput = screen.getByPlaceholderText('Marke');

        fireEvent.change(brandInput, { target: { value: 'New Brand' } });
        expect(brandInput.value).toBe('New Brand');

        const informationBrandText = screen.getByText('done');
        expect(informationBrandText).toBeInTheDocument();
    });

    it('should update model state and informationModel state correctly', () => {
       render(<CreateParkedCar />);
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

        render(<CreateParkedCar />);

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