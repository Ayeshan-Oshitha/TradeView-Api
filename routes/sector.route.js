import { Router } from "express";
import {
  getAllActiveSectors,
  createSector,
  getSectorsById,
  updateSector,
  deleteSector,
  restoreSector,
  getAllInactiveSectors,
} from "../controllers/sector.controller.js";
import validateObjecId from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", getAllActiveSectors);
router.get("/inactive", getAllInactiveSectors);
router.get("/:id", validateObjecId, getSectorsById);
router.post("/", createSector);
router.put("/:id", validateObjecId, updateSector);
router.patch("/:id/disable", validateObjecId, deleteSector);
router.patch("/:id/enable", validateObjecId, restoreSector);

export default router;
