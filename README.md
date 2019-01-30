# Prepare

## Install dependencies

As usual: `npm install`

## Create dirs in onedata-gui-static

See `reset-public.sh` script which will make dirs in `static` or make your own directory structure.


## Add local subdomains

Add these to `/etc/hosts`:

```
127.0.0.1 onezone.local-onedata.org
127.0.0.1 oneprovider-1.local-onedata.org
```

## Build GUIs

Build:

- `onezone-gui` -> `onedata-gui-static/oz/onezone/`
- `op-gui-default` -> `onedata-gui-static/op/oneprovider-1/`
- `onepanel-gui` -> `onedata-gui-static/onepanel` (oz-panel and op-panel)

You can make symlink to one `onepanel-gui` build for `oz-panel` and `op-panel`,
as described in start of this readme. So 

## Install and use

For example use:

```
npm start
```

You will have:

- https://onezone.local-onedata.org/oz/onezone
- https://onezone.local-onedata.org/ozp/onezone
- https://onezone.local-onedata.org:9443
- https://oneprovider-1.local-onedata.org/op/oneprovider-1
- https://oneprovider-1.local-onedata.org/opp/oneprovider-1
- https://oneprovider-1.local-onedata.org:9443

# Development

## Development with auto-reload server

Install `nodemon` package with: `npm install -g nodemon`

Then serve:

```
DEBUG=express:* nodemon index.js
```
