/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import handler from '../src/pages/api/image-storage/image-upload';
import { NextApiHandler } from 'next';

describe('image-upload', () => {
    it('calls handler function', async () => {

    });

    it('returns a 500 status code', async () => {
        const req = {
            method: 'POST',
            body: {},
            files: {
                image: {
                    path: 'test-image.jpg',
                    name: 'test-image.jpg',
                },
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        await handler(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });

    it('returns a 200 status code', async () => {

    });
});