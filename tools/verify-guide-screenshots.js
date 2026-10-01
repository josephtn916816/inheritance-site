const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourceDir = 'C:\\Users\\tn916\\OneDrive\\圖片\\網頁圖片';
const detailed = fs.readFileSync(path.join(root, 'assets', 'guide-detailed-steps.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'guide', 'index.html'), 'utf8');
const targetDir = path.join(root, 'assets', 'tutorial-screenshots');

const supplied = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.png'));
assert(supplied.length > 0, '找不到使用者提供的教學截圖');
supplied.forEach((name) => {
  assert(fs.existsSync(path.join(targetDir, name)), `網站資產缺少截圖：${name}`);
  assert(detailed.includes(name) || index.includes(name), `截圖尚未有教學對應：${name}`);
});
assert.match(detailed, /lesson-stage-list/, '缺少逐圖教學容器');
assert.match(detailed, /guide-leaders/, '缺少逐圖引導線');
assert.match(detailed, /guide-target-dot/, '缺少逐圖目標紅點');
assert.match(detailed, /guide-image-callout/, '缺少逐圖鄰近說明框');
console.log(`guide screenshot coverage passed: ${supplied.length} supplied screenshots mapped`);
