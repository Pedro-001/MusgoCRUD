var express = require('express');
var router = express.Router();

/* GEt home page */
router.get('/', function(req,res,next) {
    res.render('about-me', {
        me:{
            name: 'Pedro Alberto',
            last_name: 'Barrios Molina',
            favorite_food: 'Tostadas',
            size: '1.70m',
            weight: '85kg'
        }      
    });
});

module.exports = router;