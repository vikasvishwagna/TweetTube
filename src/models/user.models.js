import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: Video,
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessTokens = async function () {
  jwt.sign({
    _id : this._id,
    email: this.email,
    userName: this.userName,
    fullName: this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE
  }
)
}

userSchema.methods.generateRefreshTokens = async function () {
  jwt.sign({
    _id : this._id
  },
  process.env.REFRESH_TOKEN_SECRETE,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  }
)
}

export const User = mongoose.model("User", userSchema);
