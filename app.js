const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/voloDB", { useNewUrlParser: true, useUnifiedTopology: true }).then();
console.log(mongoose.connection.readyState);

const dataSchema = new mongoose.Schema({
  id: Number,
  date: Date,
  user: String,
  department: String,
  software: String,
  seats: Number,
  amount: Number
});

const data = mongoose.model("data", dataSchema);

app.get('/api/percentage_of_department_wise_sold_items', async (req, res) => {
  try {
    const { item_by,start_date,end_date,n} = req.query;



    const startDate = new Date(start_date);
    const endDate = new Date(end_date);


    console.log(startDate);
    console.log(endDate);


    const hoursToSubtract = 5;
    const minutesToSubtract = 30;

    startDate.setHours(startDate.getHours() - hoursToSubtract);
    startDate.setMinutes(startDate.getMinutes() - minutesToSubtract);
    endDate.setHours(endDate.getHours() - hoursToSubtract);
    endDate.setMinutes(endDate.getMinutes() - minutesToSubtract);


    const query = {

      date : {
        $gte: startDate,
        $lt: endDate
      }

    };

    const total_seats = await data.aggregate([

    { $match : query },
    { $group : {_id : null, seats_sum : {$sum : "$seats"}}}

    ]);

    const totalSeats = total_seats[0].seats_sum;

    const result = await data.aggregate([
      { $match: query },

      { $group   : { _id : "$department", totalSales : { $sum : '$seats' } } },


    ]);

    ans = [];
    console.log(total_seats);
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].totalSales);
        ans.push(result[i]._id,(result[i].totalSales/totalSeats)*100);
      }
    } else {
      res.json({ secondMostSoldItem: 'No data available' });
    }
    console.log(ans);



    res.json({ ans });
  } catch (err) {
    console.error('Error :', err);

  }
});


app.get('/api/nth_most_total_item', async (req, res) => {
  try {
    const { item_by,start_date,end_date,n} = req.query;



    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const N = Number(n);
    const itemBy= '$' + item_by;
    console.log(startDate);
    console.log(endDate);


    const hoursToSubtract = 5;
    const minutesToSubtract = 30;

    startDate.setHours(startDate.getHours() - hoursToSubtract);
    startDate.setMinutes(startDate.getMinutes() - minutesToSubtract);
    endDate.setHours(endDate.getHours() - hoursToSubtract);
    endDate.setMinutes(endDate.getMinutes() - minutesToSubtract);


    const query = {

      date : {
        $gte: startDate,
        $lt: endDate
      }

    };


    const result = await data.aggregate([
      { $match: query },

      { $group   : { _id : "$software", totalSales : { $sum : itemBy } } },
      { $sort    : { totalSales : -1 ,_id:1} },

    ]);

    if (result.length >= N) {
      const secondMostSoldItem = result[N]._id;
      res.json({ secondMostSoldItem });
    } else {
      res.json({ secondMostSoldItem: 'Not available' });
    }
    console.log(result);



    res.json({ result });
  } catch (err) {
    console.error('Error :', err);

  }
});


app.get('/api/total_items', async (req, res) => {
  try {
    const { start_date,end_date,department} = req.query;



    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const hoursToSubtract = 5;
    const minutesToSubtract = 30;

    startDate.setHours(startDate.getHours() - hoursToSubtract);
    startDate.setMinutes(startDate.getMinutes() - minutesToSubtract);
    endDate.setHours(endDate.getHours() - hoursToSubtract);
    endDate.setMinutes(endDate.getMinutes() - minutesToSubtract);


    const query = {
      department,
      date: {
        $gte: startDate,
        $lt: endDate
      }

    };




    const result = await data.aggregate([
      { $match: query },
      { $group: { _id: null, totalSeats: { $sum: '$seats' } } }
    ]);



    const tseats = result.length > 0 ? result[0].totalSeats : 0;

    res.json({ tseats});

  } catch (err) {
    console.error('Error occurred ', err);

  }
});

console.log(mongoose.connection.readyState);



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
