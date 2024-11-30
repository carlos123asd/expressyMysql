import express  from 'express';

export const bufferToJSONResMiddleware = (req:express.Request,res:express.Response,next:express.NextFunction) => {
    const originalJson = res.send();
    console.log(originalJson)
    // Sobrescribir `res.json` para interceptar la respuesta
   /* res.json = function (data) {
        try {
            // Verificar si el data tiene la estructura esperada
            if (Array.isArray(data) && data[1] && Array.isArray(data[1]) && data[1][0]) {
                const firstItem = data[1][0];
                if (firstItem._buf && firstItem._buf.type === 'Buffer' && Array.isArray(firstItem._buf.data)) {
                    // Convertir el buffer a string UTF-8
                    const buffer = Buffer.from(firstItem._buf.data);
                    const utf8String = buffer.toString('utf8');

                    // Intentar parsear el número si está contenido en la string
                    const number = parseInt(utf8String, 10);

                    // Devolver solo el número o la string en caso de que no sea un número válido
                    return originalJson.call(this, isNaN(number) ? utf8String : number);
                }
            }
        } catch (error) {
            console.error('Error procesando la respuesta:', error);
        }

        // En caso de error o estructura inesperada, enviar los datos originales
        return originalJson.call(this, data);
    };*/
    next();
};
