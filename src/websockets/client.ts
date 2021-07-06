import { io } from "../app";
import {ConnectionServies} from "../services/ConnectionsServices"
import { MessagesServices } from "../services/MessageServices";
import { UsersServices } from "../services/UsersServices";

io.on("connect", (socket)=>{
  const connectionsServices = new ConnectionServies()
  const usersServices = new UsersServices()
  const messagesServices= new MessagesServices()

  let user_id = null
  socket.on("first_acess_client", async (params)=>{
    const socket_id = socket.id
    const { text, email} = params

    const userExists = await usersServices.findByEmail(email)
    if(!userExists) {
      const user = await usersServices.create(email)
      await connectionsServices.create({
        socket_id, 
        user_id: user.id
      })
      user_id = user.id
    } else{
      user_id = userExists.id
      const connection = await connectionsServices.findUserById(userExists.id)
      if(!connection){
        await connectionsServices.create({
          socket_id, 
          user_id: userExists.id
        })
      }else{
        connection.socket_id = socket.id
        await connectionsServices.create(connection)
      }   
    }
    await messagesServices.create({
      text,
      user_id
    })
    const allMessages = await messagesServices.listByUser(user_id)
  
    
  socket.emit("client_list_all_messages", allMessages)

  socket.on("client_send_to_admin",async( params, call)=>{
    const { socket_admin_id, text} = params
    const socket_id = socket.id
    const {user_id} = await connectionsServices.findBySocketId(socket_id)
   
   const message =  await messagesServices.create({
      text,
      user_id
    })
    const allMessages = await messagesServices.listByUser(user_id)

    io.to(socket_admin_id).emit("admin_receive_message",{
      message: allMessages,
      socket_id
    })
    call(allMessages)
  })

  socket.on('disconnect', () => console.log(`Disconnected: ${socket.id}`));
  })
 
})
