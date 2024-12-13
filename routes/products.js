const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { ObjectId } = require('mongoose').Types;

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id.replace(/[<>]/g, ''); 

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Felaktigt ID-format' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produkt inte hittad' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
