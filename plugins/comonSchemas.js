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
    done();
});