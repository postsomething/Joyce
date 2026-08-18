const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const html = read('index.html');
const css = [read('css/variables.css'), read('css/common.css'), read('css/index.css')].join('\n');
const router = read('js/router.js');

for (const template of [
  'view-space',
  'view-moments',
  'view-about',
  'view-music',
]) {
  assert.match(html, new RegExp(`template id="${template}"`), `${template} template exists`);
}

for (const route of ['/', '/moments', '/about', '/music']) {
  assert.match(router, new RegExp(`['"]${route}['"]`), `${route} route exists`);
}

assert.doesNotMatch(html, /template id="view-more"/, 'More template is removed');
assert.doesNotMatch(router, /['"]\/more['"]/, 'More route is removed');
assert.doesNotMatch(router, /label:\s*['"]More['"]/, 'More nav button is removed');
assert.doesNotMatch(html, /#\/more/, 'No links point to removed More route');

for (const image of ['imgs/b1.png', 'imgs/b2.png', 'imgs/b3.png']) {
  assert.match(html + css, new RegExp(image.replace('.', '\\.')), `${image} is used`);
}

for (let index = 1; index <= 12; index += 1) {
  const image = `imgs/moments/w${index}.jpg`;
  assert.match(html, new RegExp(image.replace('.', '\\.')), `${image} is used in Moments`);
}

assert.match(html, /class="avatar" src="imgs\/header\.jpg"/, 'profile avatar uses header.jpg');
assert.match(html, /class="avatar avatar-large" src="imgs\/header\.jpg"/, 'about avatar uses header.jpg');

for (const text of [
  'Joyce',
  '马来西亚',
  '26岁',
  '爱吐槽工作',
  '爱碎碎念',
  '美食续命',
  '记仇',
  '喜欢熬夜',
  '拖延症',
  '戏精',
  '06:30',
  '08:30',
  '09:00',
  '21:30',
  '24:00',
  '01:30',
]) {
  assert.match(html, new RegExp(text), `${text} is shown in the page`);
}

assert.doesNotMatch(html, /甜食/, 'sweet-food wording is replaced by food wording');
assert.doesNotMatch(html, /quick-card/, 'home quick entry card is removed');
assert.doesNotMatch(html, /moments-preview/, 'home Moments preview card is removed');
assert.match(css, /\.space-page\s+\.dual-grid\s*{[^}]*grid-template-columns:\s*1fr/s, 'home music area uses a single-column layout');
assert.match(css, /\.space-page\s+\.player-mini\s*{[^}]*grid-template-columns:\s*96px minmax\(0,\s*1fr\)/s, 'home mini player keeps stable columns');
assert.match(html, /class="page sub-page moments-page"/, 'Moments page has a page-specific class');
assert.match(css, /\.moments-page\s*{[^}]*gap:\s*8px/s, 'Moments page spacing is tightened');
assert.match(css, /\.routine-card/, 'daily routine card styles exist');
assert.match(css, /\.trait-grid/, 'personality trait grid styles exist');

for (const selector of [
  '.bottom-nav',
  '.today-card',
  '.profile-card',
  '.moment-grid',
  '.music-card',
  '.little-card',
]) {
  assert.match(css, new RegExp(selector.replace('.', '\\.')), `${selector} styles exist`);
}

assert.match(css, /--app-max-width:\s*430px/, 'mobile app max width is defined');
assert.match(css, /#ff8fb3/i, 'pink design token exists');
assert.match(css, /#8fcaff/i, 'blue design token exists');

for (const track of [
  "mp3/LANY - 'Cause You Have To.mp3",
  'mp3/LANY - 13.mp3',
  'mp3/LAUV,LANY - Mean It.mp3',
]) {
  assert.match(html + read('js/app.js'), new RegExp(track.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${track} is wired into player`);
}

assert.match(html, /<audio[^>]+id="music-audio"/, 'music audio element exists');
assert.match(html, /data-player-title/, 'player title binding exists');
assert.match(html, /data-player-artist/, 'player artist binding exists');
assert.match(html, /data-player-progress/, 'player progress binding exists');
assert.match(html, /data-track-index="0"/, 'playlist track buttons are indexed');
assert.match(read('js/app.js'), /Joyce\.musicPlayer/, 'music player module is exposed');
assert.match(read('js/app.js'), /togglePlayback/, 'play pause behavior exists');
assert.match(read('js/app.js'), /selectTrack/, 'playlist selection behavior exists');
