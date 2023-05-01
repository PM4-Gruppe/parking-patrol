import { createParkedCar } from '../../../utils/createParkedCar';

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        // Process a POST request
        try {
            const { numberPlate, controlTime, modelName, manufacturer, colorName, latitude, longitude, carInspector, photoPath } = req.body;
            const newParkedCar = await createParkedCar(numberPlate, controlTime, modelName, manufacturer, colorName, latitude, longitude, carInspector, photoPath);
            res.status(201).json(newParkedCar);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.status(405).json({ message: 'Method not allowed.' });
    }
}