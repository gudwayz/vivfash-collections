const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./Routes/Auths')
const adminRoute = require('./Routes/admin/Auths')
const categoryRoute = require('./Routes/category')
const productRoute = require('./Routes/product')
const cartRoute = require('./Routes/cart')
const path = require('path');

const app = express();


env.config();
app.use(express.json());
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoute);
app.use('/api', adminRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rl5ce.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,

    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }

).then(() => {
    console.log('Database connected successfully');
});
//mongodb + srv: //uzoma:<password>@cluster0.rl5ce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority   



app.listen(process.env.PORT, () => {
    console.log(`port is Listening on port ${process.env.PORT }`)
})