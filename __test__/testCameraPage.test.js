import React from 'react';
import renderer from 'react-test-renderer';
import Camera from '../src/pages/camera';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Camera', () => {
    beforeEach(() => {
        mocked(useRouter).mockReturnValue({
            back: jest.fn(),
        })
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    it('should match snapshot', () => {
        const tree = renderer.create(<Camera />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});