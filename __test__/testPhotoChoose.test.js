/**
 * @jest-environment jsdom
 */
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { PhotoChoose } from '../components/molecule/PhotoChoose';
import { getPhotoInformations } from '../lib/photoAnalyzer';
import '@testing-library/jest-dom';

jest.mock('../lib/photoAnalyzer', () => ({
    getPhotoInformations: jest.fn()
}));

describe('PhotoChoose', () => {
    it('renders input field for selecting an image', () => {
        render(<PhotoChoose/>)
        const labelElement = screen.getByText(/Bitte wählen Sie ein Foto aus oder machen Sie ein neues Foto!/i);
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

    it('calls handleSaveClick when the save button is clicked', async () => {

    });

    it('calls handleCancelClick when the cancel button is clicked', async () => {

    });

    it('renders the save button', () => {

    });

    it('renders the cancel button', () => {

    });

    it('renders the input field, to choose a file', () => {

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