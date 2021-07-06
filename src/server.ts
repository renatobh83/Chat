import { http } from "./app";
import "./websockets/client"
import "./websockets/admin"
http.listen(3001, () => console.log("Server up"));
