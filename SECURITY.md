# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please email security@rofaqaa.ma instead of using the issue tracker.

## Security Features

### Authentication
- Email/password authentication with Supabase Auth
- Email verification required
- Password reset with email verification
- Session management
- CSRF protection

### Data Protection
- Row Level Security (RLS) on all database tables
- Encrypted password storage (bcrypt)
- HTTPS only
- Secure headers (CSP, X-Frame-Options, etc.)

### Access Control
- Users can only access their own data
- Group admins can manage group settings
- Admin panel for system moderation

### Privacy
- User data is private by default
- Friends-only messaging
- Block user functionality
- Report system for abuse

## Security Checklist for Development

- [ ] Validate all user input
- [ ] Sanitize HTML/code to prevent XSS
- [ ] Use parameterized queries
- [ ] Implement rate limiting
- [ ] Log security events
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted origins
- [ ] Implement proper error handling
- [ ] Test authentication flows

## Compliance

- GDPR compliant (data deletion, export)
- Privacy policy available
- Terms of service
- DMCA takedown process

## Known Security Limitations

1. Real-time messaging relies on Supabase infrastructure
2. File uploads are stored in Supabase Storage
3. Admin access is based on database role (implement your own admin logic)

## Security Updates

We follow semantic versioning for security updates:
- Patch versions (X.Y.Z): Security patches
- Subscribe to security notices

## Third-party Security

- Supabase: https://supabase.com/security
- Vercel: https://vercel.com/security
- Next.js: https://nextjs.org/security

## Contact

Security inquiries: security@rofaqaa.ma
