const { server } = require('../config.json');
const express = require('express');

const app = express();

app.listen(server.port, () => {
    console.log(`Example app listening at http://localhost:${server.port}`);
});

module.exports = app;