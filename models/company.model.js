import mongoose from "mongoose";
import Joi from "joi";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
      trim: true,
    },
    ticker: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
      trim: true,
    },
    sector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sector",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

function validateCompany(company) {
  const schema = Joi.object({
    name: Joi.string().min(3).trim().required(),
    ticker: Joi.string().min(3).trim().required(),
    sectorId: Joi.objectId().required(),
    isActive: Joi.boolean(),
    description: Joi.string().trim().allow(""),
  });

  return schema.validate(company);
}

export default Company;
export { validateCompany };
