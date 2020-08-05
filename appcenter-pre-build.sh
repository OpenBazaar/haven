#!/usr/bin/env bash
# fail if any commands fails
set -e
# debug log
set -x

# write your script here
echo "Ionicons fix!"
rm -f ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json

# or run a script from your repository, like:
# bash ./path/to/script.sh
# not just bash, e.g.:
# ruby ./path/to/script.rb

echo "\nInstalling Pods...\n"
cd ios
pod install --repo-update
cd ..
echo "\nFinished installing Pods.\n"