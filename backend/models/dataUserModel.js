import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    suite: { type: String },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
});

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    catchPhrase: { type: String },
    bs: { type: String },
});

const dataUserSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Change the type to Number
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: addressSchema, required: true },
    phone: { type: String },
    website: { type: String },
    company: { type: companySchema, required: true },
});

const DataUser = mongoose.model("datauser", dataUserSchema);

export default DataUser;
