function localStorageSimulator(key) {
  Object.defineProperty(global, 'localStorage', {
    value: {
      ...global.localStorage,
      [key]: jest.fn(),
    },
    writable: true,
  });
}

afterEach(jest.clearAllMocks);

module.exports = localStorageSimulator;
