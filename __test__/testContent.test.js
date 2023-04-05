/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home, { AllVehiclesQuery } from '../pages/index';

const mocks = [
    {
        request: {
            query: AllVehiclesQuery,
        },
        result: {
            data: {
                vehicles: [
                    {
                        id: '1',
                        licensePlate: {
                            sign: 'ABC123',
                            owner: {
                                firstname: 'John',
                                lastname: 'Doe',
                            },
                        },
                    },
                    {
                        id: '2',
                        licensePlate: {
                            sign: 'DEF456',
                            owner: {
                                firstname: 'Jane',
                                lastname: 'Doe',
                            },
                        },
                    },
                ],
            },
        },
    },
];

describe('Home', () => {
    it('renders fetched content and hardcoded content', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Home />
            </MockedProvider>
        );

        // Wait for the loading state to resolve
        await waitFor(() => expect(screen.getByText('Fetched content:')).toBeInTheDocument());

        // Check that the fetched content is rendered
        expect(screen.getByText('ABC123')).toBeInTheDocument();
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('DEF456')).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();

        // Check that the hardcoded content is rendered
        expect(screen.getByText('Hardcoded content:')).toBeInTheDocument();
        expect(screen.getByText('Missing key')).toBeInTheDocument();
    });
});
