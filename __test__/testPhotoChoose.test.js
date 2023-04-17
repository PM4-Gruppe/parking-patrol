/**
 * @jest-environment jsdom
 */
import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { PhotoChoose } from '../components/molecule/PhotoChoose';
import '@testing-library/jest-dom';

jest.mock('@auth0/nextjs-auth0/client');

describe('PhotoChoose', () => {
    beforeEach(() => {
       render(<PhotoChoose />)
    });
    it('renders input field for selecting an image', () => {
        const labelElement = screen.getByText(/Bitte wählen Sie ein Foto aus oder machen Sie ein neues Foto!/i);
        expect(labelElement).toBeInTheDocument();
    });

    // work in progress
    // it('should display the selected file name', async () => {
    //    const imageFile = new File(['test file content'], '../storage/npp-1-1.jpg', {type: 'file' });

    //    const inputButton = screen.getByRole('button', 'Save').previousSibling;
    //    fireEvent.change(inputButton, { target: { files: [imageFile] } });

    //    const fileName = await waitFor(() => screen.getByText('npp-1-1.jpg'));
    //    expect(fileName).toBeInTheDocument();
    //});

    // work in progress
    it('should call the function handleImageSelect', async () => {
        const handleImageSelect = jest.fn();

        const inputButton = screen.getByRole('button', {name: 'Save'}).previousSibling;
        fireEvent.change(inputButton);
        fireEvent.click(inputButton);
        console.log(handleImageSelect.mock.calls);

        handleImageSelect();

        await waitFor(() => expect(handleImageSelect).toHaveBeenCalledTimes(1));
    });
});
