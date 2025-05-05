declare global {
  interface Window {
    electronAPI: {
      send: (channel?, data?) => any;
      invoke: (channel?, data?) => any;
      on: (channel?, listener?) => any;
      removeListener: (channel?, listener?) => any;
    };
  }
}

export {};
