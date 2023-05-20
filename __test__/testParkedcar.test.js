import handler from '../src/pages/api/parkedcar/parkedcar';
import { createParkedCar } from '../src/lib/createParkedCar';

const PHOTO_PATH = './__test__/testImages/npp-1-2.jpg';

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
                photoPath: PHOTO_PATH,
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

    it('should create a new parked car and return it with status 201', async () => {
        const parkedCar = {
            numberPlate: 'ABC123',
            controlTime: '2023-05-16T12:00:00Z',
            carModel: {
                modelName: 'ExampleModel',
                manufacturer: 'ExampleManufacturer',
            },
            carColor: {
                colorName: 'Red',
            },
            latitude: 123.456,
            longitude: 789.012,
            carInspector: 'John Doe',
            photoPath: PHOTO_PATH,
        };

        createParkedCar.mockResolvedValueOnce(parkedCar);

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(parkedCar);
    });

    it('should handle errors and return status 500 with error message', async () => {
        const errorMessage = 'Error message';
        createParkedCar.mockRejectedValueOnce(new Error(errorMessage));

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });

    });

    it('should return status 405 for any other HTTP method', async () => {
        req.method = 'GET';

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed.' });
        expect(createParkedCar).not.toHaveBeenCalled();
    });
});

