import mongoose from "mongoose";

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
