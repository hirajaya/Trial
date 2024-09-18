    import express from "express";
    import mongoose from "mongoose";
    import dotenv from "dotenv";
    import userRouter from "./routes/user-routes.js";
    import artistRouter from "./routes/artist-routes.js";
    import eventRouter from "./routes/event-routes.js";
    import bookingsRouter from "./routes/booking-routes.js";

    dotenv.config();
    const app= express();

    //middlewares
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/artist", artistRouter);
    app.use("/event", eventRouter);
    app.use("/booking", bookingsRouter);





    
    mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.pqxmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=>
        app.listen(5000, ()=> 
            console.log("Connected to database and Server is running")
        )
    )
    .catch((e) => console.log(e));
    
    



    //ktzPA5jIEo86QEVk