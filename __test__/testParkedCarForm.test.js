/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import apolloClient from '../src/lib/apollo';
import { ParkedCarForm } from '../src/components/molecule/ParkedCarForm';

global.fetch = fetchMock;

describe('ParkedCarForm', () => {
    it('renders the input field, to choose a file', () => {
        render(
            <ApolloProvider client={apolloClient}>
                <ParkedCarForm />
            </ApolloProvider>
        );
        const fileInput = screen.getByRole('textbox', {
            class: 'displayflex flex-col items-center justify-center w-full p-2 file:bg-green-700 file:hover:bg-green-800 file:text-white text-white file:rounded-lg file:border-transparent my-2',
        });
        expect(fileInput).toBeInTheDocument();
    });
});