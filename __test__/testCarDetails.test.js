import renderer from 'react-test-renderer';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../src/lib/apollo';
import Cardetails from '../src/pages/cardetails';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

console.error = jest.fn();

describe('Cardetails', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({
            query: { carpath: 'test-carpath.jpg' },
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
                    <Cardetails />
                </ApolloProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
