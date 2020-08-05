#!/bin/bash

# Download iOS framework
cd ios
rm Mobile.framework.zip
wget https://github.com/OpenBazaar/openbazaar-go/releases/download/v0.14.4/Mobile.framework.zip
unzip ./Mobile.framework.zip

# Download Android library
cd ../android/mobile
rm mobile.aar
wget https://github.com/OpenBazaar/openbazaar-go/releases/download/v0.14.4/mobile.aar

# Return home
cd ../..
