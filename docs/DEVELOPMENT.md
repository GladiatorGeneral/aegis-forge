# PHNXForge Development Guide

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-org/phnxforge.git
cd phnxforge

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
pnpm db:push

# Start development servers
pnpm dev
```

## Project Structure

```
phnxforge/
├── apps/
│   ├── web-app/              # React + Vite application
│   └── admin-dashboard/      # Admin interface
├── packages/
│   ├── common/               # Shared utilities
│   ├── mathematics-engine/   # Core math engine
│   ├── reasoning-engine/     # Multi-perspective reasoning
│   ├── assessment-system/    # 3D assessment
│   ├── industrial-mathematics/ # Real-world applications
│   └── formal-verification/  # Proof systems
├── docs/                     # Documentation
└── scripts/                  # Utility scripts
```

## Development Workflow

### Running the Development Server

```bash
# Start all packages in watch mode
pnpm dev

# Start specific package
pnpm --filter @phnxforge/web-app dev
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific package
pnpm --filter @phnxforge/mathematics-engine test
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @phnxforge/web-app build
```

### Code Quality

```bash
# Lint all code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

## Database Management

```bash
# Generate migrations
pnpm db:generate

# Push schema changes
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

## Architecture Overview

### Mathematics Engine

The core mathematics engine provides:
- Chain-of-thought reasoning
- Multi-perspective problem solving
- Formal verification
- Common Core standards alignment

### Assessment System

3D assessment evaluating:
- Conceptual understanding
- Procedural fluency
- Applied problem solving

### Security & Compliance

- FERPA compliant data handling
- Audit logging for all operations
- Encryption at rest and in transit
- Role-based access control

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## Troubleshooting

### Common Issues

**pnpm install fails:**
- Ensure Node.js >= 18.0.0
- Clear pnpm cache: `pnpm store prune`

**Database connection errors:**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running

**Build errors:**
- Run `pnpm clean` and rebuild
- Check for TypeScript errors: `pnpm type-check`

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Vite Documentation](https://vitejs.dev/)
