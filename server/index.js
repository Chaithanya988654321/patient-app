import express from 'express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import mysql from 'mysql2';
import cors from 'cors'
const stripe = require('stripe')(`${process.env.Secret_Key`)

const app= express();

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aishasahil@123',
    database: 'test',

})

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json("yes i am connected")
})

//get all user
app.get('/user', (req, res) => {
    const q='SELECT * FROM user';
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
});

//add user
app.post('/user', (req, res) => {
    const q='INSERT INTO user (`name`, `email`, `phone`) VALUES (?)';
    // const values=["faiz", "faiz@gmail.com", "7850048514"]
    const values=[
        req.body.name,
        req.body.email,
        req.body.phone,
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("User has been created successfully");
    })
});

//delete user
app.delete('/user/:id', (req, res) => {
    const userId=req.params.id;
    const q='DELETE FROM user WHERE id=?';

    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("User has been deleted successfully");
    })
});

//update user
app.put('/setappointment', (req, res) => {
    const q = 'UPDATE user SET `time` = ?, `date` = ? WHERE phone = ?';
    const values = [
        req.body.time,
        req.body.date,
        req.body.phone
    ];
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("User has been updated successfully");
    });
});

//checkout
app.post('/create-checkout-payment', async(req, res) => {
    const {price}=req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: [{ 
            price_data: { 
              currency: 'INR', 
              product_data:{ 
                name: 'My product' 
              }, 
              unit_amount: price*100,
            } ,
            quantity:2
          }],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/success',
      });
    res.json({id:session.id})
    
})

app.listen(8800,()=>{
    console.log("connected to backend");
})
