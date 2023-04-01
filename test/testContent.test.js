const { render } = require('@testing-library/react');
const MyApp = require('../pages/_app').default;

describe('MyApp', () => {
    test('displays hard coded features', async () => {
        const { getByText } = render(<MyApp />);
        const feature1 = getByText('Feature 1');
        const feature2 = getByText('Feature 2');
        const feature3 = getByText('Feature 3');
        expect(feature1).toBeInTheDocument();
        expect(feature2).toBeInTheDocument();
        expect(feature3).toBeInTheDocument();
    });
});