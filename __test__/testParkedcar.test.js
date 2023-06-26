const { createContext } = require('react');
const { emptyParkedCar, ParkedCarStore } = require('../src/lib/parkedCar');

jest.mock('../src/lib/parkedCar', () => {
    const { emptyParkedCar } = jest.requireActual('../src/lib/parkedCar');
    return {
        ...jest.requireActual('../src/lib/parkedCar'),
        ParkedCarStore: jest.fn().mockImplementation(() => ({
            parkedCar: emptyParkedCar,
        })),
    };
});

describe('ParkedCar', () => {
    it('should provide the correct initial context value', () => {
        const carInformations = new ParkedCarStore();
        const contextValue = { carInformations };

        expect(carInformations.parkedCar).toEqual(emptyParkedCar);

        const context = createContext(contextValue);

        expect(context._currentValue).toEqual(contextValue);
    });

    it('should update the parkedCar property correctly', () => {
        const carInformations = new ParkedCarStore();
        const contextValue = { carInformations };

        const context = createContext(contextValue);

        const newCarInformations = { parkedCar: { numberPlate: 'ABC123', controlTime: new Date() } };

        context._currentValue.carInformations = newCarInformations;

        expect(context._currentValue.carInformations.parkedCar).toEqual(expect.objectContaining({
            numberPlate: newCarInformations.parkedCar.numberPlate,
            controlTime: newCarInformations.parkedCar.controlTime,
        }));
    });

    it('should have a valid emptyParkedCar object', () => {
        expect(emptyParkedCar).toBeDefined();
        expect(emptyParkedCar.numberPlate).toEqual('');
        expect(emptyParkedCar.controlTime).toBeInstanceOf(Date);
        expect(emptyParkedCar.model).toEqual('Nicht erkennbar');
        expect(emptyParkedCar.manufacturer).toEqual('Nicht erkennbar');
        expect(emptyParkedCar.color).toEqual('Nicht verfügbar');
        expect(emptyParkedCar.latitude).toEqual(0);
        expect(emptyParkedCar.longitude).toEqual(0);
        expect(emptyParkedCar.carInspector).toEqual('');
        expect(emptyParkedCar.photoPath).toEqual('');
    });
});
