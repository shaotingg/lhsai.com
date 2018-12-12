import fs from 'fs'
import knex from 'knex'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './api/db.sqlite'
  },
  useNullAsDefault: true
})
// Create a table
db.schema
.hasTable('css')
.then( (exists) => {
    if(!exists) {
      return db.schema.createTable('css', (t) =>{
          t.increments('id').primary()
          t.timestamp('date').defaultTo(db.fn.now())
          t.string('title')
          t.string('image')
          t.string('excerpt')
          t.text('content')
      })
    }
  })
  .catch( err => {
      console.log('error !!!', err.message, err.stack)
      return
  })

  export default db
