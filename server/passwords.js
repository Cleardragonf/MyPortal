import crypto from 'node:crypto';

const keyLength = 64;

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
    const hash = crypto.scryptSync(password, salt, keyLength).toString('hex');

    return {
        hash,
        salt,
    };
}

export function verifyPassword(password, expectedHash, salt) {
    const { hash } = hashPassword(password, salt);
    const hashBuffer = Buffer.from(hash, 'hex');
    const expectedHashBuffer = Buffer.from(expectedHash, 'hex');

    if (hashBuffer.length !== expectedHashBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(hashBuffer, expectedHashBuffer);
}
