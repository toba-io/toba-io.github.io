import assert from 'node:assert/strict';
import { advanceCharge } from '../assets/battery.mjs';

assert.ok(advanceCharge(50, 'charge', 1) > 50);
assert.ok(advanceCharge(50, 'discharge', 1) < 50);
assert.equal(advanceCharge(50, 'rest', 100), 50);
assert.equal(advanceCharge(50, 'charge', 0), 50);
assert.equal(advanceCharge(99, 'charge', 100), 100);
assert.equal(advanceCharge(1, 'discharge', 100), 0);
assert.equal(advanceCharge(100, 'discharge', 5) < 100, true);
assert.equal(advanceCharge(0, 'charge', 5) > 0, true);
assert.throws(() => advanceCharge(50, 'unknown', 1), TypeError);
assert.throws(() => advanceCharge(50, 'charge', -1), TypeError);
assert.throws(() => advanceCharge(NaN, 'charge', 1), TypeError);
console.log('PASS: charging, discharging, rest, limits, reversal, and invalid input.');
