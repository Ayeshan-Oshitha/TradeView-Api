import Company, { validateCompany } from "../models/company.model.js";

export const getAllActiveCompanies = async (req, res) => {
  const companies = await Company.find({ isActive: true }).populate(
    "sector",
    "name"
  );

  res.send(companies);
};

export const getAllInactiveCompany = async (req, res) => {
  const companies = await Company.find({ isActive: false }).populate(
    "sector",
    "name"
  );

  res.send(companies);
};

export const getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.id).populate(
    "sector",
    "name"
  );

  if (!company) {
    return res.status(404).send("Company not found");
  }

  res.send(company);
};

export const createCompany = async (req, res) => {
  const { error } = validateCompany(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, ticker, sectorId, description } = req.body;

  const company = new Company({
    name: name,
    ticker: ticker,
    sector: sectorId,
    description: description,
  });

  let result = await company.save();
  res.send(result);
};

export const updateCompany = async (req, res) => {
  const { error } = validateCompany(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, ticker, sectorId, description } = req.body;

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: name,
        ticker: ticker,
        sector: sectorId,
        description: description,
      },
    },
    { new: true, runValidators: true }
  );

  if (!company) {
    return res.status(404).send("Company not found");
  }

  res.send(company);
};

export const deleteCompany = async (req, res) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { $set: { isActive: false } },
    { new: true }
  );

  if (!company) {
    return res.status(404).send("Company not found");
  }
  if (!company) {
    return res.status(404).send("Company not found");
  }

  res.send(company);
};

export const restoreCompany = async (req, res) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { $set: { isActive: true } },
    { new: true }
  );

  if (!company) {
    return res.status(404).send("Company not found");
  }

  res.send(company);
};
