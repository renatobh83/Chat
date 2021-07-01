import { Column, CreateDateColumn, Entity, JoinColumn,  ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./Users";
import {v4 as uuid} from "uuid"

@Entity('messages')
class Messages {
  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string

  @Column()
  user_id: string

  @Column()
  text: string

  @JoinColumn({name:"user_id"})
  @ManyToOne(()=> User)
  user: User

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id= uuid()
    }
  }
}

export { Messages }