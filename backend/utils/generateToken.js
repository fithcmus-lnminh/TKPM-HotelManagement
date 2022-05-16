import jwt from "jsonwebtoken";

const generateToken = (id) => {
  //payload is "userId" -> req.user._id
  return jwt.sign({ id }, process.env.JWT_SECRET); //return token
};

export default generateToken;
