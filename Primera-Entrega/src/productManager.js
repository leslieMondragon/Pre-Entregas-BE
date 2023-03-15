const path = require('path');
const fs = require('fs/promises');

const pathJson = path.join(`${__dirname}/../db/item.json`);


class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
    }
    //obtener todos los productos
    getProducts = async ()=>{
        try {
            const content = await fs.readFile(this.path);
            if(content.length === 0){
                console.log('Products no found');
                return content;
            } 
            return content;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
    //agregar un producto
    addProduct = async (product)=>{
        try {
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            // Validacion de datos recibidos
            if (product.id || product.title || product.description || product.price || product.code || product.stock || product.category || product.thumbnails) {
                this.products.push(product);
                console.log(`Product ${product.title} add`);
                await fs.writeFile(pathJson, JSON.stringify(this.products, null, 2));
            } else {
                console.error(`Error: Code repetido. El code ${product.code} ya esta en uso`);
            }
        } catch (error) {
            console.error('Error: No se pudo agregar el producto');
            throw new Error(error);
        }
    };
    //obtener productos por su id
    getProductById = async (id)=>{
        try {
            let fileProducts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            //Busqueda de producto por id
            let productFound = fileProducts.find(product => product.id === Number(id));
            if(productFound){
                console.log(`Product with id:${id} was founded`);
                return productFound;
            }else{
                console.log(`Error: Product with id: ${id}, not founded`);
            };
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };
    //actualizar un producto
    updateProduct = async(id, data) =>{
        try {
            let fileProducts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            let productFoundIndex = fileProducts.findIndex(prod => prod.id === Number(id));
            if(productFoundIndex < 0){
                return `Product id: ${id}, not found`;
            }else{
                fileProducts[productFoundIndex] = {id: id, ...data};
                await fs.writeFile(this.path, JSON.stringify(fileProducts,null,2));
                console.log("Product update Succefully");
            }
        } catch (error) {
            console.log(`Error: the Product wasn't update`);
            throw new Error(error);
        }
    };
    //eliminar un producto por su id
    deleteProduct = async (id)=>{
        try {
            if(!id){
                throw new Error('Missing Id');
            }
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const findProducts = products.find(product => product.id == id);
            if(findProducts){
                let index = products.indexOf(findProducts);
                products.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log(`Product Id: ${id} deleted`); 
            }else{
                throw Error (`Product with id: ${id} doesn't exist`);
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
};

module.exports = ProductManager