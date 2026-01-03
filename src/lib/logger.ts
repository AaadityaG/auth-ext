// Conditional logger based on environment
const isLocalInstance = import.meta.env.VITE_INSTANCE === 'DEV';

export const logger = {
  log: (...args: any[]) => {
    if (isLocalInstance) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isLocalInstance) {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    if (isLocalInstance) {
      console.error(...args);
    }
  },
  info: (...args: any[]) => {
    if (isLocalInstance) {
      console.info(...args);
    }
  },
  debug: (...args: any[]) => {
    if (isLocalInstance) {
      console.debug(...args);
    }
  }
};