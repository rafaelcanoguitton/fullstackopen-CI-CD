const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type:String,
    minLength:3,
    required:true,
    unique:true,
  },
  passwordHash: {
    type:String,
    required:true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
userSchema.set("toJSON", {
  transform: (document, returnedUser) => {
    returnedUser.id = returnedUser._id.toString();
    delete returnedUser._id;
    delete returnedUser.__v;
    delete returnedUser.passwordHash;
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
