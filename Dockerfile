# STEP 1
# 1
FROM --platform=linux/amd64 node:16 AS builder
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 fonts-noto-cjk \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
# 2
WORKDIR /CBT-SERVER
# 3
COPY . .
# 4

RUN yarn
# 5
RUN yarn build

# 6
FROM --platform=linux/amd64 node:16-alpine
# 7
WORKDIR /CBT-SERVER
# 8
ENV NODE_ENV production
# 9
COPY --from=builder /CBT-SERVER ./
# 10
RUN yarn global add pm2 
# 11


# 13
CMD ["pm2-runtime", "start", "ecosystem.config.js"]