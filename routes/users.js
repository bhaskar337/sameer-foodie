var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res, next) {
    
    var id = 1;
    getProfile(id, function (user) {
        res.render('profile', user);
    });
});

module.exports = router;

function getProfile(id, callback) {
    // get all profile info
    var result =
        {
            _id: 1,
            name: "Bhaskar Barua",
            items: [
                { item_id: 2, name: "Eggs", quantity: 5 },
                { item_id: 12, name: "Bread", quantity: 2 }
            ]
        };
    return callback(result)
}
