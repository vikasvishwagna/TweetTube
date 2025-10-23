import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.models.js";
export const jwtVerify = asyncHandler(async (req, res, next)=>{
 // Steps performed in this middleware
// 1️. Extract the access token from the browser cookies.
// 2️. Verify the access token using the secret key from the environment variables.
// 3️. Once verified, decode the token to get the user ID.
// 4️. Fetch the user from the database using the decoded user ID.
// 5️. Exclude sensitive fields (like password) from the user data.
// 6️. Attach the sanitized user object to the req object so that
//     subsequent middleware or route handlers can access it.

try {
  
  const token = req.cookie?.accessToken;
  if(!token){
    throw new ApiError(400, 'Unauthorized request');
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user =await User.findById(verifiedToken?._id).select("-password -refreshToken");

  if(!user){
    throw new ApiError(400, "Invalid access token")
  }
  req.user = user;
  next();

} catch (error) {
  throw new ApiError(401, error?.message || "Invalid access token");
}  
})