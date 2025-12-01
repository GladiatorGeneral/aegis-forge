import crypto from 'crypto';

export class SecurityUtils {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly IV_LENGTH = 16;
  private static readonly SALT_LENGTH = 64;
  private static readonly TAG_LENGTH = 16;
  private static readonly KEY_LENGTH = 32;

  static encrypt(text: string, key: string): string {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    
    const derivedKey = crypto.pbkdf2Sync(key, salt, 100000, this.KEY_LENGTH, 'sha512');
    const cipher = crypto.createCipheriv(this.ALGORITHM, derivedKey, iv);
    
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
  }

  static decrypt(encryptedText: string, key: string): string {
    const buffer = Buffer.from(encryptedText, 'base64');
    
    const salt = buffer.subarray(0, this.SALT_LENGTH);
    const iv = buffer.subarray(this.SALT_LENGTH, this.SALT_LENGTH + this.IV_LENGTH);
    const tag = buffer.subarray(
      this.SALT_LENGTH + this.IV_LENGTH,
      this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH
    );
    const encrypted = buffer.subarray(this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH);
    
    const derivedKey = crypto.pbkdf2Sync(key, salt, 100000, this.KEY_LENGTH, 'sha512');
    const decipher = crypto.createDecipheriv(this.ALGORITHM, derivedKey, iv);
    decipher.setAuthTag(tag);
    
    return decipher.update(encrypted) + decipher.final('utf8');
  }

  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .trim()
      .slice(0, 1000);
  }

  static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ':' + derivedKey.toString('hex'));
      });
    });
  }

  static verifyPassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':');
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key === derivedKey.toString('hex'));
      });
    });
  }
}

export class AuditLogger {
  static log(
    action: string,
    userId: string,
    details: Record<string, any>,
    sensitiveData: boolean = false
  ): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      userId,
      details: sensitiveData ? '[REDACTED]' : details,
      ip: 'REQUEST_IP_HERE',
    };
    
    // In production, this would write to a secure logging service
    console.log('[AUDIT]', JSON.stringify(logEntry));
  }
}
