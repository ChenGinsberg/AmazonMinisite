var express = require('express');
var router = express.Router();
var amazon = require('amazon-product-api');

var client = amazon.createClient({
    awsId: "AKIAIGPXP7LQ6BFJSBEQ",
    awsSecret: "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",
    awsTag: "testabc044-20"
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        results: undefined
    });
});

router.post('/search', function (req, res, next) {

    client.itemSearch({
        keywords: req.body.keyword,
        responseGroup: 'ItemAttributes,Offers,Images,OfferFull'
    }).then(function (data) {
        res.render('templates/products', {
            results: data
        });

    }).catch(function (err) {

        res.send({
            error: err
        });
    });
});

router.get('/searchItem', function (req, res, next) {

    client.itemLookup({
        itemId: req.param('itemId'),
        responseGroup: 'ItemAttributes,Offers,Images,OfferFull'
    }).then(function (data) {

        res.render('templates/item', {
            results: data
        });
    }).catch(function (err) {

        res.send({
            error: err
        });
    });

});



module.exports = router;