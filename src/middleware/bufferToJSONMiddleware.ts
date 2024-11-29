import express  from 'express';
export const bufferToJSONMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Procesar el body del request si es un Buffer
    if (req.body.length > 0 && req.body instanceof Buffer) {
        try {
            req.body = JSON.parse(req.body.toString());
        } catch (err) {
            return res.status(400).json({ 
                body: req.body, 
                length: req.body.length, 
                error: 'Invalid JSON data in request body' 
            });
        }
    }

    // Interceptar y transformar el response si es un Buffer
    const originalSend = res.send; // Guardar referencia al método original

    res.send = function (body: any) {
        if (body instanceof Buffer) {
            try {
                const jsonResponse = JSON.parse(body.toString());
                return originalSend.call(this, jsonResponse); // Enviar JSON transformado
            } catch (err) {
                return originalSend.call(this, body); // Enviar el Buffer original si no es JSON válido
            }
        }
        return originalSend.call(this, body); // Enviar el body sin modificar si no es Buffer
    };

    next();
};
