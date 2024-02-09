const express = require('express');
const dotenv = require('dotenv');
const { products } = require('./database');

dotenv.config();

const app = express();

// Products Endpoints

// 1. GET /products -> Todos los productos
// 2. GET /products/1 -> Entrega UN sólo producto
// 3. POST /products -> Crear un nuevo producto
// 4. PUT /products/1 -> Editar un producto
// 5. PATCH /products/1 -> Editar un producto (parcial)
// 6. DELETE /products/1 -> Elimina un producto

app.get('/products', function(req, res) {
    return res.status(200).json(products);
});

app.get('/products/:id', function(req, res) {
    // Siempre que leemos valores desde req.params
    // el valor que leemos es de tipo STRING.
    const { id } = req.params;

    const product = products.find(function(product) {
        return product.id === Number(id)
    });

    if (!product) {
        return res.status(404).json({
            message: 'No se encontró el producto con el ID: ' + id
        })
    }

    return res.status(200).json(product);
});

app.get('/', function(req, res) {
    return res.status(200).json({
        message: 'Hola Mundo Mujer Digital 2!'
    });
});

app.get('/:name', function(req, res) {
    const { name } = req.params;
    return res.status(200).json({
        message: `Hola! ${name}, bienvenido a mi API`
    });
});

const port = process.env.PORT;

app.listen(port, function() {
    console.log('La API está corriendo en el puerto ' + port);
});