import mongoose from "mongoose";
import { Password } from "../services/password";

// interface that describes the required props to create an user
interface UserAttrs {
  email: string;
  password: string;
}

// interface that describes the props that a User Model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

// interface that describes the props that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  // only hash the password if it has been modified, otherwise, ignore the operation
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// const user = User.build({
//   email: "a@3.com",
//   password: "12343",
// });

// // call this User factory to create new users
// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

export { User };
