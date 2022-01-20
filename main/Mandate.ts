import 'reflect-metadata'
import { Field, Float, ID, Int, ObjectType } from 'type-graphql'
import { Person } from './Person'

@ObjectType()
export class Mandate {
  @Field((type) => ID)
  id: number

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date

  @Field((type) => Person, { nullable: true })
  accountHolder?: Person | null

  @Field((type) => Float)
  amount: number

  @Field((type) => Date)
  signedAt: Date

  @Field((type) => [Person], { nullable: true })
  persons?: [Person] | null
}
