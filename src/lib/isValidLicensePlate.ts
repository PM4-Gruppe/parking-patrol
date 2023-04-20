export function isValidLicensePlate(licencePlate: string): boolean {
    const regex = new RegExp('[a-zA-Z]{2}[0-9]{1,6}$') //two letters and 1-6 numbers
    return regex.test(licencePlate)
}