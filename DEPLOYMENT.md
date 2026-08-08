# Deployment Guide for Rofaqaa

## Prerequisites

- Vercel account
- GitHub repository (already configured)
- Supabase project (already configured)

## Deployment Steps

### 1. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 2. Configure Environment Variables on Vercel

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Setup Supabase

1. Go to Supabase project settings
2. Run migrations:
   - Navigate to SQL Editor
   - Execute all SQL files from `supabase/migrations/` in order

3. Configure Storage:
   - Create bucket named "rofaqaa"
   - Set public policy

4. Enable Realtime:
   - Go to Realtime settings
   - Enable for tables: messages, group_messages, notifications, profiles

### 4. Configure Email

For password reset emails:

1. Go to Supabase Authentication settings
2. Configure email provider (SendGrid, Resend, etc.)
3. Update email templates

### 5. Security Checklist

- [ ] RLS policies are enabled on all tables
- [ ] Environment variables are set on Vercel
- [ ] CORS is configured in Supabase
- [ ] Storage bucket permissions are restricted
- [ ] Email verification is enabled
- [ ] Password reset flow is working

### 6. Production Checklist

- [ ] Enable database backups
- [ ] Setup monitoring and alerts
- [ ] Configure rate limiting
- [ ] Setup error tracking (Sentry)
- [ ] Enable CDN for static assets
- [ ] Configure custom domain
- [ ] Setup SSL certificate
- [ ] Configure backup email recovery

## Monitoring

### Vercel Analytics

- Real-time deployment status
- Performance metrics
- Error tracking

### Supabase Monitoring

- Database metrics
- API usage
- Realtime connections

## Scaling

### Database

- Supabase handles scaling automatically
- Monitor database size and connections
- Optimize slow queries

### Storage

- Use CDN for file delivery
- Implement image optimization
- Set retention policies

### Realtime

- Monitor concurrent connections
- Optimize broadcast frequency
- Implement connection pooling

## Rollback

```bash
# Rollback to previous Vercel deployment
vercel rollback

# If needed, rollback database
# Contact Supabase support for database recovery
```

## Support

- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/support
- Documentation: See README.md
