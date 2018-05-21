const server = require('./server');

const port = 5000;

server.listen(process.env.PORT || port, _ => {
  console.log(`Listening on port: ${port}`);
});
