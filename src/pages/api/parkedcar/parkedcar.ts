

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request

        res.status(201).json({ message: 'New parked car created successfully.' });
    } else {
        // Handle any other HTTP method
        res.status(405).json({ message: 'Method not allowed.' });
    }
}