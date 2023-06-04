module.exports = {
  apps: [
    {
      name: 'moducbt-server',
      script: 'dist/main.js',
      instances: 0,
      exec_mode: 'cluster', // cluster mode
      wait_ready: true,
      instance_var: 'moducbt',
      listen_timeout: 50000,
      kill_timeout: 5000,
      env: {
        NODE_PATH: '.',
        NODE_ENV: 'prod',
      },
      exp_backoff_restart_delay: 100,
      node_args: '-r ts-node/register',
      // add these lines to enable sticky session
      exec_interpreter: 'node',
      interpreter_args: '-r ts-node/register',
      listen_timeout: 8000,
      kill_timeout: 1600,
    },
  ],
};
