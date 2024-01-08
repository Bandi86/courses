import mongoose from 'mongoose';


export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'please provide a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

export default User;
