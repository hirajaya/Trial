import mongoose from "mongoose";

const orderIdPattern = /^O\d{1,3}$/;
const driverIdPattern = /^D\d{1,3}$/;

const inquirySchema = new mongoose.Schema({
    intype:{
        type: String,
        required:true,
        enum: ['Refund','Undelivered'],
        message:'Invalid value for input'
    },
    orderid:{
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return orderIdPattern.test(value);
            },
            message: props => `${props.value} is not a valid order ID. It should start with 'O' followed by up to 3 digits.`
        }
    },
    placementDate: {
        type: Date,
        required: true
    },
    driverid:{
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return driverIdPattern.test(value);
            },
            message: props => `${props.value} is not a valid Driver's ID. It should start with 'D' followed by up to 3 digits.`
        }
    },
    deliveryDate:{
        type: Date,
        required: true
    },
    indescription:{
        type: String,
        required: true
    },
    imagePath: {
        type: String, 
        required: true
    },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;