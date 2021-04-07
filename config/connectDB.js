const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const config = require('config');

const dbconn = "mongodb+srv://Project:Project@123@harshdb.cm0lx.mongodb.net/Homestyle_dishes?retryWrites=true&w=majority";

const connectDB = async () => {
    try
    {
        await mongoose.connect(dbconn,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Database Connected");
    }
    catch (err)
    {
        console.log("Unable to Connect: "+err);
        process.exit();
    }
}

module.exports = connectDB;
