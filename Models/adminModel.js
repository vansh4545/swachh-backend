import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Your firstname is required"],
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  }
});

adminSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;