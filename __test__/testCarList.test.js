import renderer from 'react-test-renderer';
import Home from '../src/pages/carlist';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../src/lib/apollo';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

console.error = jest.fn();

describe('Home', () => {
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
                    <Home />
                </ApolloProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
