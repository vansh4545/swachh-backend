import jwt from 'jsonwebtoken';
import 'dotenv/config';

const decodeToken = (token) => {
    try {
        const objId = jwt.verify(token, process.env.TOKEN_KEY);
        return objId;
    } catch(err) {
        return err.message;
    }
}

export default decodeToken;