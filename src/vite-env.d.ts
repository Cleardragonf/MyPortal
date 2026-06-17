/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AUTH_MODE?: 'fake' | 'real';
    readonly VITE_USE_FAKE_AUTH?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
