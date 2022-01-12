const loginRequest = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {type: 'string'},
        password: {type: 'string'}
    }
};

const loginResponse = {
    type: 'object',
    required: ['responseCode', 'token'],
    properties: {
        responseCode: { type: 'string'},
        token: {type: 'string'}
    }
};

const loginSchema = {
    body: loginRequest,
    response:{
        200: loginResponse
    }
};

module.exports = {
    loginSchema
};