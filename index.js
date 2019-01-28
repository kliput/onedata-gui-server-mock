const express = require('express');
const subdomain = require('express-subdomain');
const https = require('https');
const fs = require('fs');

const staticRootDir = '/Users/kliput/Onedata/onedata-gui-static';
const onezoneId = 'onezone';

const clusters = [
  {
    id: onezoneId,
    type: 'onezone',
  },
  {
    id: 'oneprovider-1',
    type: 'oneprovider',
  },
];

const onezoneApp = express();
const onezoneRouter = express.Router();
onezoneApp.use(subdomain(onezoneId, onezoneRouter));

const onepanelApp = express();

const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

onezoneRouter.get('/', (req, res) => {
  res.redirect(`/oz/${onezoneId}`);
});

clusters.forEach((cluster) => {
  const typeLetter = cluster.type[3];
  const servicePath = `o${typeLetter}/${cluster.id}`;
  const panelPath = `o${typeLetter}p/${cluster.id}`;

  [servicePath, panelPath].forEach((path) => {
    const absPath = `/${path}`;
    onezoneRouter.get(absPath, (req, res) => {
      res.redirect(`${absPath}/i`);
    });
    onezoneRouter.get(`${absPath}/i`, (req, res) => {
      res.sendFile(`${staticRootDir}/${path}/index.html`);
    });
    onezoneRouter.use(absPath, express.static(`${staticRootDir}/${path}`));
  });

  const onepanelRouter = express.Router();
  onepanelApp.use(subdomain(cluster.id, onepanelRouter));
  onepanelRouter.use(express.static(`${staticRootDir}/${panelPath}`));
});

const onezoneServer = https.createServer(credentials, onezoneApp);
onezoneServer.listen(443);

const onepanelServer = https.createServer(credentials, onepanelApp);
onepanelServer.listen(9443);
