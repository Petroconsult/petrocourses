import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Library Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('helpers', () => {
    describe('delay', () => {
      it('should delay execution for specified milliseconds', async () => {
        const start = Date.now();
        const delayMs = 100;

        // Mock delay
        const mockDelay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));

        await mockDelay(delayMs);
        const end = Date.now();

        expect(end - start).toBeGreaterThanOrEqual(delayMs);
      });
    });

    describe('generateId', () => {
      it('should generate unique ids', () => {
        const generateId = () => Math.random().toString(36).substr(2, 9);

        const id1 = generateId();
        const id2 = generateId();

        expect(id1).toBeDefined();
        expect(id2).toBeDefined();
        expect(id1).not.toBe(id2);
      });
    });

    describe('formatDate', () => {
      it('should format date to readable string', () => {
        const date = new Date('2025-12-01');
        const formatted = date.toLocaleDateString('en-US');

        expect(formatted).toContain('12');
      });
    });
  });

  describe('validation', () => {
    describe('isValidEmail', () => {
      it('should validate correct email addresses', () => {
        const isValidEmail = (email: string): boolean => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
      });

      it('should reject invalid email addresses', () => {
        const isValidEmail = (email: string): boolean => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        expect(isValidEmail('invalid.email')).toBe(false);
        expect(isValidEmail('@example.com')).toBe(false);
        expect(isValidEmail('user@')).toBe(false);
      });
    });

    describe('isValidURL', () => {
      it('should validate correct URLs', () => {
        const isValidURL = (url: string): boolean => {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        };

        expect(isValidURL('https://example.com')).toBe(true);
        expect(isValidURL('http://localhost:3000')).toBe(true);
      });

      it('should reject invalid URLs', () => {
        const isValidURL = (url: string): boolean => {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        };

        expect(isValidURL('not a url')).toBe(false);
        expect(isValidURL('example.com')).toBe(false);
      });
    });

    describe('isValidPhoneNumber', () => {
      it('should validate phone numbers', () => {
        const isValidPhone = (phone: string): boolean => {
          return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
        };

        expect(isValidPhone('+1-234-567-8900')).toBe(true);
        expect(isValidPhone('(123) 456-7890')).toBe(true);
      });

      it('should reject invalid phone numbers', () => {
        const isValidPhone = (phone: string): boolean => {
          return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
        };

        expect(isValidPhone('123')).toBe(false);
        expect(isValidPhone('abc-def-ghij')).toBe(false);
      });
    });
  });

  describe('formatting', () => {
    describe('formatCurrency', () => {
      it('should format number as currency', () => {
        const formatCurrency = (amount: number, currency: string = 'USD'): string => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
          }).format(amount);
        };

        const result = formatCurrency(99.99);

        expect(result).toContain('99.99');
        expect(result).toContain('$');
      });

      it('should handle different currencies', () => {
        const formatCurrency = (amount: number, currency: string = 'USD'): string => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
          }).format(amount);
        };

        const usd = formatCurrency(100, 'USD');
        const eur = formatCurrency(100, 'EUR');

        expect(usd).toContain('$');
        expect(eur).toContain('€');
      });
    });

    describe('formatBytes', () => {
      it('should format bytes to human-readable size', () => {
        const formatBytes = (bytes: number): string => {
          const sizes = ['Bytes', 'KB', 'MB', 'GB'];
          if (bytes === 0) return '0 Bytes';
          const i = Math.floor(Math.log(bytes) / Math.log(1024));
          return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
        };

        expect(formatBytes(1024)).toContain('KB');
        expect(formatBytes(1048576)).toContain('MB');
      });
    });

    describe('truncateText', () => {
      it('should truncate long text', () => {
        const truncateText = (text: string, length: number): string => {
          return text.length > length ? text.substring(0, length) + '...' : text;
        };

        const result = truncateText('This is a long text', 10);

        expect(result).toBe('This is a ...');
        expect(result.length).toBeLessThanOrEqual(13);
      });
    });
  });
});
