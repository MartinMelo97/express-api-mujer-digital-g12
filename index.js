const express = require('express');
const dotenv = require('dotenv');
const { products } = require('./database');

dotenv.config();

const app = express();

// Configuraciones básicas de Express
app.use(express.json()); // Permite recibir datos en formato JSON en las peticiones

// urlencoded = Formatear datos como query strings
// Me permite leer datos enviarlos como query strings en las peticiones
// { extended: false } es para que internamente se use la librería querystring
app.use(express.urlencoded({ extended: false }))

// ¿Qué es un querystring?
// Una forma de enviar datos mediante la URL de la petición
// Siempre que veamos un signo de interrogración (?), lo que esté a su derecha
// son querystring

// ?<key1>=<value1>&<key2>=<value2>&...&<keyN>=<valueN>

// https://    www.youtube.com      /watch          ? v = LkxVA-qs7es
// https://    www.youtube.com      /watch          ? v = F4neLJQC1_E
// protocolo       dominio         ruta, URI           querystring     

// https:// -> Protocolo
// www.google.com -> Dominio
// ------- inicia ruta o URI
// /maps/place -> namespace
// /Estadio+Hidalgo -> Query Params
// /@20.1051503,-98.7586285,17z/ -> Query Params 
// termina ruta o URL ----------------
// ?entry=ttu -> Query String

// Products Endpoints

// /products -> Namespace

// Reglas para RESTful API
// 1. Todos los endpoints inicien con el mismo namespace
// 2. El namespace siempre debe ser en plural

// 1. GET /products -> Todos los productos ✅
// 2. GET /products/1 -> Entrega UN sólo producto ✅
// 3. POST /products -> Crear un nuevo producto
// 4. PUT /products/1 -> Editar un producto
// 5. PATCH /products/1 -> Editar un producto (parcial)
// 6. DELETE /products/1 -> Elimina un producto

// Endpoint estático -> No recibe ninguna variable en la petición
// por lo tanto la respuesta siempre será la misma
app.get('/products', function(req, res) {
    return res.status(200).json(products);
});

// Endpoint dinámico -> Recibe valores en la URL de la petición
// (id, query params). Dependiendo del valor del id, vamos a obtener
// una respuesta diferente.
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

app.post('/products', function(req, res) {
    const data = req.body;

    // TODO: Agregar validaciones

    products.push(data)
    return res.status(201).json(products);
});

app.put('/products/:id', function(req, res){
    const { id } = req.params;

    const productIndex = products.findIndex(function(product) {
        return product.id === Number(id)
    });

    if (productIndex === -1) {
        return res.status(404).json({
            message: 'No se encontró el producto con el ID:' + id
        })
    }

    const product = products[productIndex];
    const newProduct = req.body;

    // Sobreescribir la data actual con la data nueva (que llega en la petición)
    const updatedProduct = Object.assign(product, newProduct);

    products[productIndex] = updatedProduct;

    return res.status(200).json(products);
});

app.delete('/products/:id', function(req, res) {
    const { id } = req.params;

    const productIndex = products.findIndex(function(product) {
        return product.id === Number(id)
    });

    if (productIndex === -1) {
        return res.status(404).json({
            message: 'No se encontró el producto con el ID:' + id
        })
    }

    products.splice(productIndex, 1);

    return res.status(200).json(products)

});

app.get('/', function(req, res) {
    return res.status(200).json({
        message: 'Hola Mundo Mujer Digital 2'
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