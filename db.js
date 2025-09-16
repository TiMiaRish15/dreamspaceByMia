const mongoose = require('mongoose');

// Replace 'mongodb://localhost:27017/mydatabasename' with your MongoDB connection string
//const mongoURI = 'mongodb+srv://rishajeetun15:rtydreamvision@miaclusterphoenix.prr5hha.mongodb.net/Dreamspacebymia?retryWrites=true&w=majority&appName=MiaClusterPhoenix';
//const mongoURI="mongodb+srv://rishajeetun15:rtydreamvision@miaclusterphoenix.prr5hha.mongodb.net";
//const mongoURI = "mongodb+srv://rishajeetun15:rtydreamvision@miaclusterphoenix.prr5hha.mongodb.net/Dreamspacebymia?retryWrites=true&w=majority&appName=MiaClusterPhoenix";
//const mongoURI = "mongodb+srv://rishajeetun15:rtydreamvision@miaclusterphoenix.prr5hha.mongodb.net/Dreamspacebymia?retryWrites=true&w=majority&appName=MiaClusterPhoenix";
//________________________________________________________________________________________


// Local MongoDB URI with database name
const mongoConnectionString ='mongodb://localhost:27017/dreamspaceDB'

//const mongoURI = "mongodb+srv://rishajeetun1590:12345@cluster0.g02wdnq.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0";
//const mongoURI = "mongodb://rishajeetun1590:12345@cluster0.mongodb.net/Blog?retryWrites=true&w=majority";

// Connect to MongoDB+
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ Error connecting to MongoDB:', err.message);
});

// Export the mongoose instance
module.exports = mongoose;