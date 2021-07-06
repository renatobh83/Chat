import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connections";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate  {
  user_id: string,
  socket_id: string,
  admin_id?: string
  id?: string
}
class ConnectionServies{s
  private connectionRepository: Repository<Connection>

  constructor(){
    this.connectionRepository = getCustomRepository(ConnectionsRepository)
  }
  async create({user_id, admin_id, id, socket_id}: IConnectionCreate){

    const connection = this.connectionRepository.create({
      user_id,
      admin_id,
      id,
      socket_id
    })
    await this.connectionRepository.save(connection)

  }
  async findUserById(user_id:string){
    const connection = await this.connectionRepository.findOne({user_id})
    return connection
  }

  async findAllWithouAdmin(){
    const connection = await this.connectionRepository.find({
      where:{ admin_id: null},
      relations: ["user"]
    })
    return connection
  }
  async findBySocketId(socket_id: string){
    
  const connection = await this.connectionRepository.findOne({socket_id})
    return connection
  }
}
export {ConnectionServies}