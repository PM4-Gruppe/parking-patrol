import { isValidLicensePlate } from '../src/lib/isValidLicensePlate';

describe('isValidLicensePlate', () => {
    it('should return true for valid license plates', () => {
        expect(isValidLicensePlate('AB1234')).toBe(true);
        expect(isValidLicensePlate('CD56789')).toBe(true);
        expect(isValidLicensePlate('EF123456')).toBe(true);
    });

    it('should return false for invalid license plates', () => {
        expect(isValidLicensePlate('A')).toBe(false); // too short
        expect(isValidLicensePlate('123456789')).toBe(false); // no letters and too long
        expect(isValidLicensePlate('A12345B')).toBe(false); // letters and numbers reversed
        expect(isValidLicensePlate('ABC12345D')).toBe(false); // too long
        expect(isValidLicensePlate('aBc12341422')).toBe(false); // lowercase letters
        expect(isValidLicensePlate('AB* 1234')).toBe(false); // space and special character
    });
});