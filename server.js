const fastify = require('fastify')();
const fastifyBcrypt = require('fastify-bcrypt'); //para encryptación hash
const fastifyPostgres = require('fastify-postgres'); //conector de bb
const fastifyAuth = require('fastify-auth'); //plugin de gestion de autenticación
const fastifyJwt = require('fastify-jwt'); //plugin para creación y comprobación de jsonWebTokens

/**
 * RUTAS
 */
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

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
fastify.register(fastifyAuth);
fastify.register(fastifyJwt, { secret: '_5+rUs0.8IKw'});
fastify.register(require('./controllers/schemas'));

// Declare a route
fastify.get('/api/v1', async (request, reply) => {
  return { hello: 'world' };
});

fastify.register(usersRoutes, {prefix: '/api/v1/users'});
fastify.register(authRoutes, {prefix: '/api/v1/auth'});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();