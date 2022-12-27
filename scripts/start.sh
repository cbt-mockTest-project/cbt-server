git remote update
git reset --hard origin/deploy
yarn
cross-env NODE_ENV=prod pm2 start ecosystem.config.js