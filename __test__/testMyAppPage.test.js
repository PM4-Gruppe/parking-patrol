import renderer from 'react-test-renderer';
import MyApp from '../src/pages/_app';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../src/components', () => 'Layout')
jest.mock('@auth0/nextjs-auth0/client', () => ({
    UserProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('../src/lib/apollo', () => ({
    __esModule: true,
    default: {
        query: () => {},
    },
}))

jest.mock('next/link', () => {
    const Link = ({ children, ...props }) => (
        <a {...props}>{children}</a>
    );
    Link.displayName = 'Link';
    return Link;
});

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
        const tree = renderer.create(<MyApp Component={() => <div>Test Component</div>} pageProps={{}} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})