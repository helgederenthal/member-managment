import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
  FieldResolver,
  Root,
} from 'type-graphql'
import { Person } from './Person'
import { Context } from './context'
import { MandateCreateInput } from './MandateResolver'
import { Mandate } from './Mandate'

@InputType()
export class PersonCreateInput {
  @Field()
  firstname: string

  @Field({ nullable: true })
  lastname: string

  @Field({ nullable: true })
  street: string

  @Field({ nullable: true })
  postcode: number

  @Field({ nullable: true })
  city: string

  @Field({ nullable: true })
  dateOfBirth: Date

  @Field({ nullable: true })
  joinedAt: Date

  @Field(() => [MandateCreateInput], { nullable: true })
  issuedMandates: [MandateCreateInput]

  @Field({ nullable: true })
  addIssuingPersonToFirstMandate: boolean
}

@Resolver(Person)
export class PersonResolver {
  @FieldResolver()
  async issuedMandates(
    @Root() person: Person,
    @Ctx() ctx: Context
  ): Promise<Mandate[]> {
    return ctx.prisma.person
      .findUnique({
        where: {
          id: person.id,
        },
      })
      .issuedMandates()
  }

  @FieldResolver()
  async authorizationMandate(
    @Root() person: Person,
    @Ctx() ctx: Context
  ): Promise<Mandate | null> {
    return ctx.prisma.person
      .findUnique({
        where: {
          id: person.id,
        },
      })
      .authorizationMandate()
  }

  @Query(() => [Person])
  async allPersons(@Ctx() ctx: Context) {
    return ctx.prisma.person.findMany()
  }

  @Query(() => Person, { nullable: true })
  async personById(@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.person.findUnique({
      where: { id },
    })
  }

  @Mutation(() => Person)
  async addPerson(
    @Arg('data') data: PersonCreateInput,
    @Ctx() ctx: Context
  ): Promise<Person> {
    const issuedMandatesData = data.issuedMandates?.map((issuedMandate) => {
      const personData = issuedMandate.persons.map((person) => {
        return {
          firstname: person.firstname,
          lastname: person.lastname,
          street: person.street,
          postcode: person.postcode,
          city: person.city,
          dateOfBirth: new Date(person.dateOfBirth),
          joinedAt: new Date(person.joinedAt),
        }
      })
      return {
        amount: issuedMandate.amount,
        signedAt: new Date(issuedMandate.signedAt),
        persons: { create: personData },
      }
    })

    const newPerson = await ctx.prisma.person.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        street: data.street,
        postcode: data.postcode,
        city: data.city,
        dateOfBirth: new Date(data.dateOfBirth),
        joinedAt: new Date(data.joinedAt),
        issuedMandates: { create: issuedMandatesData },
      },
    })

    // Get number of created mandates
    const numberOfMandates = issuedMandatesData ? issuedMandatesData.length : 0

    // If add flag is set and mandates are present
    if (data.addIssuingPersonToFirstMandate && numberOfMandates > 0) {
      // Get first mandate of new person
      const firstMandate = await ctx.prisma.mandate.findFirst({
        where: { accountHolderId: newPerson.id },
      })

      // If first mandate present
      if (firstMandate) {
        // Add authorization mandate to person
        await ctx.prisma.person.update({
          where: { id: newPerson.id },
          data: {
            authorizationMandate: { connect: { id: firstMandate.id } },
          },
        })
      }
    }

    return newPerson
  }
}
