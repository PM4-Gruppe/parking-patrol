/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home, { AllVehiclesQuery } from '../pages/index';
import { MockedProvider } from '@apollo/client/testing';
import { withPageAuthRequired as mockWithPageAuthRequired } from '@auth0/nextjs-auth0';

jest.mock('@auth0/nextjs-auth0', () => ({
    withPageAuthRequired: jest.fn(),
}));

const mockUser = {
    email: process.env.AUTH0_EMAIL,
    email_verified: true,
    sub: process.env.AUTH0_SUB,
};

const mockData = {
    data: {
        parkedCars: [
            {
                numberPlate: 'ABC-123',
                photoPath: '/images/car1.jpg',
            },
            {
                numberPlate: 'XYZ-789',
                photoPath: '/images/car2.jpg',
            },
        ],
    },
};

const mocks = [
    {
        request: {
            query: AllVehiclesQuery,
        },
        result: mockData,
    },
];

describe('Home', () => {
    beforeEach(() => {
        mockWithPageAuthRequired.mockImplementation((component) => component);
    });

    it('should render a list of parked cars', async () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Home />
            </MockedProvider>,
            {
                // pass in the user object as a prop to the mockWithPageAuthRequired function
                wrapper: ({ children }) => mockWithPageAuthRequired(children, { user: mockUser })
            }
        );

        expect(mockWithPageAuthRequired).toHaveBeenCalled(); // check if the authentication function is called
        expect(mockWithPageAuthRequired).toHaveBeenCalledWith(expect.anything(), { user: mockUser }); // check if the authentication function is called with the correct arguments


        expect(getByText('Loading...')).toBeInTheDocument();

        await waitForElementToBeRemoved(() => getByText('Loading...')); // wait for the loading to finish

        expect(getByText('ABC-123')).toBeInTheDocument(); // check if the first car is rendered
        expect(getByText('XYZ-789')).toBeInTheDocument(); // check if the second car is rendered
    });
});
