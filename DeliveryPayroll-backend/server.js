const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// create an instance of express
const app = express();
app.use(express.json());
app.use(cors())


// creating Schema
const Dpayschema = new mongoose.Schema({
    DeliveryId: {
        type: String,
        required: true
    },
    DeliveryName: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    MonthofPayment: {
        type: String,
        required: true
    },
    PaymentMethod: {
        type: String,
        required: true
    },
    NoOfDeliveries: {
        type: Number,
        required: true,
        default: 0
    },
    Deduction: {
        type: Number
    },
    Payment: {
        type: Number
    },
    NetPay: {
        type: Number
    }
});

// creating a new Model
const DpayModel = mongoose.model('Dpay', Dpayschema);

//connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-app')
    .then(() => {
        console.log('DB CONNECTED');
    })
    .catch((err) => {
        console.log(err);
    });

// create a delivery payroll
app.post('/Deliverypayroll', async (req, res) => {
    const {  DeliveryId, DeliveryName, PhoneNumber, MonthofPayment, PaymentMethod, NoOfDeliveries, Deduction } = req.body;

    const Payment = NoOfDeliveries * 500;
    const NetPay = Payment - Deduction;

    try {
        const newDpayroll = new DpayModel({
            DeliveryId,
            DeliveryName,
            PhoneNumber,
            MonthofPayment,
            PaymentMethod,
            NoOfDeliveries,
            Deduction,
            Payment,
            NetPay
        });
        await newDpayroll.save();
        res.status(201).json(newDpayroll);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating payroll' });
    }
});

// define a route
app.get('/', (req, res) => {
    res.send("Hello world");
});

// Get All items
app.get('/Deliverypayroll', async (req, res) => {
    try {
        const deliveryPayrolls = await DpayModel.find();
        res.json(deliveryPayrolls);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payrolls' });
    }
});




// update 
app.put('/Deliverypayroll/:id', async (req, res) =>{

    try{
    const {  DeliveryId, DeliveryName, PhoneNumber, MonthofPayment, PaymentMethod, NoOfDeliveries, Deduction } = req.body;
    const id = req.params.id;


    const Payment = NoOfDeliveries * 500;
    const NetPay = Payment - Deduction;


  



   const updatedDpay = await DpayModel.findByIdAndUpdate(

        id,
        {  DeliveryId, DeliveryName, PhoneNumber, MonthofPayment, PaymentMethod, NoOfDeliveries, Deduction,Payment,NetPay },
        {new : true }

    )

    if(!updatedDpay){
        return res.status(404).json({message: "Payroll not found"})

    }

    res.json(updatedDpay)

} catch(error){

    console.log(error)
    res.status(500).json({message: error.message})

}
})


//Delete a Dpay

app.delete('/Deliverypayroll/:id', async (req, res) => {
 
    try {

        const id = req.params.id;
        await DpayModel.findByIdAndDelete(id);
        res.status(204).end();


        
    } catch (error) {

    console.log(error)
    res.status(500).json({message: error.message})
        
    }
 

})

app.get('/Deliverypayroll/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const payroll = await DpayModel.findById(id);
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll not found' });
        }
        res.json(payroll);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payroll' });
    }
});

// Fetch delivery details by DeliveryId
app.get('/DeliverypayrollById/:DeliveryId', async (req, res) => {
    try {
        const delivery = await DpayModel.findOne({ DeliveryId: req.params.DeliveryId });
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.json(delivery);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery details' });
    }
});


// start the server
const port = 8000;
app.listen(port, () => {
    console.log("Server is listening to port " + port);
});
