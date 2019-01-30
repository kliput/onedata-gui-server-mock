cd static
rm -rf onedata-gui-static
mkdir onedata-gui-static
cd onedata-gui-static

mkdir -p oz/onezone ozp op/oneprovider-1 opp onepanel
pushd ozp
  ln -s ../onepanel onezone
popd
pushd opp
  ln -s ../onepanel oneprovider-1
popd
echo "oz" > oz/onezone/index.html
echo "op" > op/oneprovider-1/index.html
echo "onepanel" > onepanel/index.html
