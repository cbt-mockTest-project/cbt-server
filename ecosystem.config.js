module.exports = {
  apps: [
    {
      name: 'moducbt-server',
      script: 'dist/main.js',
      instances: 'max',
      exec_mode: 'cluster', // cluster mode
      wait_ready: true,
      autorestart: true, // 프로세스 실패시 자동 재시작
      watch: false, // 파일 변경 감시 비활성화
      max_memory_restart: '1G', // 메모리 최대 사용량 초과시 재시작
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
