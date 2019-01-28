# Prepare

## Create dirs in onedata-gui-static

```
mkdir -p oz/onezone ozp/onezone op/oneprovider-1 opp/oneprovider-1
echo "oz" > oz/onezone/index.html
echo "ozp" > ozp/onezone/index.html
echo "op" > op/oneprovider-1/index.html
echo "opp" > opp/oneprovider-1/index.html
```

# Development

## Development with auto-reload server

Install `nodemon` package with: `npm install -g nodemon`

Then serve:

```
DEBUG=express:* nodemon index.js
```
