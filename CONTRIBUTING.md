# Contributing to Rofaqaa

## Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Run Prettier before committing

```bash
npm run format
npm run lint
npm run type-check
```

## Commit Convention

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Scope: component, service, util, etc.
Description: Clear, concise explanation
```

Examples:
- `feat(auth): add password reset functionality`
- `fix(chat): fix message delivery status`
- `docs(readme): update installation instructions`

## Testing

Write tests for all new features:

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Pull Request Process

1. Create feature branch: `git checkout -b feat/feature-name`
2. Make changes and commit
3. Push to GitHub
4. Create Pull Request with description
5. Request review
6. Address feedback
7. Merge when approved

## File Structure

```
src/
├── app/              # Next.js pages and routes
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
├── services/        # API and business logic
├── lib/             # Utilities and helpers
├── types/           # TypeScript types
├── stores/          # Zustand stores
├── contexts/        # React contexts
├── utils/           # General utilities
├── constants/       # App constants
└── styles/          # Global styles
```

## Documentation

Documentation should follow this structure:

```markdown
# Title

## Overview

Brief description

## Usage

Code examples

## API Reference

Function/component documentation

## Examples

Real-world usage
```

## Performance

- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images
- Use pagination for large lists
- Profile with React DevTools

## Security

- Validate all inputs
- Use environment variables for secrets
- Implement CORS headers
- Follow OWASP guidelines
- Keep dependencies updated

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Test with screen readers
- Ensure keyboard navigation
- Use proper contrast ratios

## Need Help?

- Check existing issues/PRs
- Review documentation
- Ask in discussions
- Contact maintainers
