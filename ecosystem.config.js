module.exports = {
  apps: [
    {
      name: 'moducbt-server',
      script: 'dist/main.js',
      instances: 0,
      exec_mode: 'cluster',
      wait_ready: true,
      instance_var: 'moducbt',
      listen_timeout: 50000,
      kill_timeout: 5000,
      env: {
        NODE_PATH: '.',
        NODE_ENV: 'prod',
      },
    },
  ],
};
