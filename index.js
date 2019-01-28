const express = require('express');
const https = require('https');
const fs = require('fs');

const staticRootDir = '/Users/kliput/Onedata/onedata-gui-static';

const clusters = [
  {
    id: 'onezone',
    type: 'onezone',
  },
  {
    id: 'oneprovider-1',
    type: 'oneprovider',
  },
];


const app = express();

const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

clusters.forEach((cluster) => {
  const typeLetter = cluster.type[3];
  const servicePath = `o${typeLetter}/${cluster.id}`;
  const panelPath = `o${typeLetter}p/${cluster.id}`;

  [servicePath, panelPath].forEach((path) => {
    const absPath = `/${path}`;
    app.get(absPath, (req, res) => {
      res.redirect(`${absPath}/i`);
    });
    app.get(`${absPath}/i`, (req, res) => {
      res.sendFile(`${staticRootDir}/${path}/index.html`);
    });
    app.use(absPath, express.static(`${staticRootDir}/${path}`));
  });
});

const server = https.createServer(credentials, app);

server.listen(443);
