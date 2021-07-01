import { getCustomRepository, Repository } from "typeorm";
import { Messages } from "../entities/Messages";
import { MessageRepository } from "../repositories/MessagesRepository";

interface IMessageCreate{
  admin_id?: string,
  user_id: string,
  text: string
}
class MessagesServices{
  private messageRepository: Repository<Messages>
  constructor(){
    this.messageRepository =  getCustomRepository(MessageRepository)
  }

  async create({admin_id, user_id, text}: IMessageCreate){
    const message = this.messageRepository.create({
      user_id,
      text,
      admin_id
    })
    await this.messageRepository.save(message)
    return message
  }
  async listByUser(user_id:string){
   
    const messageList = await this.messageRepository.find({
      where: { user_id },
      relations: ["user"],
    })
     return messageList  
  }
}

export {MessagesServices}