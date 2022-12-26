#!/usr/bin/env bash
git reset --hard origin/release
yarn
yarn build
rm -rf node_modules
rm -rf src
rm -rf .gitignore
git add .
git commit -m "deploy"
git push origin deploy --force
