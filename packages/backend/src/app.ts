import express, { Request, Response } from 'express';
import { setupOrthographyChecker } from 'orthography-lib';

const app = express();
const port = 3000;
const aiApiKey = process.env['AI_API_KEY'];

if (!aiApiKey) {
    throw new Error("Environmental variable AI_API_KEY not set! Cannot start the service.");
}

const checkOrthograhpy = setupOrthographyChecker(aiApiKey);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/check', (req: Request, res: Response) => {
    const text = req.body.text;
    checkOrthograhpy(text).subscribe((results) => res.json({ results }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
