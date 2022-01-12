const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = async function (fastify, opts) {

  /**
   * REGISTRO DE PLUGINS GLOBALES
   */

  fastify.register(require('fastify-postgres'), {
    host: 'localhost',
    database: 'evil-licenses',
    user: 'admin',
    password: 'password',
    port: 5432,
  });

  fastify.register(require('fastify-bcrypt'));
  fastify.register(require('fastify-auth'));
  fastify.register(require('fastify-jwt'), { secret: '_5+rUs0.8IKw'});
  fastify.register(require('fastify-swagger'),{
  routePrefix: '/doc',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Evil Licenses API',
      description: 'API para manejo de licencias malignas',
      version: '0.1.0'
    }
  }
  });


  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({prefix:"/api/v1"}, opts)
  });
};
