import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  // Steps to register a new user:
  // 1️.Extract user details from the request body (sent from the frontend).
  // 2️.Validate the received input fields (e.g., name, email, password).
  // 3️.Check if a user with the same email or username already exists in the database.
  // 4️.Verify if the avatar and image files are provided.
  // 5️.Upload the avatar and image files to Cloudinary (or any cloud storage).
  // 6️.Create a new user object and save it to the database.
  // 7️.Remove sensitive information like password and refresh token from the response.
  // 8️.Verify if the user was successfully created.
  // 9️.Return a success response with the created user details.

  const { userName, email, password, fullName } = req.body;
  console.log("username: ", userName, "email: ", email);

  if (
    [fullName, userName, email, password].some((ele) => {
      return ele?.trim() === "";
    })
  ) {
    throw new ApiError(400, "all fields require");
  }

  const existedUser = await User.findOne({
    $or: [{ email },{ userName }]
  })

  if(existedUser){
    throw new ApiError(409, "user already exist")
  }


console.log("avatar file info: ",req.files.avatar)

const avatarLocalPath = req.files.avatar?.[0]?.path;
const coverImageLocalPath = req.files.coverImage?.[0]?.path;
console.log(avatarLocalPath)

if(!avatarLocalPath){
  throw new ApiError(400,"Avatar field is require");
}

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
  throw new ApiError(400, "avatar file is required")
}

const user = await User.create({
  fullName,
  userName: userName.toLowerCase(),
  email,
  password,
  avatar: avatar?.url,
  coverImage: coverImage?.url || "",

})

const createdUser = User.findById(user._id).select(
  "-password -refreshToken"
)

if(!createdUser){
  throw new ApiError(500," something went wrong while registering the user")
}

return res.status(201).json(
  new ApiResponse(200,"User registred sucessfully")
)

});

export { registerUser };
