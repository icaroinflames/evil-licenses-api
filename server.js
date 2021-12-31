const fastify = require('fastify')();
const fastifyBcrypt = require('fastify-bcrypt-plugin'); //para encryptación hash
const fastifyPostgres = require('fastify-postgres'); //conector de bb

/**
 * RUTAS
 */
const users = require('./routes/users');


/**
 * REGISTRO DE PLUGINS GLOBALES
 */

fastify.register(fastifyPostgres, {
    host: 'localhost',
    database: 'evil-licenses',
    user: 'admin',
    password: 'password',
    port: 5432,
});

fastify.register(fastifyBcrypt);


// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.register(users, {prefix: '/api/v1/users'});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();