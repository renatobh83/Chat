import { io } from "../app"
import { ConnectionServies } from "../services/ConnectionsServices"
import { MessagesServices } from "../services/MessageServices"

io.on("connect",async (socket)=>{
  const connectionsServices = new ConnectionServies()
  const messagesServices =  new MessagesServices()
  const allConnectionsWithouAdmin = await connectionsServices.findAllWithouAdmin()

  io.emit("admin_list_all_users", allConnectionsWithouAdmin)

  socket.on("admin_list_messages_by_user",async (params, callback) =>{
      const { user_id} = params
      const allMessages = await messagesServices.listByUser(user_id)
      callback(allMessages)
  })
  socket.on("admin_send_message",async (params, call) => {
    const {user_id, text} = params
 
    await messagesServices.create({
      text,
      user_id,
      admin_id: socket.id
    })
    const {socket_id} = await connectionsServices.findUserById(user_id)
    const allMessages = await messagesServices.listByUser(user_id)
    io.to(socket_id).emit("admin_send_to_client",{
      allMessages,
      socket_id: socket.id
    })
    call(allMessages)
  })
})  