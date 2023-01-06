# STEP 1
# 1
FROM node:16 AS builder
# 2
WORKDIR /CBT-SERVER
# 3
COPY . .
# 4
RUN yarn
# 5
RUN yarn build

# 6
FROM node:16-alpine
# 7
WORKDIR /CBT-SERVER
# 8
ENV NODE_ENV production
# 9
COPY --from=builder /CBT-SERVER ./
# 10
RUN yarn global add pm2 
# 10
CMD ["pm2-runtime", "start", "ecosystem.config.js"]