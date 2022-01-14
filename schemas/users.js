const getUsersSchema = {
    headers: {$ref: 'headerSchema#'},
    response: {
        200: {
            type: 'array',
            items: {$ref: 'userModelSchema#'}
        }
    }
};

const getUserSchema = {
    headers: {$ref: 'headerSchema#'},
    params: {
        type: 'object',
        properties: {
            userId: {type: 'number'},
        }
    },
    response: {
        200: {$ref: 'userModelSchema#'}
    },
};

const addUserSchema = {
    headers: {$ref: 'headerSchema#'},
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {type: 'string'},
            password: {type: 'string'},
        }
    },
    response: { 
        200: {$ref: 'genericResponse#'},
    }
};

const updateUserSchema = {
    headers: {$ref: 'headerSchema#'},
    params: {
        type: 'object',
        properties: {
            userId: {type: 'number'},
        }
    },
    body: { 
        type: 'object',
        required: ['password'],
        properties: {
            password: {type: 'string'},
        }
    },    
    response: { 
        200: {$ref: 'genericResponse#'},
    }
};

const deleteUserSchema = {
    headers: {$ref: 'headerSchema#'},
    params: {
        type: 'object',
        properties: {
            userId: {type: 'number'},
        }
    }, 
    response: { 
        200: {$ref: 'genericResponse#'},
    } 
};

module.exports = {
    getUserSchema,
    getUsersSchema,
    addUserSchema,
    updateUserSchema,
    deleteUserSchema
};