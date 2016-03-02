#!/bin/bash

# Fast fail the script on failures.
set -e

cd common
npm link
cd ..

if [ "$TEST" = "clients" ]
then
  cd clients
  for client in *
  do
    cd $client
    npm install
    npm run lint
    npm run test
    cd ..
  done
elif [ "$TEST" = "server" ]
then
  cd server
  npm install
  npm link cetti-common
  npm run lint
  npm run build_typescript
elif [ "$TEST" = "ui" ]
then
  cd ui
  npm install
  npm link cetti-common
  npm run lint
  npm run build_typescript
fi
