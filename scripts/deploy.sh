#!/usr/bin/env bash
git reset --hard origin/release
yarn build
sed -i '.bak' "/\/dist/d" .gitignore
git add .
git commit -m "deploy"
git push origin deploy --force

