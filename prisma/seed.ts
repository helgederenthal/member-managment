import { PrismaClient, Prisma, Person } from '@prisma/client'

const prisma = new PrismaClient()

const personData: Prisma.PersonCreateInput[] = [
  {
    firstname: 'Peter',
    lastname: 'Parker',
    street: 'Victoria Road 7574',
    postcode: 14083,
    city: 'Armagh',
    dateOfBirth: new Date('1984-10-12'),
    joinedAt: new Date('1990-09-04'),
    issuedMandates: {
      create: {
        amount: 50,
        signedAt: new Date('2002-04-07'),
        persons: {
          create: [
            {
              firstname: 'Mary Jane',
              lastname: 'Parker',
              street: 'Victoria Road 7574',
              postcode: 14083,
              city: 'Armagh',
              dateOfBirth: new Date('1987-11-18'),
              joinedAt: new Date('1993-09-04'),
            },
            {
              firstname: 'Emma',
              lastname: 'Parker',
              street: 'Victoria Road 7574',
              postcode: 14083,
              city: 'Armagh',
              dateOfBirth: new Date('2015-06-07'),
              joinedAt: new Date('2015-06-07'),
            },
            {
              firstname: 'Noah',
              lastname: 'Parker',
              street: 'Victoria Road 7574',
              postcode: 14083,
              city: 'Armagh',
              dateOfBirth: new Date('2017-04-26'),
              joinedAt: new Date('2017-04-26'),
            },
          ],
        },
      },
    },
  },
  {
    firstname: 'Klaus-Michael',
    lastname: 'Schröer',
    street: 'Rosenweg 4689',
    postcode: 19947,
    city: 'Parchim',
    dateOfBirth: new Date('1978-07-28'),
    joinedAt: new Date('2005-07-25'),
    issuedMandates: {
      create: {
        amount: 35,
        signedAt: new Date('2005-07-25'),
      },
    },
  },
  {
    firstname: 'Guy',
    lastname: 'Porter',
    street: 'Forest Ln 7606',
    postcode: 11494,
    city: 'Norman',
    dateOfBirth: new Date('1980-10-02'),
    joinedAt: new Date('2019-11-11'),
    issuedMandates: {
      create: {
        amount: 35,
        signedAt: new Date('2019-11-11'),
      },
    },
  },
  {
    firstname: 'Kenn',
    lastname: 'Boes',
    street: 'Kattegat 8891',
    postcode: 59308,
    city: 'Ten Esschen',
    dateOfBirth: new Date('1994-01-29'),
    joinedAt: new Date('2014-08-06'),
    issuedMandates: {
      create: {
        amount: 35,
        signedAt: new Date('2017-11-12'),
      },
    },
  },
  {
    firstname: 'Alejandra',
    lastname: 'Caballero',
    street: 'Calle del Pez 1671',
    postcode: 17812,
    city: 'Málaga',
    issuedMandates: {
      create: {
        amount: 35,
        signedAt: new Date('2017-11-12'),
        persons: {
          create: [
            {
              firstname: 'Vera',
              lastname: 'Caballero',
              street: 'Calle del Pez 1671',
              postcode: 17812,
              city: 'Málaga',
              dateOfBirth: new Date('2014-12-27'),
              joinedAt: new Date('2020-10-17'),
            },
          ],
        },
      },
    },
  },
  {
    firstname: 'Hilko',
    lastname: 'Arkema',
    street: 'De Voorstenkamp 7044',
    postcode: 98270,
    city: 'Utrecht',
    dateOfBirth: new Date('2006-10-27'),
    joinedAt: new Date('2014-01-02'),
    issuedMandates: {
      create: {
        amount: 17.5,
        signedAt: new Date('2016-01-12'),
      },
    },
  },
  {
    firstname: 'Milco',
    lastname: 'Alkan',
    street: 'Capellebosdreef 6949',
    postcode: 81970,
    city: 'Lintelo',
    dateOfBirth: new Date('1987-08-17'),
    joinedAt: new Date('1991-07-14'),
    issuedMandates: {
      create: {
        amount: 35,
        signedAt: new Date('2018-10-18'),
      },
    },
  },
  {
    firstname: 'Wesley',
    lastname: 'Soto',
    street: 'North Road 587',
    postcode: 48759,
    city: 'Newcastle upon Tyne',
    dateOfBirth: new Date('1965-07-21'),
    joinedAt: new Date('1971-12-31'),
    issuedMandates: {
      create: {
        amount: 17.5,
        signedAt: new Date('2018-10-18'),
      },
    },
  },
  {
    firstname: 'Malin',
    lastname: 'Lemoine',
    street: 'Rue Abel-Hovelacque 47',
    postcode: 65734,
    city: 'Corseaux',
    dateOfBirth: new Date('1987-05-22'),
    joinedAt: new Date('1980-02-17'),
  },
  {
    firstname: 'Santiago',
    lastname: 'Gonzalez',
    street: 'Calle del Barquillo 97',
    postcode: 98746,
    city: 'Fuenlabrada',
    dateOfBirth: new Date('1978-05-09'),
    joinedAt: new Date('1988-08-06'),
    issuedMandates: {
      create: {
        amount: 35,
        signedAt: new Date('2013-11-16'),
      },
    },
  },
]

async function addPersonToHisOwnMandate(firstname: string, lastname: string) {
  await addPersonToMandate(firstname, lastname, firstname, lastname)
}

async function addPersonToMandate(
  usingFirstname: string,
  usingLastname: string,
  issuedFirstname: string,
  issuedLastname: string
) {
  // Get issuedPerson
  const issuedPerson = await prisma.person.findFirst({
    where: { firstname: issuedFirstname, lastname: issuedLastname },
  })
  // If issuedPerson found
  if (issuedPerson) {
    // Get mandate
    const mandate = await prisma.mandate.findFirst({
      where: { accountHolderId: issuedPerson.id },
    })

    // If mandate found
    if (mandate) {
      let usingPerson: Person | null

      // If using person is issued person
      if (
        issuedFirstname === usingFirstname &&
        issuedLastname === usingLastname
      ) {
        usingPerson = issuedPerson
      } else {
        // Get using person
        usingPerson = await prisma.person.findFirst({
          where: { firstname: usingFirstname, lastname: usingLastname },
        })
      }

      // If using person found
      if (usingPerson) {
        // Connect person to mandate
        await prisma.person.update({
          where: { id: usingPerson.id },
          data: {
            authorizationMandate: {
              connect: { id: mandate.id },
            },
          },
        })
        console.log(
          `Person ${usingPerson.id} connected to mandate ${mandate.id}`
        )
      }
    }
  }
}

async function main() {
  console.log(`Start seeding ...`)

  // Create persons
  for (const u of personData) {
    const person = await prisma.person.create({
      data: u,
    })
    console.log(`Created person with id: ${person.id}`)
  }

  await addPersonToHisOwnMandate('Peter', 'Parker')
  await addPersonToHisOwnMandate('Klaus-Michael', 'Schröer')
  await addPersonToHisOwnMandate('Guy', 'Porter')
  await addPersonToHisOwnMandate('Kenn', 'Boes')
  await addPersonToHisOwnMandate('Hilko', 'Arkema')
  await addPersonToHisOwnMandate('Milco', 'Alkan')
  await addPersonToHisOwnMandate('Wesley', 'Soto')
  await addPersonToHisOwnMandate('Santiago', 'Gonzalez')

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
