import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true},
  password: String
})

export const UserModel = mongoose.model("users", UserSchema);