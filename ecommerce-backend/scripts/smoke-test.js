const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const root = path.join(__dirname, '..');
const child = spawn(process.execPath, ['server.js'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
});

const tryFetch = () =>
  new Promise((resolve, reject) => {
    const req = http.get('http://127.0.0.1:5001/api/products', (res) => {
      let data = '';
      res.on('data', (c) => {
        data += c;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(Array.isArray(json) && json.length > 0);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });

const shutdown = () => {
  child.kill('SIGTERM');
};

let attempts = 0;
const poll = async () => {
  try {
    const ok = await tryFetch();
    if (!ok) throw new Error('empty or invalid response');
    console.log('smoke-test: OK (GET /api/products)');
    shutdown();
    process.exit(0);
  } catch {
    attempts += 1;
    if (attempts > 40) {
      console.error('smoke-test: FAIL (server did not respond)');
      shutdown();
      process.exit(1);
    }
    setTimeout(poll, 250);
  }
};

child.stderr.on('data', (buf) => process.stderr.write(buf));
child.on('error', (err) => {
  console.error('smoke-test: FAIL', err.message);
  process.exit(1);
});

setTimeout(poll, 300);
