import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Settings"
import { SettingsRepository } from "../repositories/SettingsRepository"


interface ISettingCreate {
  chat: boolean,
  username: string
}


class SettingServices {
  private settingsRepository: Repository<Setting>
  constructor(){
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }
  async create( {chat, username}: ISettingCreate){

    const userExists = await this.settingsRepository.findOne({username})

    if(userExists){
      throw new Error("User already exists!")
    }

    const setting = this.settingsRepository.create({
      username,
      chat
    })
    await this.settingsRepository.save(setting)
    return setting
  }

  async loadSetting(){
    return await this.settingsRepository.find({})
  }
  async update(username: string, chat: boolean){
    const result = await this.settingsRepository.update({"username": username}, {"chat": chat})
    return result
  }
}

export { SettingServices}