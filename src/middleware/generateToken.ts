import jwt from 'jsonwebtoken';

export default function generateAccessToken(userid:string) {
    return jwt.sign({_id: userid}, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });
}
