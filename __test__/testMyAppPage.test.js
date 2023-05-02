import React from 'react';
import renderer from 'react-test-renderer';
import MyApp from '../src/pages/_app';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('MyApp', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({
            back: jest.fn(),
        })
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    it('renders correctly', () => {
        // const tree = renderer
        //     .create(
        //         <MyApp Component={() => <div>Test Component</div>} pageProps={{}}/>
        //     )
        //     .toJSON()
        // expect(tree).toMatchSnapshot()
    })
})