const express = require('express');
const { number } = require('joi');
const joi = require('joi');
const {join} = require("path");
const app = express();
app.use(express.json());

var products = [
    {
    id:1,    
    name: "Van Huesen",    
    total_quantity:120,    
    type_of_product:"shirt",    
    price : 600    
    },

    {
        id:2,    
        name: "Nike",    
        total_quantity:100,    
        type_of_product:"T-shirt",    
        price : 850    
        },

        {
            id:3,    
            name: "Monte Carlo",    
            total_quantity:50,    
            type_of_product:"Sweater",    
            price : 1800    
            },    
    ]

    app.get("/products", function(req,res){
        res.send(products);
    });

    app.get("/products/:id", function(req,res){
        var productId = req.params.id;
        var product = products.find((c)=> c.id === parseInt(productId));
        if(!product){
            res.status(404).send("Product is not in the Stock");
        }
        else res.send(product);
    });

        
    app.get("/productsname/:name", function(req,res){
        const productName = req.params.name;
        var product = products.find((c) => c.name === productName);
        if(!product){        
            res.status(404).send("Product not found");
        }
        else res.send(product);
        console.log("Hello");
    });
    
    app.post("/product", function(req,res){
        const validateResult = validateProduct(req.body);
        if(validateResult.error) res.send(validateResult.error);
        else{
            var product = {
                id: products.length + 1,
                name: req.body.name,
                total_quantity: req.body.total_quantity,
                type_of_product: req.body.type_of_product,
                price: req.body.price 
            };  
            products.push(product);
            res.send(product);
        }
    });

    app.put("/products/:id", function(req,res) {
        const validateResult = validateProduct(req.body);
        if(validateResult.error) res.send(validateResult);
        else{
            var productId = req.params.id;
            var productIndex = products.findIndex((product)=>product.id === parseInt(productId));
            products[productIndex].name = req.body.name;
            products[productIndex].type_of_product = req.body.type_of_product;
            products[productIndex].total_quantity = req.body.total_quantity;
            products[productIndex].price = req.body.price;
            res.send(products[productIndex]);
        }
    });

    app.delete("/product/:id", function(req,res){
        const productId = req.params.id;
        const productIndex = products.findIndex((product) => product.id === parseInt(productId));
        const deletedProduct = products.splice(productIndex,1);
        res.send(deletedProduct);
    })


    function validateProduct(product) {
        const schema = joi.object({
            name:String,
            total_quantity:Number,
            type_of_product:String,
            price:Number
        });

        try{
            const result = schema.validate(product);
            return result;
        } catch (err){
            return err;
        }
    }

    app.listen(5000);
    console.log("Listening"); 

    