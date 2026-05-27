#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');

function usage() {
  console.log('Usage: node scripts/create_issues.js <owner> <repo> [count] [--copy]');
  console.log('Provide token via env var GITHUB_TOKEN, scripts/config.json, or --token <token>');
  process.exit(1);
}

const argv = process.argv.slice(2);
// parse flags and positional args robustly so flags can appear anywhere
let copyToClipboard = false;
let cliToken = null;
const positional = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--copy') {
    copyToClipboard = true;
    continue;
  }
  if (a === '--token') {
    if (argv[i+1]) {
      cliToken = argv[i+1];
      i++; // skip token value
    }
    continue;
  }
  if (a.startsWith('--')) {
    // unknown flag, ignore
    continue;
  }
  positional.push(a);
}

let owner = positional[0];
let repo = positional[1];
let count = parseInt(positional[2] || '10', 10);
if (cliToken) process.env.GITHUB_TOKEN = cliToken;

// allow loading hardcoded values from scripts/config.json (optional)
const configPath = __dirname + '/config.json';
if (fs.existsSync(configPath)) {
  try {
    const conf = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    owner = owner || conf.owner;
    repo = repo || conf.repo;
    count = Number.isInteger(conf.count) ? conf.count : count;
    if (conf.token) process.env.GITHUB_TOKEN = conf.token;
  } catch (e) {
    console.warn('Warning: failed to parse scripts/config.json — ignoring.');
  }
}

if (!owner || !repo) usage();

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Error: no GitHub token provided. Set GITHUB_TOKEN, scripts/config.json, or pass --token <token>');
  process.exit(2);
}


function createIssue(title, body) {
  const data = JSON.stringify({ title, body });
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}/issues`,
    method: 'POST',
    headers: {
      'User-Agent': 'create-issues-script',
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const json = JSON.parse(body);
            resolve(json.html_url);
          } catch (e) {
            resolve('created (no URL)');
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const issues = [
  {
    title: 'Accessibility audit: fix color contrast and ARIA roles',
    body: `Run a full accessibility audit and address failures. Checklist:\n- Ensure color contrast meets WCAG AA for all text\n- Add semantic elements (main, nav, header, footer) where appropriate\n- Add ARIA roles/labels for interactive controls and landmarks\n- Ensure keyboard navigation order and focus states are clear\n- Add descriptive alt text for all images`,
  },
  {
    title: 'Make layout fully responsive and mobile-first',
    body: `Improve responsive behavior across common device widths. Checklist:\n- Implement mobile-first CSS and fluid typography\n- Test breakpoints for phones, tablets, and small laptops\n- Ensure navigation collapses into a usable mobile menu\n- Verify touch target sizes and spacing`,
  },
  {
    title: 'Optimize images: compress and serve modern formats',
    body: `Reduce page weight and improve load times. Tasks:\n- Compress images (lossy where acceptable)\n- Provide WebP/AVIF fallbacks with <picture> element\n- Use width/height attributes and srcset for responsive images\n- Consider lazy-loading offscreen images`,
  },
  {
    title: 'Improve SEO: meta tags, social previews, and structured data',
    body: `Increase discoverability and link previews. Checklist:\n- Add unique title and description meta tags per page\n- Add Open Graph and Twitter Card metadata\n- Add JSON-LD structured data for portfolio and projects\n- Ensure canonical URLs and sitemap presence`,
  },
  {
    title: 'Harden contact form: validation and spam protection',
    body: `Make contact submissions reliable and secure. Tasks:\n- Add client-side and server-side validation for fields\n- Integrate CAPTCHA or honeypot anti-spam measure\n- Provide clear success / error states and logging\n- Sanitize inputs before forwarding/storing`,
  },
  {
    title: 'Add detailed project case studies for top projects',
    body: `Improve credibility by expanding project pages. Checklist:\n- Add problem, solution, and results for each featured project\n- Include screenshots, technologies used, and links to repos/live demos\n- Highlight measurable outcomes (metrics, time saved, revenue, etc.)`,
  },
  {
    title: 'Performance tuning: eliminate render-blocking resources',
    body: `Reduce time-to-interactive and improve Lighthouse scores. Tasks:\n- Inline critical CSS or use critical path optimizations\n- Defer or async non-critical JS\n- Minify and concatenate assets where beneficial\n- Use efficient caching and HTTP headers`,
  },
  {
    title: 'Add privacy-friendly analytics and consent flow',
    body: `Introduce analytics while respecting privacy. Checklist:\n- Add a lightweight analytics provider or self-hosted solution\n- Present a cookie/consent banner with opt-in for tracking\n- Document what is collected in a privacy section`,
  },
  {
    title: 'Set up CI: linting, tests, and automated deploys',
    body: `Automate quality checks and deployments. Tasks:\n- Add a GitHub Actions workflow for HTML/CSS/JS linting\n- Add basic smoke tests that validate critical pages load\n- Add an automated deploy step (GitHub Pages, Netlify, Vercel)`,
  },
  {
    title: 'Enhance README and contribution guidelines',
    body: `Make the project easier to reuse and contribute to. Checklist:\n- Improve README with screenshots, setup steps, and demo link\n- Add clear CONTRIBUTING.md with style and PR guidance\n- Add issue templates for bug, feature, and chore requests`,
  },
];

(async () => {
  const total = Math.min(count, issues.length);
  console.log(`Creating ${total} predefined issues on ${owner}/${repo}...`);
  const createdUrls = [];
  for (let i = 0; i < total; i++) {
    const { title, body } = issues[i];
    try {
      const url = await createIssue(title, body);
      createdUrls.push(url);
      console.log(`#${i+1} created: ${url}`);
    } catch (err) {
      console.error(`#${i+1} failed:`, err.message);
      process.exitCode = 1;
    }
  }

  if (copyToClipboard && createdUrls.length) {
    const text = createdUrls.join('\n');
    // cross-platform clipboard helper
    function copy(text) {
      const platform = process.platform;
      if (platform === 'win32') {
        const c = exec('clip');
        c.stdin.write(text);
        c.stdin.end();
        return new Promise((res) => c.on('exit', res));
      }
      if (platform === 'darwin') {
        const c = exec('pbcopy');
        c.stdin.write(text);
        c.stdin.end();
        return new Promise((res) => c.on('exit', res));
      }
      // linux: try wl-copy, then xclip
      return new Promise((res, rej) => {
        const tryWl = exec('wl-copy');
        tryWl.stdin.write(text);
        tryWl.stdin.end();
        tryWl.on('exit', (code) => {
          if (code === 0) return res();
          const tryX = exec('xclip -selection clipboard');
          tryX.stdin.write(text);
          tryX.stdin.end();
          tryX.on('exit', (c2) => c2 === 0 ? res() : rej(new Error('No clipboard utility available')));
        });
      });
    }

    try {
      await copy(text);
      console.log('Created issue URLs copied to clipboard.');
    } catch (e) {
      console.warn('Could not copy to clipboard — no clipboard utility found.');
    }
  }

  console.log('Done.');
})();

