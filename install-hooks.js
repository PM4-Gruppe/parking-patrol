const fs = require('fs-extra');
const { execSync } = require('child_process');

const scriptPath = 'scripts/pre-commit';
const hookPath = '.git/hooks/pre-commit';

if (fs.existsSync(scriptPath)) {
    fs.copySync(scriptPath, hookPath);
    execSync(`chmod +x ${hookPath}`);
}