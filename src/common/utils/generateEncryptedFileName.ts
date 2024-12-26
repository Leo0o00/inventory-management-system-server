import crypto from 'crypto';

// export function generateEncryptedFileName(originalName: string): string {
//   const fileExtension = originalName.split('.').pop();
//   const randomHash = crypto.randomBytes(16).toString('hex');
//   return `${randomHash}.${fileExtension}`;
// }

export const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');