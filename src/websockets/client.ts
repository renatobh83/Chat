import { io } from "../app";



io.on("connect", (socket)=>{
  socket.on("first_acess_client", async(params)=>{
    console.log(params)
  })
})
