import { Request, Response } from "express";
import { UsersServices } from "../services/UsersServices";
import { responseController } from "../utils/ResponseController";

class UsersController {
  async create(request: Request, response: Response){
    const { email } = request.body
    const usersServices = new UsersServices()
    try {
      const user =  await usersServices.create(email)
      return response.send(responseController.defaultResponse(user))
    } catch (error) {
      return response.send(responseController.errorResponse(error.message))
    }
  }

  async findByEmail(request: Request, response: Response){
    const {email} = request.params
  
    const usersServices = new UsersServices()
    try {
      const user = await usersServices.findByEmail(email)
      if(user !== undefined) {
        return response.send(responseController.defaultResponse(user))
      }
      return response.send(responseController.defaultResponse("Usuario nao encontrado"))
    } catch (error) {
      return response.send(responseController.errorResponse(error.message))
    }
  }
  async listAll(request: Request, response: Response){
    const usersServices = new UsersServices()
    try {
      const user = await usersServices.listAll()
      return response.send(responseController.defaultResponse(user))
    } catch (error) {
      return response.send(responseController.errorResponse(error.message))
    }
  }
}

const usersController = new UsersController()
export {usersController}