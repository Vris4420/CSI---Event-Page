const mongoose = require("mongoose")
const initData = require("./data.js")
const Form = require("../models/form.js")

const MongoUrl = "mongodb://127.0.0.1:27017/currins";

main().then(() => {
    console.log("connected to DB")
}).catch((err) => {
    console.log(err)
})
async function main() {
    await mongoose.connect(MongoUrl)
}

const initDB = async () => {
    await Form.deleteMany({});
    await Form.insertMany(initData.data);
    console.log("data initialized");
}

initDB();