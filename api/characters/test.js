const request = require('supertest')
const db = require('../../data/dbConfig')
const server = require('../server')
const Characters = require('./model')

const character1 = { name: 'james' }
const character2 = { name: 'stuart' }
const character3 = { name: 'austin' }

beforeEach(async () => {
   await db('characters').truncate()
})
beforeAll(async () => {
   await db.migrate.rollback()
   await db.migrate.latest()
})
afterAll(async () => {
   await db.destroy()
})

it("correct env variable", () => {
expect(process.env.DB_ENV).toBe('testing')
})

describe('checking the character functions', () => {
   describe('creates a character', () => {
      it('add a character to the database', async () => {
         let character
         await Characters.add(character1)
         character = await db('characters')
         expect(character).toHaveLength(1)
      })
      it('adds the correct character to the database', async () => {
         let character
         await Characters.add(character2)
         character = await db('characters').first()
         expect(character).toMatchObject({ name: "stuart" })
      })
   })

   describe('deletes a character', () => {
      it('delete a character from the database', async () => {
         const [character_id] = await db('characters').insert(character1)
         await db('characters').insert(character2)
         await db('characters').insert(character3)
         let character = await db('characters')
         expect(character).toHaveLength(3)
         await request(server).delete("/api/character/" + character_id)
         let newChar = await db('characters')
         expect(newChar).toHaveLength(2)
      })
      it('show deleted character', async () => {
         await db('characters').insert(character2)
         let deletedChar = await request(server).delete("/api/character/1")
         expect(deletedChar.body).toMatchObject({ name: "stuart" })
      })
   })
})

describe('testing router function', () => {
   describe('post adds to db', () => {
      it('adds to the database', async () => {
         const newChar = await request(server).post('/api/character').send({name: "Luis"})
         expect(newChar.status).toBe(201)
      })
   })
})