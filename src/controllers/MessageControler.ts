import {Request, Response} from "express"
import { MessagesServices } from "../services/MessageServices"
import { responseController } from "../utils/ResponseController"

class MessagesController {
  async create(request:Request , response:Response){
    const messagesServices = new MessagesServices()
    const {admin_id, text, user_id } = request.body
    try {
      const message = await messagesServices.create({admin_id,text,user_id})
      return response.send(responseController.defaultResponse(message))
    } catch (error) {
      return response.send(responseController.errorResponse(error.message))
    }
  }
  async listByUser(request:Request , response:Response){
    const { id } = request.params;
    const messagesServices = new MessagesServices()
    try {
      const message = await messagesServices.listByUser(id)
      return response.send(responseController.defaultResponse(message))
    } catch (error) {
     
      return response.send(responseController.errorResponse(error.message))
    }
  }
}

const messagesController = new MessagesController()
export { messagesController}