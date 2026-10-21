// An explanatory animation, independent of the calibrated research model.
export function advanceCharge(charge, mode, seconds) {
  const direction = { charge: 1, discharge: -1, rest: 0 }[mode];
  if (direction === undefined || !Number.isFinite(charge) || !Number.isFinite(seconds) || seconds < 0) {
    throw new TypeError('Use a finite charge and nonnegative time with charge, discharge, or rest.');
  }
  return Math.max(0, Math.min(100, charge + direction * seconds * 1.6));
}

if (typeof document !== 'undefined' && document.querySelector('#flow-battery')) {
  const panel = document.querySelector('#flow-battery');
  const select = id => panel.querySelector(`#${id}`);
  const modes = panel.querySelectorAll('[data-battery-mode]');
  const pause = select('battery-pause');
  const start = select('battery-start');
  const speed = select('battery-flow');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let charge = 50;
  let mode = 'charge';
  let playing = !reducedMotion.matches;
  let visible = false;
  let clock = 0;
  let lastFrame = 0;
  let lastSample = 0;
  let frame;
  let samples = [[0, 50]];

  function blend(low, high) {
    return `rgb(${low.map((value, index) => Math.round(value + (high[index] - value) * charge / 100)).join(',')})`;
  }

  function render() {
    const negative = blend([90, 146, 115], [132, 102, 167]);
    const positive = blend([72, 139, 170], [205, 173, 72]);
    const limit = (charge >= 100 && mode === 'charge') || (charge <= 0 && mode === 'discharge');
    panel.style.setProperty('--negative', negative);
    panel.style.setProperty('--positive', positive);
    select('negative-liquid').setAttribute('fill', negative);
    select('positive-liquid').setAttribute('fill', positive);
    panel.dataset.mode = mode;
    panel.dataset.electrons = String(mode !== 'rest' && !limit);
    panel.dataset.paused = String(!playing || !visible || document.hidden);
    select('battery-charge').value = Math.round(charge);
    const status = limit ? (charge >= 100 ? 'Full · try discharge' : 'Empty · try charge') : ({charge: 'Charging', discharge: 'Discharging', rest: 'At rest'})[mode];
    if (select('battery-status').textContent !== status) select('battery-status').textContent = status;
    select('negative-reaction').textContent = mode === 'rest' ? 'V(II / III)' : mode === 'charge' ? 'III → II' : 'II → III';
    select('positive-reaction').textContent = mode === 'rest' ? 'V(IV / V)' : mode === 'charge' ? 'IV → V' : 'V → IV';
    select('external-circuit').textContent = mode === 'rest' ? 'OPEN CIRCUIT' : mode === 'charge' ? 'POWER IN' : 'POWER OUT';
    select('battery-explanation').textContent = ({
      charge: 'Electricity changes the vanadium oxidation states. Energy is stored in the two electrolytes.',
      discharge: 'The reactions reverse. Chemical energy returns as electricity through the external circuit.',
      rest: 'No charge passes through the external circuit. The pumps can keep the electrolytes circulating.',
    })[mode];
    pause.textContent = playing ? 'Pause animation' : 'Play animation';
    modes.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.batteryMode === mode)));
    const points = [...samples, [clock, charge]];
    const windowStart = Math.max(0, clock - 60);
    const coordinates = points.map(([time, value]) => [31 + (time - windowStart) / 60 * 276, 124 - value / 100 * 110]);
    select('battery-trace').setAttribute('d', coordinates.map(([x,y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' '));
    const [x,y] = coordinates.at(-1);
    select('battery-trace-tip').setAttribute('cx', x);
    select('battery-trace-tip').setAttribute('cy', y);
  }

  function tick(now) {
    const elapsed = Math.min((now - lastFrame) / 1000, 0.1);
    lastFrame = now;
    charge = advanceCharge(charge, mode, elapsed);
    clock += elapsed;
    if (clock - lastSample >= 0.25) {
      samples.push([clock, charge]);
      lastSample = clock;
      while (samples.length > 2 && samples[1][0] < clock - 60) samples.shift();
    }
    render();
    frame = requestAnimationFrame(tick);
  }

  function schedule() {
    cancelAnimationFrame(frame);
    render();
    if (playing && visible && !document.hidden) {
      lastFrame = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  function resetTrace(value) {
    charge = value;
    clock = lastSample = 0;
    samples = [[0, charge]];
    render();
  }

  modes.forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.batteryMode;
    render();
  }));
  pause.addEventListener('click', () => { playing = !playing; schedule(); });
  start.addEventListener('input', () => {
    select('battery-start-value').value = `${start.value}%`;
    resetTrace(Number(start.value));
  });
  speed.addEventListener('input', () => {
    select('battery-flow-value').value = `${speed.value}×`;
    panel.style.setProperty('--circulation', `${2 / Number(speed.value)}s`);
  });
  select('battery-reset').addEventListener('click', () => {
    mode = 'charge';
    start.value = '50';
    speed.value = '1';
    select('battery-start-value').value = '50%';
    select('battery-flow-value').value = '1×';
    panel.style.setProperty('--circulation', '2s');
    resetTrace(50);
  });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(panel);
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { playing = false; schedule(); }
  });
  render();
}
