import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsNotEmpty, IsIn, IsArray, ArrayMinSize} from 'class-validator'

const allowedColors = ['red','blue','green','yellow','magenta']

@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @IsNotEmpty()
    @Column('text', {nullable:false})
    name: string

    @IsString()
    @IsIn(allowedColors)
    @Column('text', {nullable:false})
    color: string

    @IsArray()
    @ArrayMinSize(3)
    @Column('json', {nullable:false})
    board: string[][]
}