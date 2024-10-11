declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SECRET_KEY: string;
      DB_STRING: string;
    }
  }
}

export {};
