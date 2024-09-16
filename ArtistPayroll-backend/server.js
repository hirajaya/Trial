// using Express
const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');

// create an instance of express
const app = express();
app.use(express.json());
app.use(cors());;


// sample in-memory storage for payroll
let payroll = [];

//connecting mongodb
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(()=>{
    console.log('DB CONNECTED')

})
.catch((err)=>{
    console.log(err)
})

// creating schema
const payrollschema = new mongoose.Schema({

    ArtistId: {
        type: String,
        required: true
    },
    ArtistName: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true
    },
    MonthofPayment: {
        type: String,
        required: true
    },
    PaymentMethod: {
        type: String,
        required: true,
       
    },
    NoOfTshirt: {
        type: Number,
        required: true,
        default: 0
    },
    NoOfCaps: {
        type: Number,
        required: true,
        default: 0
    },
    NoOfToteBags: {
        type: Number,
        required: true,
        default: 0
    },
    NoOfLightSticks: {
        type: Number,
        required: true,
        default: 0                             
    },
    NoOfBands: {
        type: Number,
        required: true,
        default: 0
    },
    NoOfAlbums: {
        type: Number,
        required: true,
        default: 0
    },
    NoOfTickets: {
        type: Number,
        required: true,
        default: 0
    },
    TotalPaymentofMerchandise: {
        type: Number,
        
    },
    TotalPaymentofAlbums: {
        type: Number,
        
    },
    TotalPaymentofTickets: {
        type: Number,
        
    },
    Payment: {
        type: Number,
        
    },
    HandlingFee: {
        type: Number,
        
    },
    NetPayment: {
        type: Number,
        
    }

})

payrollschema.pre('save', function (next) {
    const doc = this;

    doc.TotalPaymentofMerchandise = doc.NoOfTshirt * 2000 + doc.NoOfCaps * 1000 + doc.NoOfToteBags * 2000 + doc.NoOfLightSticks * 3500 + doc.NoOfBands * 500;
    doc.TotalPaymentofAlbums = doc.NoOfAlbums * 500;
    doc.TotalPaymentofTickets = doc.NoOfTickets * 1000;
    doc.Payment = doc.TotalPaymentofMerchandise + doc.TotalPaymentofAlbums + doc.TotalPaymentofTickets;
    doc.HandlingFee = doc.Payment * 0.2;
    doc.NetPayment = doc.Payment - doc.HandlingFee;

    next();
});

//creating model
const payrollModel = mongoose.model('pay',payrollschema);




// create a ArtistPayroll
app.post('/payroll',async(req,res) =>{
    //const{ArtistId,ArtistName,PhoneNumber,EmailAddress,MonthofPayment,PaymentMethod,NoOfTshirt,NoOfCaps,NoOfToteBags,NoOfLightsticks,NoOfBands, NoOfAlbums,NoOfTickets,}=req.body;
    /*  start const TotalPaymentofMerchandise = NoOfTshirt*2000+NoOfcaps*1000+NoOfTotuebag*2000+NoOflightstick*3500+NoOfbands*500;
    const TotalPaymentofAlbums = NoOfAlbums * 500;
    const TotalPaymentofTickets = NoOfTickets * 1000;
    const Payment = TotalPaymentofMerchandise + TotalPaymentofAlbums + TotalPaymentofTickets;
    const HandlingFee = Payment * 0.2;
    const NetPayment = Payment - HandlingFee;
    const newPayroll = {
        
        id: payroll.length + 1,
        ArtistId,
        ArtistName,
        PhoneNumber,
        EmailAddress,
        MonthofPayment,
        PaymentMethod,
        NoOfTshirt,
        NoOfcaps,
        NoOfTotuebag,
        NoOflightstick,
        NoOfbands,
        NoOfAlbums,
        NoOfTickets,
        TotalPaymentofMerchandise,
        TotalPaymentofAlbums,
        TotalPaymentofTickets,
        Payment,
        HandlingFee,
        NetPayment

    };
    payroll.push(newPayroll)
    console.log(payroll); stop*/

 

try {
    //const newPayroll = new payrollModel({ArtistId,ArtistName,PhoneNumber,EmailAddress,MonthofPayment,PaymentMethod,NoOfTshirt,NoOfCaps,NoOfToteBags,NoOfLightsticks,NoOfBands, NoOfAlbums,NoOfTickets})
    const newPayroll = new payrollModel(req.body);
    await newPayroll.save();
    res.status(201).json(newPayroll)
   

}
    
 catch (error) {
    console.log(error)
    res.status(500).json({message:error.message});
}
})
 

/*// create a payroll
app.post('/payroll',async(req,res) =>{
    const{ArtistId,ArtistName,PhoneNumber,EmailAddress,MonthofPayment,PaymentMethod,NoOfTshirt,NoOfCaps,NoOfToteBags,NoOfLightsticks,NoOfBands, NoOfAlbums,NoOfTickets,}=req.body;
    const TotalPaymentofMerchandise = NoOfTshirt*2000+NoOfCaps*1000+NoOfToteBags*2000+NoOfLightsticks*3500+NoOfBands*500;
    const TotalPaymentofAlbums = NoOfAlbums * 500;
    const TotalPaymentofTickets = NoOfTickets * 1000;
    const Payment = TotalPaymentofMerchandise + TotalPaymentofAlbums + TotalPaymentofTickets;
    const HandlingFee = Payment * 0.2;
    const NetPayment = Payment - HandlingFee;


    try {

        const newPayroll = new payrollModel({
        
            ArtistId,
            ArtistName,
            PhoneNumber,
            EmailAddress,
            MonthofPayment,
            PaymentMethod,
            NoOfTshirt,
            NoOfCaps,
            NoOfToteBags,
            NoOfLightsticks,
            NoOfBands,
            NoOfAlbums,
            NoOfTickets,
            TotalPaymentofMerchandise,
            TotalPaymentofAlbums,
            TotalPaymentofTickets,
            Payment,
            HandlingFee,
            NetPayment
    
        });
        await newPayroll.save();
        res.status(201).json(newPayroll)
        


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating payroll' });
    }



})*/

// Get all payroll
app.get('/payroll',async(req,res)=>{

    try {
     const payroll = await payrollModel.find()
     res.json(payroll);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }   

})


//update a payroll

/*app.put('/payroll/:id',async (req,res) =>{

try {
    
    const{ArtistId,ArtistName,PhoneNumber,EmailAddress,MonthofPayment,PaymentMethod,NoOfTshirt,NoOfCaps,NoOfTotueBags,NoOfLightsticks,NoOfBands, NoOfAlbums,NoOfTickets,}=req.body;
    const id = req.params.id;

    const TotalPaymentofMerchandise = formData.NoOfTshirt * 2000 + formData.NoOfCaps * 1000 + formData.NoOfToteBags * 2000 + formData.NoOfLightSticks * 3500 + formData.NoOfBands * 500;
    const TotalPaymentofAlbums = formData.NoOfAlbums * 500;
    const TotalPaymentofTickets = formData.NoOfTickets * 1000;
    const Payment = TotalPaymentofMerchandise + TotalPaymentofAlbums + TotalPaymentofTickets;
    const HandlingFee = Payment * 0.2;
    const NetPayment = Payment - HandlingFee;




    const updatedPayroll= await payrollModel.findByIdAndUpdate(
        id,
        {ArtistId,ArtistName,PhoneNumber,EmailAddress,MonthofPayment,PaymentMethod,NoOfTshirt,NoOfCaps,NoOfTotueBags,NoOfLightsticks,NoOfBands, NoOfAlbums,NoOfTickets,TotalPaymentofMerchandise,TotalPaymentofAlbums,TotalPaymentofTickets,Payment,HandlingFee,NetPayment},
        {new : true }
    )

        if(!updatedPayroll){
            return res.status(404).json({message: "Payroll not found"})

        }

        res.json(updatedPayroll)
    



} catch (error) {

    console.log(error)
    res.status(500).json({message: error.message})
    
}



   
})*/

app.put('/payroll/:id', async (req, res) => {
    try {
      const updatedPayroll = await payrollModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPayroll) {
        return res.status(404).json({ message: "Payroll not found" });
      }
      res.json(updatedPayroll);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });



// delete a payroll

app.delete('/payroll/:id',async (req,res) =>{

    try {
        const id = req.params.id;
        await payrollModel.findByIdAndDelete(id);
        res.setMaxListeners(204).end();

    } catch (error) {
        console.log(error)
    res.status(500).json({message: error.message})
    }

})

// Fetch single payroll by ID
app.get('/payroll/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const payroll = await payrollModel.findById(id);
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll not found' });
        }
        res.json(payroll);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payroll data' });
    }
});





// start the server
const port = 8000;
app.listen(port,()=>{
    console.log("server is listening to port" +port);

})

