import 'reflect-metadata'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Mandate } from './Mandate'

@ObjectType()
export class Person {
  @Field((type) => ID)
  id: number

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date

  @Field((type) => String)
  firstname: string

  @Field((type) => String, { nullable: true })
  lastname?: string | null

  @Field((type) => String, { nullable: true })
  street?: string | null

  @Field((type) => Int, { nullable: true })
  postcode?: number | null

  @Field((type) => String, { nullable: true })
  city?: string | null

  @Field((type) => Date, { nullable: true })
  dateOfBirth?: Date | null

  @Field((type) => Date, { nullable: true })
  joinedAt?: Date | null

  @Field((type) => Mandate, { nullable: true })
  authorizationMandate?: Mandate | null

  @Field((type) => [Mandate], { nullable: true })
  issuedMandates?: [Mandate] | null
}
