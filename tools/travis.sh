#!/bin/bash

# Fast fail the script on failures.
set -e

if [ "$TEST" = "client" ]
then
  cd client
  npm install
  npm run lint
  npm run build_typescript
elif [ "$TEST" = "server" ]
then
  cd server
  npm install
  npm run build_typescript
fi
