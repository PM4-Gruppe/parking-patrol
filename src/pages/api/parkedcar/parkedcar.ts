import { CREATE_PARKED_CAR } from '../../../graphql/mutations/parkedCar.create';
import { useMutation } from '@apollo/client'

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        // Process a POST request
        try {
            const { numberPlate, controlTime, modelName, manufacturer, colorName, latitude, longitude, carInspector, photoPath } = req.body;

            /*const [createParkedCarVariable, { data, loading, error }] = useMutation(CREATE_PARKED_CAR);

            createParkedCarVariable({
                variables: {
                    numberPlate: numberPlate,
                    carModel: modelName,
                    carManufacturer: manufacturer,
                    carColor: colorName,
                    latitude: latitude,
                    longitude: longitude,
                    carInspector: carInspector,
                    photoPath: photoPath,
                },
            });*/

            res.status(201).json('data');
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.status(405).json({ message: 'Method not allowed.' });
    }
}