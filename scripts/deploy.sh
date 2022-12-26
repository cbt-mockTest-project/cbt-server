#!/usr/bin/env bash
sed -i '.bak' "/\/dist/d" .gitignore
git reset --hard origin/release
yarn
yarn build
rm -rf src
rm -rf .gitignore
git add .
git commit -m "deploy"
git push origin deploy --force

