'use strict';

const Hapi = require('@hapi/hapi');
//const Boom = require('@hapi/boom');
const Hoek = require('@hapi/hoek');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
    
    server.route({
        method: ['PUT', 'POST'
    ],
        path: '/',
        handler: function (request, h) {
    
            return 'I did something!';
        }
    });


    server.route({  
        method: 'GET',
        path:   '/users',
        handler: (request, h) => {
        var data = {
            key: 'renato',
            another: false,
            number: 1,
            func: function() {
            return this.number * 10
            }
      }
      //var error = new Error('Unexpected input');
      //Boom.boomify(error, { statusCode: 400 });

      //Boom.unauthorized('invalid password');
     return data
    }
  })

  server.route({
    method: 'GET',
    path: '/hello/{user}',
    handler: function (request, h) {

        //return `Hello ${request.params.user}!`;
        //Hoek -> utilities
        return `Hello ${Hoek.escapeHtml(request.params.user)}!`
    }
});
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();