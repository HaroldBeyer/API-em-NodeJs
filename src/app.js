const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conexão ao banco
mongoose.connect('mongodb+srv://haroldo:q64uWtGFRWQ8Vy8e@api-node-zwpyg.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

//Models
const Product = require('./models/product');

// -------DEFINIÇÃO DE ROTAS ----------
const indexRoute = require('./routes/index');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexRoute);
app.use('/products', productRoute);


module.exports = app;