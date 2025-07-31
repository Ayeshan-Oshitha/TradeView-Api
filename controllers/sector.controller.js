import Sector, { validateSector } from "../models/sector.model.js";

export const getAllActiveSectors = async (req, res) => {
  const sectors = await Sector.find({ isActive: true });
  res.send(sectors);
};

export const getAllInactiveSectors = async (req, res) => {
  const sectors = await Sector.find({ isActive: false });
  res.send(sectors);
};

export const getSectorsById = async (req, res) => {
  const sector = await Sector.findById(req.params.id);
  if (!sector) {
    return res.status(404).send("Sector not found");
  }
  res.send(sector);
};

export const createSector = async (req, res) => {
  const { error } = validateSector(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, description } = req.body;

  const sector = new Sector({
    name: name,
    description: description,
  });

  let result = await sector.save();
  res.send(result);
};

export const updateSector = async (req, res) => {
  const { name, description } = req.body;

  const sector = await Sector.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: name,
        description: description,
      },
    },
    { new: true, runValidators: true }
  );

  if (!sector) {
    return res.status(404).send("Sector not found");
  }

  res.send(sector);
};

export const deleteSector = async (req, res) => {
  const sector = await Sector.findByIdAndUpdate(
    req.params.id,
    { $set: { isActive: false } },
    { new: true }
  );

  if (!sector) {
    return res.status(404).send("Sector not found");
  }

  res.send(sector);
};

export const restoreSector = async (req, res) => {
  const sector = await Sector.findByIdAndUpdate(
    req.params.id,
    { $set: { isActive: true } },
    { new: true }
  );

  if (!sector) {
    return res.status(404).send("Sector not found");
  }

  res.send(sector);
};
