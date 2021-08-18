require('dotenv').config();

/*Hapi Framework*/
const Hapi = require('@hapi/hapi');
/*End hapi framework*/

/*Notes Service Config*/
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService'); 
/*End Notes*/

/*Notes validator*/
const NotesValidator = require('./validator/notes');
/*End Notes validator*/

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options:{
      service: notesService,
      validator: NotesValidator,
    }
  })

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
