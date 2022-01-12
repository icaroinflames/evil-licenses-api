const fp = require('fastify-plugin');

const ADMIN_ROLE = 'admin';
const USER_ROLE = 'user';

module.exports = fp(async function(fastify, options, done){
    fastify.decorate("verifyToken", async function(req, reply, done){
        const token = req.headers.authorization;
        try{
            req.decoded = await fastify.jwt.verify(token);
            done();
        }catch(err){
            reply.status(401);
            done(new Error('Invalid authorization'));
        }
    });

    fastify.decorate("verifyAdmin", async function(req, reply, done){
        const token = req.headers.authorization;
        try{
            req.decoded = await fastify.jwt.verify(token);
            req.decoded.roles.includes('admin') ? done() : done(new Error('admin privileges needed'));
        }catch(err){
            reply.status(401);
            done(new Error('Invalid authorization'));
        }
    });
});
