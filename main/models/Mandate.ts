import 'reflect-metadata'
import { Field, Float, ID, ObjectType } from 'type-graphql'
import { Person } from './Person'

@ObjectType()
export class Mandate {
  @Field((type) => ID)
  id: number

  @Field((type) => Person, { nullable: true })
  accountHolder?: Person | null
  accountHolderId: number

  @Field((type) => Float)
  amount: number

  @Field((type) => Date)
  signedAt: Date

  @Field((type) => [Person], { nullable: true })
  persons?: [Person] | null
}
