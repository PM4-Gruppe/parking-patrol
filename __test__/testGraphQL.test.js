import { gql } from '@apollo/client'

describe('GraphQL', () => {
    it('The ok query should return true', async () => {
        const mockClient = {
            query: jest.fn().mockResolvedValue({
                data: { ok: true },
                errors: undefined
            })
        }

        const response = await mockClient.query({ query: gql`
                query {
                    ok
                }
            `})
        
        expect(response.errors).toBeUndefined()
        expect(response.data.ok).toBe(true)
    });

    it('should return the correct amount of license plates', async () => {
        const mockClient = {
            query: jest.fn().mockResolvedValue({
                data: { parkedCars: [
                    {numberPlate: 'SH 69', controlTime: '2021-05-01T12:00:00.000Z', model: '118i', color: 'Schwarz', latitude: 12, longitude: 13, carInspector: 'Wachtmeister Barbrady', photoPath: '/test/test.jpg'},
                    {numberPlate: 'ZH 1234', controlTime: '2022-03-03T11:33:55.000Z', model: 'Polo', color: 'Blau', latitude: 13, longitude: 15, carInspector: 'Lieutenant Dawson', photoPath: '/test/test2.jpg'},
                    {numberPlate: 'SG 911', controlTime: '2023-01-01T11:33:55.000Z', model: '911', color: 'Rot', latitude: 10, longitude: 11.5, carInspector: 'Officer Stevens', photoPath: '/test/test3.jpg'},
                ]},
                errors: undefined
            })
        }
        const count = 3;

        const response = await mockClient.query({ query: gql`
                query {
                    parkedCars {
                        numberPlate
                    }
                }
            `})
        
        expect(response.errors).toBeUndefined()
        expect(response.data.parkedCars).toHaveLength(count)
    });
});