import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const videos = Array.from({length: 2}, () => ({
  paused: true, muted: false,
  play() { this.paused = false; return Promise.resolve(); },
  pause() { this.paused = true; },
}));
const events = {};
const document = {
  hidden: false,
  querySelector: () => null,
  querySelectorAll: selector => selector === 'video' ? videos : [],
  addEventListener: (name, handler) => { events[name] = handler; },
};
const motion = {matches: false, addEventListener: (_, handler) => { events.motion = handler; }};
let observe;
vm.runInNewContext(readFileSync(new URL('../assets/site.js', import.meta.url), 'utf8'), {
  document, window: {matchMedia: () => motion},
  IntersectionObserver: class { constructor(callback) { observe = callback; } observe() {} },
});

observe([{target: videos[0], isIntersecting: true, intersectionRatio: 0.8}]);
assert.equal(videos[0].paused, false, 'Visible video starts without a click');
assert.equal(videos[1].paused, true, 'Offscreen video stays paused');
assert.ok(videos[0].muted && videos[0].defaultMuted && videos[0].loop && videos[0].playsInline);
videos[0].pause();
observe([{target: videos[1], isIntersecting: true, intersectionRatio: 0.8}]);
assert.equal(videos[0].paused, true, 'Another video entering does not undo manual pause');
document.hidden = true;
events.visibilitychange();
assert.ok(videos.every(video => video.paused), 'Background tab pauses all videos');
document.hidden = false;
events.visibilitychange();
assert.ok(videos.every(video => !video.paused), 'Visible videos resume with the tab');
observe([{target: videos[0], isIntersecting: false, intersectionRatio: 0}]);
assert.equal(videos[0].paused, true, 'Leaving the viewport pauses playback');
motion.matches = true;
events.motion();
assert.ok(videos.every(video => video.paused), 'Reduced-motion preference pauses automatic playback');
console.log('PASS: in-view autoplay, mute, loop, inline playback, offscreen/background pause, and reduced motion.');
