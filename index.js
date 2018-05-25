const server = require('./server');

const { debug } = require('./dev');

const port = process.env.PORT || 5555;

server.listen(port, _ => {
  debug ? console.log(`Listening on port: ${port}`) : null;
});
