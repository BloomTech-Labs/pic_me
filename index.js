const server = require('./api/photos/uploadTest');/* switch back to ./server */
// const server = require('./server'); 

const { dev, debug } = require('./dev');

const port = process.env.PORT || 5555;

server.listen(port, _ => {
  debug ? console.log(`Listening on port: ${port}`) : null;
});
