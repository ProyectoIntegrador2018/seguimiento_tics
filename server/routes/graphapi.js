const express = require('express');
const GraphController = require('../controller/GraphController');
const router = express.Router();

router.get('/gender-demographic', function(req, res) {
    GraphController.fetchGenderITGraph(function(data) {
        res.send(data);
    });
});

router.get('/age-demographic', function(req, res) {
    GraphController.fetchAgeITGraph(function(data) {
        res.send(data);
    });
});

module.exports = router;