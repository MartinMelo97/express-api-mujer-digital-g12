const express = require('express');

const app = express();

// www.google.com?hola=mundo&mundo=hola
// www.google.com/hola/mundo

app.get('/', function(req, res) {
    res.status(200).json({
        message: 'Hola Mundo Mujer Digital!'
    });
});

app.get('/:name', function(req, res) {
    const name = req.params.name;
    res.status(200).json({
        message: `Hola! ${name}, bienvenido a mi API`
    });
});

app.listen(8080, function() {
    console.log('La API está corriendo en el puerto 8080');
});