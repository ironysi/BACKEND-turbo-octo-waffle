//https://www.youtube.com/watch?v=QgqO-3FAvds&feature=youtu.be&fbclid=IwAR0m2QRxC8W-fFfqltILW0TzQuRJ9MtRAOIcXiJtVd_LMoT-zOknYDzy6LU


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// // CORS -> This is needed because front end is running different port than backend
// app.use(cors({ origin: [
//   "http://localhost{frontEndPort}"
// ],credentials: true }));

// // Express session
// app.use(session({
//   secret: "This should have been secret...",
//   resave: false,
//   saveUninitialized: true
// }));


// *********** Include the Api routes ***********
const accountRoutes = require("./routes/accountRoutes");
const userRoutes = require("./routes/userRoutes")

// *********** Connect to Mongo  ***********
console.log('Attempting to connect to mongoose');

mongoose.connect("mongodb://admin:admin1@ds231133.mlab.com:31133/fullstack_db")
  .then(() => {
    console.log('Connected to Mongo database!');
  })
  .catch(err  => {
    console.error('App starting error:', err.stack);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  next();
});

// ******** Setup the Api routes ***********
app.use("/account", accountRoutes);
app.use("/user", userRoutes);

// App listen
app.listen(3000, () => {
  console.log("server listening at port 3000")
});

module.exports = app;
