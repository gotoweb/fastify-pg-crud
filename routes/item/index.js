'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const client = await fastify.pg.connect()

    try {
      const { rows } = await client.query('SELECT * FROM items')
      console.log(rows)

      reply.send(rows).code(200)
    } finally {
      client.release()
    }
  })
}
