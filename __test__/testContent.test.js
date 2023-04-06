/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing'
import Home, { AllVehiclesQuery } from '../pages/index'

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
                            sign: 'ABC-123',
                            owner: {
                                firstname: 'John',
                                lastname: 'Doe',
                            },
                        },
                    },
                    {
                        id: '2',
                        licensePlate: {
                            sign: 'XYZ-789',
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
]

describe('Home', () => {
    it('renders fetched data from Apollo client', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Home />
            </MockedProvider>
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        expect(await screen.findByText('ABC-123')).toBeInTheDocument()

        expect(await screen.findByText('XYZ-789')).toBeInTheDocument()
    })
})
