
require('dotenv').config({ path: './.env' });
const { mongoConnect } = require('./services/mongodb');
const http = require('http');
const app = require('./app');


const PORT = process.env.PORT || 8000;

//using inbuild nodejs module to create server.
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  
  server.listen(PORT, () => {
    
    console.log(`listening on port ${PORT}...`);
    
  });
}
startServer();

