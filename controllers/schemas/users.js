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
    response: {
        200: {
            type: 'array',
            items: user
        }
    }
};

const getUserSchema = {
    param: {
        id: {type: 'number'},
    },
    response: {
        200: user
    },
};

const addUserSchema = {
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