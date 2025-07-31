import mongoose from "mongoose";

function validateObjecId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ObjectId");
  }
  next();
}

export default validateObjecId;
