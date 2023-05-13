import {LocalEndpoint} from '../src/lib/ApiEndpoints/LocalEndpoint';

describe('LocalEndpoint', () => {
    describe('getRequest', () => {
        it('should call fetch with the correct URL', async () => {
            const endpoint = new LocalEndpoint();
            const mockResponse = { data: 'test data' };
            global.fetch = jest.fn().mockResolvedValue({
                json: () => Promise.resolve(mockResponse),
            });

            const path = '/test';
            const expectedUrl = `${endpoint.url}${path}`;
            await endpoint.getRequest(path);

            expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
        });

        it('should return the expected data', async () => {
            const endpoint = new LocalEndpoint();
            const mockResponse = { data: 'test data' };
            global.fetch = jest.fn().mockResolvedValue({
                json: () => Promise.resolve(mockResponse),
            });

            const path = '/test';
            const result = await endpoint.getRequest(path);

            expect(result).toEqual(mockResponse);
        });
    });
});