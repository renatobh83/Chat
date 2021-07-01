import { Router } from "express";
import { messagesController } from "./controllers/MessageControler";
import { settingController } from "./controllers/SettingsController";
import { usersController } from "./controllers/UsersController";
const routes = Router();

// Route Settings

routes.get("/settings", settingController.list);
routes.post("/settings", settingController.create)
routes.put("/settings/:username", settingController.update)

// Route Users
routes.get("/user", usersController.listAll)
routes.get("/user/:email", usersController.findByEmail)
routes.post("/user", usersController.create)


// Route Messages

routes.get("/message/:id", messagesController.listByUser)







export { routes };

