const mongoose = require("mongoose");
// const MONGOURI = "mongodb://localhost:27017/Registration";
const MONGOURI =
  "mongodb+srv://mubeen:xwMHMxCMVqhEqkRe@cluster0.zaasaak.mongodb.net/Registration";

const mongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to DB !!!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

mongoServer();
