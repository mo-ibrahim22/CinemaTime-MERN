const express = require('express');
const cors = require('cors');  // access resources from  remote host for security measure purposes
const mongoose = require('mongoose');
const item = require('./routes/item.route.js');
const user = require('./routes/user.route.js');

//bounus
require('dotenv').config();


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


const app = express();
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(cors());
app.use(express.json());
app.use('/api/item', item);
app.use('/api/user', user);
app.use('/images', express.static('images'));
