const express = require('express');
const router = express.Router();

const bills = require('../models/bill.js');

router.get('/', function (req, res) {
    bills.find({}, function (err, bills) {
        if (err) {
            return res.status(500).json({error: err});
        }
        res.status(200).json(bills);
    });
});

router.get('/:id', function (req, res) {
    bills
        .findById(req.params.id, function (err, bill) {
            if (err) {
                return res.status(500).json({error: err});
            }
            return res.status(200).json(bill);
        });
});

router.post('/', function (req, res) {
    if (!req.body.name) {
        return res.status(400).send({error: 'Bad request'});
    }

    let newBill = {
        name: req.body.name,
        amount: req.body.amount,
        active: req.body.active,
        dueInterval: req.body.dueInterval
    }

    let bill = new bills(newBill);

    bill.save(function (err) {
        return res.status(500).json({error: err});
    });

    return res.status(201).send('Added');
});

router.put('/', function (req, res) {
    if (!req.body._id) {
        return res.status(400).send({error: 'Bad request'});
    }

    bills.findByIdAndUpdate(req.body._id, req.body, function (err, bill) {
        if (err) {
            return status(500).send({error: err});
        }
        return res.status(200).json(req.body);
    });
});

router.delete('/:id', function (req, res) {
    bills.remove({_id: req.params.id}, function (err, bill) {
        if (err) {
            return req.status(500).json({error: err});
        }
        return res.status(204).send("Bill _id:" + req.params.id + " delete.");
    });
});

module.exports = router;