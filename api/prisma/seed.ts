import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const hashed = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({ where: { email: 'librarian@test.com' }, update: {}, create: { name: 'Lib', email: 'librarian@test.com', password: hashed, role: 'LIBRARIAN' } });
  const genres = ['Fiction','Non-Fiction','Science','History'];
  const map:any={};
  for (const g of genres) { map[g]=await prisma.genre.upsert({ where:{name:g}, update:{}, create:{name:g} }); }
  const books=[
    {title:'The River Between',author:'Ngugi wa Thiongo',isbn:'978-0435908385',totalCopies:5,genre:'Fiction'},
    {title:'Things Fall Apart',author:'Chinua Achebe',isbn:'978-0385474542',totalCopies:3,genre:'Fiction'},
    {title:'Petals of Blood',author:'Ngugi wa Thiongo',isbn:'978-0435908170',totalCopies:4,genre:'Fiction'},
    {title:'Half of a Yellow Sun',author:'Chimamanda Ngozi Adichie',isbn:'978-1400075209',totalCopies:2,genre:'Fiction'},
    {title:'Long Walk to Freedom',author:'Nelson Mandela',isbn:'978-0316548182',totalCopies:6,genre:'Non-Fiction'},
    {title:'Becoming',author:'Michelle Obama',isbn:'978-1524763138',totalCopies:4,genre:'Non-Fiction'},
    {title:'Sapiens',author:'Yuval Noah Harari',isbn:'978-0062316097',totalCopies:5,genre:'Non-Fiction'},
    {title:'Educated',author:'Tara Westover',isbn:'978-0399590504',totalCopies:3,genre:'Non-Fiction'},
    {title:'A Brief History of Time',author:'Stephen Hawking',isbn:'978-0553380163',totalCopies:2,genre:'Science'},
    {title:'The Selfish Gene',author:'Richard Dawkins',isbn:'978-0199291151',totalCopies:3,genre:'Science'},
    {title:'Cosmos',author:'Carl Sagan',isbn:'978-0345331359',totalCopies:4,genre:'Science'},
    {title:'A Short History of Nearly Everything',author:'Bill Bryson',isbn:'978-0767908184',totalCopies:2,genre:'Science'},
    {title:'The History of Kenya',author:'Bethwell Ogot',isbn:'978-9966250001',totalCopies:5,genre:'History'},
    {title:'Guns, Germs, and Steel',author:'Jared Diamond',isbn:'978-0393061314',totalCopies:3,genre:'History'},
    {title:'1776',author:'David McCullough',isbn:'978-0743226714',totalCopies:2,genre:'History'},
  ];
  for (const b of books) { await prisma.book.upsert({ where:{isbn:b.isbn}, update:{}, create:{ title:b.title, author:b.author, isbn:b.isbn, totalCopies:b.totalCopies, genreId: map[b.genre].id } }); }
  console.log('Seeded');
}
main().then(()=>prisma.$disconnect());
