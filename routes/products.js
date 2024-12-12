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
        console.error('Fel vid hämtning av produkter:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    console.log('Förfrågan mottagen med ID:', req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
        console.log('Felaktigt ID-format');
        return res.status(400).json({ message: 'Felaktigt ID-format' });
    }

    try {
        const product = await Product.findById(req.params.id);
        console.log('Produkt funnen:', product);
        if (!product) {
            console.log('Produkt inte hittad');
            return res.status(404).json({ message: 'Produkt inte hittad' });
        }
        res.json(product);
    } catch (error) {
        console.error('Fel vid hämtning av produkt:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
