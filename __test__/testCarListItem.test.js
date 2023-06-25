/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CarListItem } from '../src/components/atom/CarListItem';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';
import '@testing-library/jest-dom';

jest.mock('next/link', () => ({ children }) => children); // Mock the next/link component

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('CarListItem', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({});
    });

    it('should render the car information correctly', () => {
        const plateNumber = 'ABC123';
        const date = '2023-06-12';
        const carType = 'Example Car';
        const carPath = '/path/to/car';

        render(
            <CarListItem
                plateNumber={plateNumber}
                date={date}
                carType={carType}
                carPath={carPath}
            />
        );

        const plateNumberElement = screen.getByText(plateNumber);
        const dateElement = screen.getByText(date);
        const carTypeElement = screen.getByText(carType);

        expect(plateNumberElement).toBeInTheDocument();
        expect(dateElement).toBeInTheDocument();
        expect(carTypeElement).toBeInTheDocument();
    });
});
