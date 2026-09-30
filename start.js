const { spawn } = require('child_process');
const path = require('path');

console.log('\x1b[36m%s\x1b[0m', '==================================================');
console.log('\x1b[36m%s\x1b[0m', '⚡ LAUNCHING VAJRANOW AI MISSION CONTROL CENTER ⚡');
console.log('\x1b[36m%s\x1b[0m', '==================================================\n');

// 1. Start Python FastAPI Backend
console.log('\x1b[33m%s\x1b[0m', '🚀 Starting Python FastAPI Backend on http://localhost:8000 ...');
const backend = spawn('python', ['backend/run.py'], {
  cwd: __dirname,
  shell: true,
  stdio: 'pipe'
});

backend.stdout.on('data', (data) => {
  console.log(`\x1b[34m[BACKEND]\x1b[0m ${data.toString().trim()}`);
});

backend.stderr.on('data', (data) => {
  console.log(`\x1b[33m[BACKEND LOG]\x1b[0m ${data.toString().trim()}`);
});

// 2. Start React + Vite Frontend
console.log('\x1b[32m%s\x1b[0m', '💻 Starting React + Vite Frontend on http://localhost:3000 ...\n');
const frontend = spawn('npx', ['vite'], {
  cwd: path.join(__dirname, 'frontend'),
  shell: true,
  stdio: 'inherit'
});

// Handle Process Exit / Interrupt
const cleanup = () => {
  console.log('\n\x1b[31m%s\x1b[0m', 'Stopping VajraNow AI Mission Control services...');
  backend.kill();
  frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
