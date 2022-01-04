const { loginSchema } = require('../controllers/schemas/auth');
const { loginHandler } = require('../controllers/handlers/auth');

const loginOpts = {
    schema: loginSchema,
    handler: loginHandler
};

async function routes(fastify, options) {
    fastify.post('/login', loginOpts);
}

module.exports = routes;
