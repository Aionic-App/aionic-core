import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Timestamp
} from 'typeorm'

import { Task } from '../../task.model'
import { User } from '../../../user/user.model'

@Entity()
export class TaskComment {
  /***** columns *****/
  @PrimaryGeneratedColumn()
  public id: number

  @Column('text')
  public text: string

  @Column({
    default: true
  })
  public active: boolean

  @CreateDateColumn()
  public created: Timestamp

  /***** relations *****/
  @ManyToOne(type => User, user => user.comments)
  public author: User

  @ManyToOne(type => Task, task => task.comments)
  public task: Task
}
