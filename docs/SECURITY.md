# PHNXForge Security Policy

## Security Principles

PHNXForge is built with security and educational data privacy as first-class concerns.

## Compliance

### FERPA Compliance

PHNXForge complies with the Family Educational Rights and Privacy Act (FERPA):

- **Data Minimization**: We collect only necessary student information
- **Access Control**: Role-based access ensures only authorized users view student data
- **Audit Logging**: All access to student records is logged
- **Consent Management**: Proper consent workflows for data sharing
- **Data Retention**: Automated retention policies per institutional requirements

### COPPA Considerations

For K-12 implementations:

- Parental consent workflows available
- Age-appropriate content and interactions
- Limited data collection for users under 13
- Third-party service vetting

### WCAG 2.1 AA Compliance

- Screen reader compatibility
- Keyboard navigation support
- Sufficient color contrast
- Alternative text for images
- Accessible forms and error messages

## Security Features

### Authentication & Authorization

- Secure password hashing (scrypt)
- Role-based access control (student/teacher/admin)
- Session management with secure cookies
- Rate limiting on authentication endpoints

### Data Protection

- **Encryption at Rest**: All sensitive data encrypted in database
- **Encryption in Transit**: TLS 1.3 for all connections
- **Data Anonymization**: Privacy-preserving analytics
- **Audit Logging**: Comprehensive audit trail for compliance

### Input Validation

- Server-side validation using Zod schemas
- SQL injection protection via Drizzle ORM
- XSS prevention through React's built-in escaping
- CSRF protection on all state-changing operations

### API Security

- Rate limiting per user/IP
- Request size limits
- Security headers (CSP, HSTS, X-Frame-Options)
- API key rotation policies

## Security Best Practices

### For Developers

1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Use Zod schemas
3. **Use parameterized queries** - Drizzle ORM handles this
4. **Log security events** - Use AuditLogger utility
5. **Keep dependencies updated** - Regular `pnpm update`

### For Administrators

1. **Regular security audits** - Quarterly reviews
2. **Access reviews** - Monthly user access reviews
3. **Backup verification** - Weekly backup testing
4. **Incident response drill** - Bi-annual exercises
5. **Security training** - Annual for all users

## Vulnerability Reporting

### Responsible Disclosure

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email security@phnxforge.com with details
3. Allow 90 days for remediation before public disclosure
4. We will acknowledge receipt within 48 hours

### Scope

In scope:
- Authentication bypass
- Data exposure
- SQL injection
- XSS vulnerabilities
- CSRF vulnerabilities

Out of scope:
- Social engineering
- Physical attacks
- DDoS attacks

## Incident Response

### Response Timeline

- **Detection**: Real-time monitoring alerts
- **Assessment**: Within 1 hour
- **Containment**: Within 4 hours
- **Eradication**: Within 24 hours
- **Recovery**: Within 48 hours
- **Lessons Learned**: Within 1 week

### Notification

We will notify affected users within 72 hours of:
- Data breaches
- Unauthorized access to student records
- System compromises

## Security Monitoring

### Automated Monitoring

- Dependency vulnerability scanning (npm audit, Snyk)
- Static code analysis (ESLint security rules)
- Runtime application monitoring
- Database access pattern analysis

### Manual Reviews

- Quarterly penetration testing
- Annual third-party security audit
- Monthly access control reviews
- Weekly security log reviews

## Data Retention

### Student Data

- **Active data**: Retained while student is enrolled
- **Historical data**: 7 years after graduation/withdrawal
- **Audit logs**: 7 years (regulatory requirement)
- **Backups**: 90 days rolling

### User Accounts

- **Active accounts**: Indefinite
- **Inactive accounts**: Disabled after 1 year
- **Deleted accounts**: Soft delete for 30 days, then permanent

## Compliance Certifications

- [ ] FERPA Compliance (In Progress)
- [ ] SOC 2 Type II (Planned Q2 2026)
- [ ] WCAG 2.1 AA (In Progress)

## Security Contacts

- Security Team: security@phnxforge.com
- Compliance Officer: compliance@phnxforge.com
- Privacy Officer: privacy@phnxforge.com

## Updates

This security policy is reviewed quarterly and updated as needed.

Last Updated: November 30, 2025
