const {
    getUsersSchema,
    getUserSchema,
    addUserSchema,
    updateUserSchema,
    deleteUserSchema
} = require('../controllers/schemas/users');

const { 
    getUsersHandler,
    getUserHandler,
    addUserHandler,
    updateUserHandler,
    deleteUserHandler
} = require('../controllers/handlers/users');

const getUsersOpts = {
    headers: {$ref: 'headerSchema#'},
    schema: getUsersSchema,
    handler: getUsersHandler,
};

const getUserOpts = {
    schema: getUserSchema,
    handler: getUserHandler,
};

const addUserOpts = {
    schema: addUserSchema,
    handler: addUserHandler,
};

const updateUserOpts = {
    schema: updateUserSchema,
    handler: updateUserHandler,
};

const deleteUserOpts = {
    schema: deleteUserSchema,
    handler: deleteUserHandler,
};

async function routes(fastify, options){
    
    fastify.get('/', getUsersOpts);

    fastify.get('/:userId', getUserOpts);

    fastify.post('/', addUserOpts);

    fastify.patch('/:userId', updateUserOpts);

    fastify.delete('/:userId', deleteUserOpts);

}

module.exports = routes;