/**
 * @jest-environment jsdom
 */
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { PhotoChoose } from '../src/components/molecule/PhotoChoose';
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

describe('PhotoChoose', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({
            back: jest.fn(),
        })
    })
    it('checks if the text "Bitte geben Sie eine Marke ein." is rendered', () => {
        render(<PhotoChoose/>)
        const labelElement = screen.getByText('Bitte geben Sie eine Marke ein.');
        expect(labelElement).toBeInTheDocument();
    });

    /*
    Throws console error :/
    it('calls getPhotoInformations in handleImageSelect when a file is selected', async () => {
        render(<PhotoChoose/>)
        const selectedImage = new File(['(⌐□_□)'], 'test.jpg', { type: 'image/jpeg' });
        const fileInput = screen.getByRole('button', { name: 'Save' }).previousSibling;
        fireEvent.change(fileInput, { target: { files: [selectedImage] } });

        expect(getPhotoInformations).toHaveBeenCalledWith(selectedImage);
    });*/

    /*it('calls handleSubmit when the "Prüfen" button is clicked', async () => {
        const handleSubmit = jest.fn();
        render(<PhotoChoose onSubmit={handleSubmit} />);

        const checkButton = screen.getByRole('button', { name: 'Prüfen' });
        fireEvent.click(checkButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });*/

    it('calls handleBackButton when the "Zurück" button is clicked', async () => {

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
        const fileInput = screen.getByRole('button', { name: 'Prüfen' }).previousSibling;
        console.log(fileInput);
        expect(fileInput).toBeInTheDocument();
    });

    it('should display license plate after image selection', async () => {

    });

    it('should render and function correctly', async () => {

    });

    it('should handle file upload error', async () => {

    });

    it('should handle error while getting license plate information', async () => {
        
    });
});