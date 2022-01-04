// common schemas
const commonSchemas = function(fastify, options, done){
    fastify.addSchema({
        $id: 'headerSchema',
        type: 'object',
        properties: {
            token: {type: 'string', required: true}
        }
    });

    done();
};

module.exports = commonSchemas;