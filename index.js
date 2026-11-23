import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import rutasProductos from "./src/routes/products.routes.js";
import authRouter from './src/routes/auth.routes.js';

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
});

// Rutas
app.use("/api", rutasProductos);
app.use("/auth", authRouter);

// Middleware 404 para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found", message: `El recurso ${req.url} no se encuentra.` });
});

// Middleware global de manejo de errores (incluye JSON malformado)
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed" || (err instanceof SyntaxError && err.status === 400)) {
        return res.status(400).json({
            error: "Bad Request",
            message: "El cuerpo de la petición no es un JSON válido."
        });
    }
    console.error("Error no controlado:", err);
    res.status(500).json({
        error: "Internal Server Error",
        message: "Ocurrió un error interno en el servidor."
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});