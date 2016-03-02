#!/bin/bash

# Fast fail the script on failures.
set -e

cd common
npm link
cd ..

if [ "$TEST" = "client" ]
then
  cd client
  npm install
  npm link common
  npm run lint
  npm run build_typescript
elif [ "$TEST" = "server" ]
then
  cd server
  npm install
  npm link common
  npm run lint
  npm run build_typescript
fi
