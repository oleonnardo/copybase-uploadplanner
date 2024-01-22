const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.timeout = 20000;

server.listen(port, () => {
    console.log(`- Local: http://localhost:${port}`);
    console.log(`- press ctrl + c to stop`);
})
