import "jest-fetch-mock";

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) })) as any;