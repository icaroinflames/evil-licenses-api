const fp = require('fastify-plugin');
module.exports = fp(function(fastify, options, done){
    fastify.addSchema({
        $id: 'headerSchema',
        type: 'object',
        required: ['authorization'],        
        properties: {
            authorization: {type: 'string'}
        }
    });

    fastify.addSchema({
        $id: 'userModelSchema',
        type: 'object',
        properties: {
            user_id: { type: 'integer'},
            email: { type: 'string'},
            roles: { type: 'array'} 
        }
    });
    done();
});