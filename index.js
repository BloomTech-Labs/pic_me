const server = require('./server'); 
// to test upload/transform functionality uncomment line 3
// const server = require('./api/photos/transform');

const { dev, debug } = require('./dev');

const port = process.env.PORT || 5555;

server.listen(port, _ => {
  debug ? console.log(`Listening on port: ${port}`) : null;
});
