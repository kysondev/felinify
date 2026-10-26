// Builds the client on first use instead of on import, so `next build` can
// load modules that need a secret without having one.
export const lazyClient = <T extends object>(create: () => T): T => {
  let cached: T | null = null;
  const client = () => (cached ??= create());

  // The target stays empty; every read and write goes to the real client.
  return new Proxy({} as T, {
    get: (_, prop) => client()[prop as keyof T],
    set: (_, prop, value) => {
      client()[prop as keyof T] = value;
      return true;
    },
  });
};
