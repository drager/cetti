#!/bin/bash

# Fast fail the script on failures.
set -e

if [ "$TEST" = "client" ]
then
  cd client
  npm install
  npm run lint
  npm run build_typescript
fi
