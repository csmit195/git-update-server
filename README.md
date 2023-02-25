# GIT Update Server (for serving private repo files)

Depends on use-case, but good for using git to host simple scripts and instead of providing 3 month lease repo tokens, you can use this with your personal access token and supply it. 

## Getting Started

### Prerequisites

- Node.js (version X or higher)
- NPM (version X or higher)

### Installation

1. Clone the repository
2. Install the required packages by running the following command: `npm install`
3. Create a new `config.json` file based on the `config.example.json` file and fill in the required information.

## Usage

To start the server, run the following command:
```bash
node index.js
```


The server will start listening on the port specified in the `config.json` file. You can access the server by navigating to `http://localhost:<port>` in your web browser.

## Configuration

The `config.json` file contains the following settings:

### Server

- `port`: The port that the server will listen on.
- `host`: The host that the server will bind to. Leave this blank to bind to all available network interfaces.

### Github

- `token`: Your personal access token for GitHub. This is used to authenticate with the GitHub API when retrieving files from private repositories.

### Routes

This section defines the routes that the server will handle. Each route is defined by a unique key, and contains the following settings:

- `repo`: The name of the GitHub repository in the format `username/repo-name`.
- `files`: An object that defines the files that will be served by the server. Each file is defined by a unique key, and contains the following settings:
  - `path`: The path to the file in the repository. This should include the filename and extension.
  - `type`: The type of file. This can be either `raw` or `api`. The `raw` type retrieves the raw contents of the file from the repository, while the `api` type retrieves the contents of the file via the GitHub API.

For example, the following `config.json` file defines a route for a private repository with the username `exampleuser` and repository name `example-repo` and the branch name `example-branch`, with two files (`__ExtendedHTTP.version.txt` and `__ExtendedHTTP.lua`) that will be served by the server:

```json
{
    "server": {
        "port": 3000,
        "host": ""
    },
    "github": {
        "token": "your token here"
    },
    "routes": {
        "SecretProject": {
            "repo": "exampleuser/example-repo/example-branch",
            "files": {
                "version": {
                    "path": "script.version.txt",
                    "type": "raw"
                },
                "main": {
                    "path": "index.js",
                    "type": "raw"
                }
            }
        }
    }
}
```

The above config would sent requests like this:
- http://localhost:3000/ExtendedHTTP/version => https://raw.githubusercontent.com/exampleuser/example-repo/example-branch/script.version.txt
- http://localhost:3000/ExtendedHTTP/main => https://raw.githubusercontent.com/exampleuser/example-repo/example-branch/index.js

Note that in the `files` object, each file is defined as a unique key, with its own `path` and `type` settings. You can define additional routes by adding more objects to the `routes` object.

## Built With

- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
- [Axios](https://github.com/axios/axios) - A promise-based HTTP client for the browser and Node.js.

## Authors

- [csmit195](https://github.com/csmit195)