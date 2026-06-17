const configuredFakeAuthValue =
    import.meta.env.VITE_AUTH_MODE ??
    import.meta.env.VITE_USE_FAKE_AUTH ??
    '';

const normalizedFakeAuthValue = configuredFakeAuthValue
    .trim()
    .toLowerCase();

export const USE_FAKE_AUTH = [
    'fake',
    'true',
    '1',
    'yes',
].includes(normalizedFakeAuthValue);

export const AUTH_MODE = USE_FAKE_AUTH
    ? 'fake'
    : 'real';
