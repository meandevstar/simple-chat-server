const mongoose = require('mongoose');

mongoose.Promise = Promise;

async function connect() {
  try {
    console.log(`Establishing mongodb connection`);
    
    let dbUrl = process.env.DB_URL;
    let options = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
    
    await mongoose.connect(dbUrl, options);
    mongoose.set({ debug: true });
    console.log(`Mongodb connection established`);
  } catch (error) {
    console.log(`Mongodb connection error = ${error}`);
  }
}

exports.connect = connect;