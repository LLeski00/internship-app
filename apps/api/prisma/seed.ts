import { Discipline, DisciplineStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.intern.createMany({
    data: [
      {
        email: 'ante.roca@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        data: {},
        id: 'ante-roca',
      },
      {
        email: 'ana.kovac@example.com',
        firstName: 'Ana',
        lastName: 'Kovač',
        data: {},
        id: 'ana-kovac',
      },
      {
        email: 'ivan.petrovic@example.com',
        firstName: 'Ivan',
        lastName: 'Petrović',
        data: {},
        id: 'ivan-petrovic',
      },
      {
        email: 'marija.juric@example.com',
        firstName: 'Marija',
        lastName: 'Jurić',
        data: {},
        id: 'marija-juric',
      },
      {
        email: 'marko.horvat@example.com',
        firstName: 'Marko',
        lastName: 'Horvat',
        data: {},
        id: 'marko-horvat',
      },
      {
        email: 'petra.milic@example.com',
        firstName: 'Petra',
        lastName: 'Milić',
        data: {},
        id: 'petra-milic',
      },
      {
        email: 'josip.knez@example.com',
        firstName: 'Josip',
        lastName: 'Knez',
        data: {},
        id: 'josip-knez',
      },
      {
        email: 'katarina.vidic@example.com',
        firstName: 'Katarina',
        lastName: 'Vidić',
        data: {},
        id: 'katarina-vidic',
      },
      {
        email: 'tomislav.kos@example.com',
        firstName: 'Tomislav',
        lastName: 'Koš',
        data: {},
        id: 'tomislav-kos',
      },
      {
        email: 'mia.babic@example.com',
        firstName: 'Mia',
        lastName: 'Babić',
        data: {},
        id: 'mia-babic',
      },
    ],
  });

  await prisma.internDiscipline.createMany({
    data: [
      {
        internId: 'ante-roca',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'ana-kovac',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'ivan-petrovic',
        discipline: Discipline.Design,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'marija-juric',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'marko-horvat',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'petra-milic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'josip-knez',
        discipline: Discipline.Design,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'katarina-vidic',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'tomislav-kos',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
      },
      {
        internId: 'mia-babic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
      },
    ],
  });

  await prisma.interviewSlot.createMany({
    data: [
      {
        id: '1',
        start: new Date('2021-06-01T10:00:00.000Z'),
        end: new Date('2021-06-01T10:30:00.000Z'),
        internId: 'ante-roca',
        answers: {},
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
