import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const genreNames = ['Fiction', 'Science', 'History', 'Children'];
  const genres = [];
  for (const name of genreNames) {
    const g = await prisma.genre.upsert({ where: { name }, update: {}, create: { name } });
    genres.push(g);
  }
  const map: Record<string, string> = {};
  genres.forEach(g => map[g.name] = g.id);

  const books = [
    { title: 'The River Between', author: "Ngugi wa Thiong'o", isbn: '978-001', publishedYr: 1965, genreId: map['Fiction'] },
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '978-002', publishedYr: 1958, genreId: map['Fiction'] },
    { title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie', isbn: '978-003', publishedYr: 2003, genreId: map['Fiction'] },
    { title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', isbn: '978-004', publishedYr: 2006, genreId: map['Fiction'] },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '978-005', publishedYr: 1988, genreId: map['Science'] },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '978-006', publishedYr: 2011, genreId: map['Science'] },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '978-007', publishedYr: 1976, genreId: map['Science'] },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '978-008', publishedYr: 1980, genreId: map['Science'] },
    { title: "A People's History of the United States", author: 'Howard Zinn', isbn: '978-009', publishedYr: 1980, genreId: map['History'] },
    { title: 'Facing Mount Kenya', author: 'Jomo Kenyatta', isbn: '978-011', publishedYr: 1938, genreId: map['History'] },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '978-012', publishedYr: 1994, genreId: map['History'] },
    { title: 'The Mau Mau War', author: 'Maina Kinyatti', isbn: '978-010', publishedYr: 1985, genreId: map['History'] },
    { title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', isbn: '978-013', publishedYr: 1997, genreId: map['Children'] },
    { title: 'Matilda', author: 'Roald Dahl', isbn: '978-014', publishedYr: 1988, genreId: map['Children'] },
    { title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', isbn: '978-015', publishedYr: 1950, genreId: map['Children'] },
    { title: "Charlotte's Web", author: 'E.B. White', isbn: '978-016', publishedYr: 1952, genreId: map['Children'] },
  ];

  for (const b of books) {
    await prisma.book.upsert({ where: { isbn: b.isbn }, update: {}, create: b });
  }

  await prisma.user.upsert({
    where: { email: 'librarian@library.com' },
    update: {},
    create: { email: 'librarian@library.com', name: 'Libby Librarian', password: 'hashedpassword', role: Role.LIBRARIAN },
  });

  console.log('Seeded 4 genres, 16 books');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
