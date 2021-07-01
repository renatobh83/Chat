import { Request, Response } from "express";
import { SettingServices } from "../services/SettingsServices";

import { responseController } from "../utils/ResponseController"
class SettingController {
  async create(request: Request, response: Response){
    const { chat, username} = request.body
    const settingServices = new SettingServices()
      try {
        const setting = await settingServices.create({chat, username})
        return response.send(responseController.defaultResponse(setting,200))
      } catch (error) {
        return response.send(responseController.errorResponse(error.message, 400))
      } 
  }
  async list(request: Request, response: Response){
    const settingServices = new SettingServices()
    try {
      const list = await settingServices.loadSetting()
      return response.send(responseController.defaultResponse(list, 200))
    } catch (error) {
      return response.send(responseController.errorResponse(error.message, 400))
    }
  }
  async update(request: Request, response: Response){
    const settingServices = new SettingServices()
    const { chat } = request.body
    const {username} = request.params

    try {
      await settingServices.update(username, chat)
      return response.send(responseController.defaultResponse(null, 200))
    } catch (error) {
      response.send(responseController.errorResponse(error.message,400))
    }
  }

}


const settingController = new SettingController()
export { settingController} 