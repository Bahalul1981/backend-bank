

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongo from 'mongodb';
import morgan from 'morgan';


const app= express()
const PORT=3002


app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

// To link server with html (views)
app.use(express.static('views'))




// skapa ny mongodb.MongoClient

let MongoClient = mongo.MongoClient;
let ObjectId=mongo.ObjectId;

// koppla med connect
const client = new MongoClient('mongodb://localhost:27017');
// välj databas
await client.connect();
const db = client.db('creataccount');
// välj collection
const accountholders = db.collection('allaccounts');



app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html")  
  })


app.post("/creataccount", async(req,res)=>{
    // i din account collection, insertOne
    await accountholders.insertOne(req.body)
    res.json(req.body);
})

//To get data in all account route
app.get("/allaccount", async(req,res)=>{
    const allAccounts = await accountholders.find({}).toArray();
    res.json(allAccounts);
})






app.put("/allaccount/:id",async(req,res)=>{
    // VAd är det som ska uppdateras? Kolla tidigare övningar, $set
    await accountholders.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });

    res.json({ put: "ok"})  
})



app.delete("/allaccount/:id",async(req,res)=>{
    const allaccountholders = await accountholders.deleteOne({ _id: ObjectId(req.params.id) })
    res.json({ deleted: 'ok' })

})







// Login 











//Rout not found
app.use((req,res,next)=>{
    res.status(404).json({
        massage:"Somthing was wrong"
    })
})

// If server error
app.use((err,req,res,next)=>{
    res.status(500).json({
        massage:"Some problem in server"
    })
})






//to run our server in bwowser
app.listen(PORT,()=>console.log(`Your port is listioning on: http://localhost:${PORT}`))