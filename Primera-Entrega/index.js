const express = require ('express');
const app = express();

const port = 8080;

const productsRouter = require('./routes/productsRouter.js');
const cartsRouter = require('./routes/cartRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen (port, ()=> console.log(`Listening on port: ${port}`));
