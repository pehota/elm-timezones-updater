const { checkForDBUpdates } = require('../db');

test('exports checkForDBUpdates', () => {
  expect(typeof checkForDBUpdates).toBe('function');
});
