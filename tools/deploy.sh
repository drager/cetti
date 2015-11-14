#!/bin/sh

if [ "$TRAVIS_BRANCH" != "master" ]
then
  exit 0
elif [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  exit 0
fi

set -e
npm run build
cd dist

git init
git checkout -b gh-pages
git config --global user.email "jesper@jesperh.se"
git config --global user.name "travis-ci"
git remote add deploy "https://$GITHUB_AUTH@github.com/drager/cetti.git"

git add -A

git commit -am "Deploy of build #$TRAVIS_BUILD_NUMBER of commit $TRAVIS_COMMIT"
git push deploy gh-pages --force > /dev/null 2>&1
