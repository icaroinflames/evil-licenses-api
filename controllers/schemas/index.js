// common schemas
const commonSchemas = function(fastify, options, done){
    fastify.addSchema({
        $id: 'headerSchema',
        type: 'object',
        required: ['Authorization'],        
        properties: {
            Authorization: {type: 'string'}
        }
    });

    done();
};

module.exports = commonSchemas;