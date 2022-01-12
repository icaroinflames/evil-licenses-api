const {
    getUsersSchema,
    getUserSchema,
    addUserSchema,
    updateUserSchema,
    deleteUserSchema
} = require('../../schemas/users');

const { 
    getUsersHandler,
    getUserHandler,
    addUserHandler,
    updateUserHandler,
    deleteUserHandler
} = require('../../handlers/users');

async function routes(fastify, options){
    
    const getUsersOpts = {
        schema: getUsersSchema,
        preHandler: fastify.auth([
            fastify.verifyToken, 
            fastify.verifyAdmin
        ], {relation: 'and' }),
        handler: getUsersHandler,
    };
    
    const getUserOpts = {
        schema: getUserSchema,
        preHandler: fastify.auth([fastify.verifyToken]),
        handler: getUserHandler,
    };
    
    const addUserOpts = {
        schema: addUserSchema,
        preHandler: fastify.auth([fastify.verifyToken]),
        handler: addUserHandler,
    };
    
    const updateUserOpts = {
        schema: updateUserSchema,
        preHandler: fastify.auth([fastify.verifyToken]),
        handler: updateUserHandler,
    };
    
    const deleteUserOpts = {
        schema: deleteUserSchema,
        preHandler: fastify.auth([fastify.verifyToken, fastify.verifyAdmin]),
        handler: deleteUserHandler,
    };

    fastify.get('/', getUsersOpts);

    fastify.get('/:userId', getUserOpts);

    fastify.post('/', addUserOpts);

    fastify.patch('/:userId', updateUserOpts);

    fastify.delete('/:userId', deleteUserOpts);

}

module.exports = routes;