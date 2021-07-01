import { Router } from "express";
import { settingController } from "./controllers/SettingsController";
const routes = Router();

routes.get("/settings", settingController.list);
routes.post("/settings", settingController.create)
routes.put("/settings/:username", settingController.update)
export { routes };
