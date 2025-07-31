import mongoose from "mongoose";
import Joi from "joi";

const sectorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sector = mongoose.model("Sector", sectorSchema);

function validateSector(sector) {
  const schema = Joi.object({
    name: Joi.string().min(3).trim().required(),
    description: Joi.string().trim().allow(""),
  });

  return schema.validate(sector);
}

export default Sector;
export { validateSector };
