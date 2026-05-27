#!/usr/bin/env node
const readline = require('readline');
const { spawn } = require('child_process');

function question(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) => rl.question(prompt, (ans) => { rl.close(); res(ans.trim()); }));
}

async function hiddenQuestion(prompt) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    process.stdout.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    let value = '';
    function onData(ch) {
      const char = ch.toString();
      if (char === '\r' || char === '\n') {
        stdin.removeListener('data', onData);
        stdin.setRawMode(false);
        process.stdout.write('\n');
        resolve(value);
        return;
      }
      if (char === '\u0003') { // Ctrl-C
        process.stdout.write('\n');
        process.exit();
      }
      if (char === '\u0008' || char === '\u007f') { // backspace
        value = value.slice(0, -1);
        return;
      }
      value += char;
    }
    stdin.on('data', onData);
  });
}

(async () => {
  try {
    const owner = await question('GitHub owner (username or org): ');
    if (!owner) return console.error('owner required');
    const repo = await question('Repository name: ');
    if (!repo) return console.error('repo required');
    const countInput = await question('Issue count (default 10): ');
    const count = countInput ? countInput.trim() : '';
    const token = await hiddenQuestion('Personal access token (input hidden): ');
    if (!token) return console.error('token required');

    const args = [ 'scripts/create_issues.js', owner, repo ];
    if (count) args.push(count);

    const child = spawn(process.execPath, args, {
      stdio: 'inherit',
      env: Object.assign({}, process.env, { GITHUB_TOKEN: token }),
    });

    child.on('exit', (code) => process.exit(code));
  } catch (err) {
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  }
})();
