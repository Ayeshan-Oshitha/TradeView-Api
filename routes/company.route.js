import { Router } from "express";
import {
  getAllActiveCompanies,
  getAllInactiveCompany,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  restoreCompany,
} from "../controllers/company.controller.js";
import validateObjecId from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", getAllActiveCompanies);
router.get("/inactive", getAllInactiveCompany);
router.get("/:id", validateObjecId, getCompanyById);
router.post("/", createCompany);
router.put("/:id", validateObjecId, updateCompany);
router.patch("/:id/disable", validateObjecId, deleteCompany);
router.patch("/:id/enable", validateObjecId, restoreCompany);

export default router;
