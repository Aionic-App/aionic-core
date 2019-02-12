import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ProjectComment } from '@components/project/_child/comment/model'
import { TaskComment } from '@components/task/_child/comment/model'
import { Task } from '@components/task/model'
import { UserRole } from './role/model'

@Entity()
export class User {
  /***** columns *****/
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    nullable: false,
    unique: true
  })
  public email: string

  @Column()
  public firstname: string

  @Column()
  public lastname: string

  @Column({
    select: false
  })
  public password: string

  @Column({
    default: true
  })
  public active: boolean

  /***** relations *****/
  @OneToMany(type => Task, task => task.author)
  public author: Task[]

  @OneToMany(type => Task, task => task.author)
  public assignee: Task[]

  @OneToMany(type => TaskComment, taskComment => taskComment.author)
  public taskComments: TaskComment[]

  @OneToMany(type => ProjectComment, projectComment => projectComment.author)
  public projectComments: ProjectComment[]

  @ManyToOne(type => UserRole, userRole => userRole.users)
  public userRole: UserRole
}