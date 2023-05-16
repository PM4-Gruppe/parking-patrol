import handler from '../src/pages/api/parkedcar/parkedcar';
import { createParkedCar, findCarModel } from '../src/lib/createParkedCar';


jest.mock('../src/lib/createParkedCar', () => ({
    createParkedCar: jest.fn(),
    findCarModel: jest.fn(),
}));

describe('handler', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            method: 'POST',
            body: {
                numberPlate: 'ABC123',
                controlTime: '2023-05-16T12:00:00Z',
                modelName: 'ExampleModel',
                manufacturer: 'ExampleManufacturer',
                colorName: 'Red',
                latitude: 123.456,
                longitude: 789.012,
                carInspector: 'John Doe',
                photoPath: './testImages/npp-1-2.jpg',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new parked car and return it with status 201', async () => {

    });

    test('should handle errors and return status 500 with error message', async () => {
        const errorMessage = 'Method not allowed.';

    });

    test('should return status 405 for any other HTTP method', async () => {
        req.method = 'GET';

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed.' });
        expect(findCarModel).not.toHaveBeenCalled();
        expect(createParkedCar).not.toHaveBeenCalled();
    });
});

