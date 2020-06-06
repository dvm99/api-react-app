const express = require('express');
const router = express.Router();

//Initial API dataset
let data = [
    {
        id: 0,
        username: 'Diego V.M.',
        email: 'diego@email.nl',
        telephone: '+123123123',
        role: 'Admin',
        description: 'This person is admin',
    },
    {
        id: 1,
        username: 'Test User',
        email: 'test@user.com',
        telephone: '+555000555',
        role: 'Mod',
        description: 'This was fetched from the rest API',
    }
];

// HTTP methods.

// READ
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
router.post('/', function (req, res) {
    let itemIds = data.map(item => item.id);
    let orderNums = data.map(item => item.order);

    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

    let newItem = {
        id: newId,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        role: req.body.role,
        description: req.body.description,
    };

    data.push(newItem);

    res.status(201).json(newItem);
});

// UPDATE
router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let updated = {
            id: found.id,
            username: found.username,
            email: found.email,
            telephone: found.telephone,
            role: req.body.role,
            description: req.body.description,
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updated);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
router.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});


module.exports = router;