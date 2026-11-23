import { generateToken } from '../utils/token-generator.js';
const default_user = {
    id: 1,
    email: "admin@gmail.com",
    password: "123456"
}

export async function login(req, res) {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: "Se requieren email y password" });
    }
    // Aquí deberías verificar las credenciales del usuario
    // Ejemplo de usuario autenticado
    const user = { id: 1, email };
    if (email === default_user.email
        && password === default_user.password) {
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.status(401).json({ error: "Credenciales inválidas" });
    }
}