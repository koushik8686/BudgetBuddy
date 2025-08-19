import jwt from 'jsonwebtoken';

export function generateToken(user) {
    const token = jwt.sign(
        { userId: user._id, email: user.email , name: user.name , image: user.image },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    return token;
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}