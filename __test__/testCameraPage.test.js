import renderer from 'react-test-renderer';
import Camera from '../src/pages/camera';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../src/lib/apollo';
import { gql } from '@apollo/client/core';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@apollo/client', () => {
    const actualModule = jest.requireActual('@apollo/client');
    return {
        ...actualModule,
        gql: actualModule.gql || gql,
    };
});

console.error = jest.fn();

describe('Camera', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({
            back: jest.fn(),
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should match snapshot', () => {
        const tree = renderer
            .create(
                <ApolloProvider client={apolloClient}>
                    <Camera />
                </ApolloProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
