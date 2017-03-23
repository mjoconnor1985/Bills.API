const express = require('express');
const router = express.Router();

const BillsService = require('./bills.service');

//Todo: this should be injected using DI container.
const billsService = new BillsService();

router.get('/', function (req, res) {
    billsService.getBills()
        .then((bills) => res.status(200).json(bills))
        .catch((error) => {
            console.log('error: ${error}');
            res.status(500).json({error});
        });
});

router.get('/:id', function (req, res) {
    billsService.findBill(req.params.id)
        .then((bill) => res.status(200).json(bill))
        .catch((error) => {
            console.log('error: ' + error);
            res.status(500).send({error: error});
        });
});

router.post('/', function (req, res) {
    if (!req.body.name || !req.body.amount)
        res.status(400).send({error: 'Bad request'});

    const newBill = {
        name: req.body.name,
        amount: req.body.amount,
        active: req.body.active
    };

    billsService.createBill(newBill)
        .then((bill) => {
            res.location('/bills/' + bill._id);
            res.status(201).json(bill);
        })
        .catch((error) => {
            console.log('error: ' + error);
            res.status(500).send({error: error});
            ;
        });

});

router.put('/', function (req, res) {
    if (!req.body._id || !req.body.name || !req.body.amount)
        res.status(400).send({error: 'Bad request'});

    billsService.updateBill(req.body)
        .then((bill) => {
            res.status(200).json(bill.doc);
        })
        .catch((error) => {
            console.log('error: ' + error);
            res.status(500).send({error: error});
        });

});

router.delete('/:id', function (req, res) {
    billsService.deleteBill(req.params.id)
        .then((bill) => res.status(204).send('Deleted'))
        .catch((error) => {
            console.log('error: ' + error);
            res.status(500).send({error: error});
        });
});

module.exports = router;