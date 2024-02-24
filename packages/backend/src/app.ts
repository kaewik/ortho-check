import cors from 'cors';
import express, { Request, Response } from 'express';
import { setupOrthographyChecker } from 'orthography-lib';

const app = express();
const port = 3000;
const apiKey = process.env['AI_API_KEY'];
const model = process.env['AI_MODEL'];

if (!apiKey) {
    throw new Error("Environmental variable AI_API_KEY not set! Cannot start the service.");
}

if (!model) {
    throw new Error("Environmental variable AI_MODEL not set! Cannot start the service.");
}

const checkOrthograhpy = setupOrthographyChecker({
    apiKey,
    modelConfig: {
        model,
        temperature: 0.0,
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/check', (req: Request, res: Response) => {
    const text = req.body.text;
    checkOrthograhpy(text).subscribe((results) => res.json({ results }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
