const { MongoClient } = require('mongodb');

const express = require('express')
const app = express();

require('dotenv').config()
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://powerx:powerx@cluster0.uueml.mongodb.net/powerX?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("powerX").collection("CategoryData");
    const shippingAndPayment = client.db("powerX").collection("ShippingAndPayment");
    app.get('/getCategoryItem', (req, res) => {
        collection.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })

    app.get('/category/:categoryName', (req, res) => {
        collection.find({ category: req.params.categoryName })
            .toArray((err, document) => {
                res.send(document[0])
            })
    })
    app.post('/sendPayment', (req, res) => {
        const payData = req.body;
        shippingAndPayment.insertOne({...payData})
        .toArray((err, document) => {
            res.send(document);
        })
    })
});


app.listen(port)