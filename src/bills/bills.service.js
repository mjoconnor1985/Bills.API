const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Bills = require('./bill');

//Todo: put database calls in repository
class BillsService {
    getBills() {
        return Bills.find({}).exec();
    }

    findBill(id) {
        return Bills.findById(id).exec();
    }

    createBill(bill) {
        let newBill = new Bills(bill);

        return newBill.save();
    }

    updateBill(bill) {
        return Bills.findByIdAndUpdate(bill._id, bill).exec();
    }

    deleteBill(id) {
        return Bills.findByIdAndRemove(id).exec();
    }
}

module.exports = BillsService;