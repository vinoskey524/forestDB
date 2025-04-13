// deno-lint-ignore-file no-unused-vars no-explicit-any ban-types prefer-const no-empty require-await

/**
* This file contains the cipher and decipher algos
* To protect end users, every codes related to encryption have been removed.
* So, functions will return the same string passed as argument.
*/

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Convert */

/** Convert data from "buffer" to "hex" */
export const bufferToHexFunc = (x: { data: any }) => {
    const byteArray = new Uint8Array(x.data);
    let hexString = '';
    for (let i = 0; i < byteArray.length; i++) { const hex = byteArray[i].toString(16).padStart(2, '0'); hexString += hex }
    return hexString;
};

/** Convert data from "hex" to "buffer" */
export const hexToBufferFunc = (x: { data: any }) => {
    const hex = x.data, len = hex.length, buffer = new Uint8Array(len / 2);
    for (let i = 0; i < len; i += 2) { buffer[i / 2] = parseInt(hex.substr(i, 2), 16) }
    return buffer;
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* --------------------------------------------------------- Cipher layer 2 encryption --------------------------------------------------------- */

/** - */
const L2_cipherMixerFunc = (x: { data: string, key: string, iv: string, authTag: string, ignoreKey: boolean }) => {};

/** - */
const L2_cipherDemixerFunc = (x: { data: string, ignoreKey: boolean }) => {};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* ---------------------------------------------------------- For web-based cypher API - Compatible with "Deno", "Bun" and "Browser" ---------------------------------------------------------- */

/** Hash data */
export const web_createHashFunc = async (x: { data: string }) => {
    return x.data;
};

/** Cipher data */
export const web_cipherFunc = async (x: { data: string, privateKey?: string }): Promise<{ status: 'success' | 'error', log: string, data: string }> => {
    try {
        if (typeof x.data !== 'string') throw new Error(`Data to encrypt is not a string`);
        return { status: 'success', log: '', data: x.data };

    } catch (e: any) { return { status: 'error', log: e.message, data: undefined } }
};

/** Decipher data */
export const web_decipherFunc = async (x: { data: any, privateKey?: string }): Promise<{ status: 'success' | 'error', log: string, data: string }> => {
    try {
        if (typeof x.data !== 'string') throw new Error(`Data to decrypt is not a string`);
        return { status: 'success', log: '', data: x.data };

    } catch (e: any) { return { status: 'error', log: e, data: undefined } }
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ---------------------------------------------------------- For "crypto" package - Compatible with "Node" and "Bun" ---------------------------------------------------------- */

/** Create Hash */
export const crypto_createHashFunc = async (x: { data: string, api: any }) => {
    return x.data;
};

/** Ciper data */
export const crypto_cipherFunc = (x: { data: string, api: any, privateKey?: string }): { status: 'success' | 'error', log: string, data: string } => {
    try {
        if (typeof x.data !== 'string') throw new Error(`Data to encrypt is not a string`);
        return { status: 'success', log: '', data: x.data };

    } catch (e: any) { return { status: 'error', log: e.message, data: undefined } }
};

/** Deciper data */
export const crypto_decipherFunc = (x: { data: string, api: any, privateKey?: string }): { status: 'success' | 'error', log: string, data: string } => {
    try {
        if (typeof x.data !== 'string') throw new Error(`Data to decrypt is not a string`);
        return { status: 'success', log: '', data: res };

    } catch (e: any) { return { status: 'error', log: e.message, data: undefined } }
};
