const app = require('./express');
const git = require('./github');
const { routes } = require('../config.json');

// Temporary root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// parse routes(object) and add them to the express app
// key is the route, and value.files is the array of files that are being routed
// Object.keys(routes).forEach((key) => {
//     const route = routes[key];
//     const { files } = route;

//     console.log(`Route: ${key} | Files: ${files}`);

    
// });

app.get('/:service/:path', (req, res) => {
    const { service, path } = req.params;
    let { method } = req.query;

    method = method || 'raw';

    const serviceRoute = routes[service];

    if ( !serviceRoute ) {
        res.status(404).send('Service not found');
        return;
    }

    const { files } = serviceRoute;

    if (!files[path]) {
        res.status(404).send('File not found');
        return;
    }

    const file = files[path];
    
    if ( method == 'raw' ) {
        git.getRawFile(serviceRoute.repo, file.file).then((data) => {
            res.set('Content-Type', 'text/plain');
            res.send(data);
        });
    } else if ( method == 'api' ) {
        git.getAPIFile(serviceRoute.repo, file.file).then((data) => {
            res.set('Content-Type', 'application/json');
            res.send(data);
        });
    } else {
        res.status(400).send('Invalid method');
    }
});