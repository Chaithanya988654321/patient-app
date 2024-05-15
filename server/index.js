import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'


// const stripe = initializeStripe("sk_test_51PGRMaSDvmO2eEIIjq94BJP3fGcLI01QdjQJES3N4LaPEdoo2peuV1petJ1SQxzV7QEdlgec9JwF96jMb1HEOLvK00rsPrOpWg");

// Now you can use `stripe` as usual

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
    const product=req.body;
    console.log(product);
})

app.listen(8800,()=>{
    console.log("connected to backend");
})