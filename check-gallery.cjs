const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('components/work-list.js', 'utf8');
class Video extends EventTarget {
  constructor() { super(); this.currentTime = 0; this.paused = true; this.children = []; }
  append(element) { this.children.push(element); }
  pause() { this.paused = true; }
  play() { this.paused = false; this.dispatchEvent(new Event('play')); return Promise.resolve(); }
}
const context = vm.createContext({
  LitElement: class {}, html: () => '', customElements: { define() {} },
  document: { createElement: tag => tag === 'video' ? new Video() : {} },
});
vm.runInContext(source.replace(/^import .*$/m, '').replace('export class WorkList', 'class WorkList') + '\nthis.WorkList = WorkList;', context);
const WorkList = context.WorkList;
let count = 0;
for (const item of WorkList.items) for (const slide of item.slides || []) {
  if (!slide.video) continue;
  count++;
  for (const media of slide.video.source) assert(fs.existsSync(`dist${media.src}`), media.src);
  assert(fs.existsSync(`dist${WorkList.fullFor(slide.thumb)}`), slide.thumb);
}
assert(count > 0);
const button = new EventTarget();
const containers = [0, 1, 2].map(() => ({
  video: null,
  append(video) { this.video = video; },
  querySelector() { return this.video; },
}));
const gallery = {
  outer: { get: () => ({ querySelectorAll: () => containers.flatMap(c => c.video ? [c.video] : []) }) },
  getSlideItem: index => ({ get: () => ({ querySelector: selector => selector === '.lg-video-cont' ? containers[index] : containers[index].video }) }),
};
const slides = [{}, ...[1, 2].map(() => ({ video: {source: [{src: '/test.mp4', type: 'video/mp4'}]}, videoPoster: '/poster.webp' }))];
const emit = (name, index) => { const event = new Event(name); event.detail = {index}; button.dispatchEvent(event); };
WorkList.attachGalleryVideos(gallery, button, slides);
emit('lgHasVideo', 1);
emit('lgHasVideo', 2);
const first = containers[1].video, second = containers[2].video;
assert(first.paused && second.paused, 'Preloaded videos must not play');
emit('lgAfterSlide', 1);
assert(!first.paused && second.paused);
first.currentTime = 9;
emit('lgBeforeSlide', 2);
assert(first.paused && first.currentTime === 0);
emit('lgAfterSlide', 2);
assert(!second.paused && first.paused);
first.play();
assert(first.paused, 'Delayed playback on an inactive slide must be stopped');
emit('lgBeforeSlide', 1);
emit('lgAfterSlide', 1);
assert(!first.paused && first.currentTime === 0, 'Returning must restart from zero');
first.currentTime = 5;
emit('lgBeforeClose', 1);
assert(first.paused && second.paused && first.currentTime === 0);
emit('lgHasVideo', 1);
assert.equal(containers[1].video, first, 'Do not append duplicate players');
console.log(`${count} video assets/posters exist; preload, transitions, restart, delayed play and close checks passed.`);
