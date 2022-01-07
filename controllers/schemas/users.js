const user = {
    type: 'object',
    properties: {
        user_id: { type: 'integer'},
        email: { type: 'string'},
        roles: { type: 'array'} 
    }
};

const genericResponse = {
    type: 'object',
    properties: { 
        responseCode: {type: 'string'}
    }
};

const getUsersSchema = {
    headers: {$ref: 'headerSchema#'},
    response: {
        200: {
            type: 'array',
            items: user
        }
    }
};

const getUserSchema = {
    headers: {$ref: 'headerSchema#'},
    param: {
        id: {type: 'number'},
    },
    response: {
        200: user
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
        200: genericResponse
    }
};

const updateUserSchema = {
    headers: {$ref: 'headerSchema#'},
    param: {
        id: {type: 'number'},
    },
    body: { 
        type: 'object',
        required: ['password'],
        properties: {
            password: {type: 'string'},
        }
    },    
    response: { 
        200: genericResponse
    }
};

const deleteUserSchema = {
    headers: {$ref: 'headerSchema#'},
    param: {
        id: {type: 'number'},
    },  
    response: { 
        200: genericResponse
    } 
};

module.exports = {
    getUserSchema,
    getUsersSchema,
    addUserSchema,
    updateUserSchema,
    deleteUserSchema
};