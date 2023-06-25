/**
 * @jest-environment jsdom
 */
import {render} from '@testing-library/react';
import { Widget } from '../src/components/molecule/Widget';
import '@testing-library/jest-dom'

describe('Widget', () => {
    test('renders with title and children', () => {
        const title = 'My Widget';
        const content = <div>Widget content</div>;
        const { getByText } = render(<Widget title={title}>{content}</Widget>);
        const titleElement = getByText(title);
        const contentElement = getByText('Widget content');
        expect(titleElement).toBeInTheDocument();
        expect(contentElement).toBeInTheDocument();
    });
});