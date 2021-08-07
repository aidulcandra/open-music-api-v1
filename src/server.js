const Hapi = require('@hapi/hapi');
const SongsService = require('./services/inMemory/SongsService');
const openMusic = require('./api/open-music');
const SongsValidator = require('./validator/songs');

const init = async () => {
  const songsService = new SongsService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: openMusic,
    options: {
      service: songsService,
      validator: SongsValidator,
    },
  });

  await server.start();
  console.log(`SERVER BERJALAN: ${server.info.uri}`);
};

init();
