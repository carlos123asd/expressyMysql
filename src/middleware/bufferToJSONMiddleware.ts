import express  from 'express';
export const bufferToJSONMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.body.length > 0 && req.body instanceof Buffer) {
        try {
            req.body = JSON.parse(req.body.toString());
        } catch (err) {
            return res.status(400).json({ body: req.body, length: req.body.length, error: 'Invalid JSON data' });
        }
	}
	next();
};