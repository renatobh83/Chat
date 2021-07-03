import { http } from "./app";
import "./websockets/client"
http.listen(3001, () => console.log("Server up"));
