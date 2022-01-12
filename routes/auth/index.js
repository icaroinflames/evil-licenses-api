const { loginSchema } = require('../../schemas/auth');
const { loginHandler } = require('../../handlers/auth');



async function routes(fastify, options) {
    const loginOpts = {
        schema: loginSchema,
        handler: loginHandler
    };
    
    fastify.post('/login', loginOpts);
}

module.exports = routes;
