#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A 
git commit -m "deploy"

git remote add origin https://github.com/nsssayom/manydial_web_front_deploy.git
git branch -m main
git push --force origin main