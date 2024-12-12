const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { ObjectId } = require('mongoose').Types;

// GET all products
router.get('/', async (req, res) => {
    try {
        res.json(await Product.find());
    } catch(error) {
        res.json({message: error});
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await Product.findById(req.params.id));
    } catch(error) {
        res.json({message: error});
    }
});

module.exports = router;