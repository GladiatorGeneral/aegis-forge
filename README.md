# PHNXForge

**Advanced Mathematics Education Platform with Industrial Applications**

PHNXForge is a research-backed educational platform that implements multi-perspective reasoning, formal verification, and the Saphier instructional model to revolutionize mathematics education.

## 🚀 Features

- **Multi-Perspective Reasoning**: Debate-style mathematical problem solving
- **Formal Verification**: Consistency checking and logical soundness
- **Saphier Model Integration**: Evidence-based instructional framework
- **Industrial Applications**: Real-world manufacturing and career pathways
- **3D Assessment System**: Conceptual, procedural, and applied understanding
- **FERPA/COPPA Compliant**: Built with educational privacy from day 1

## 📋 Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14

## 🛠️ Installation

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
pnpm db:migrate

# Start development servers
pnpm dev
```

## 🏗️ Project Structure

```
phnxforge/
├── apps/
│   ├── web-app/              # Main student/teacher application
│   └── admin-dashboard/      # Administrative interface
├── packages/
│   ├── common/               # Shared utilities and types
│   ├── mathematics-engine/   # Core math reasoning engine
│   ├── reasoning-engine/     # Multi-perspective debate system
│   ├── assessment-system/    # 3D assessment framework
│   ├── industrial-mathematics/ # Real-world applications
│   └── formal-verification/  # Consistency and proof systems
├── docs/                     # Documentation
├── scripts/                  # Utility scripts
└── deployment/              # Docker and Kubernetes configs
```

## 🧪 Development

```bash
# Run all tests
pnpm test

# Run linting
pnpm lint

# Format code
pnpm format

# Type checking
pnpm type-check

# Build all packages
pnpm build
```

## 📚 Documentation

- [Development Guide](./docs/DEVELOPMENT.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Security](./docs/SECURITY.md)
- [API Documentation](./docs/API.md)
- [Deployment Agenda](./DEPLOYMENT_AGENDA_REVISED.md)

## 🔒 Security & Compliance

PHNXForge is built with security and compliance as first-class concerns:

- FERPA compliant data handling
- COPPA considerations for K-12 users
- WCAG 2.1 AA accessibility standards
- Audit logging for all sensitive operations
- Encryption at rest and in transit

See [SECURITY.md](./docs/SECURITY.md) for details.

## 📊 Performance Benchmarks

- API Response Time: p95 < 500ms
- Reasoning Engine: < 3s for multi-perspective analysis
- Page Load Time: < 2s initial load
- Concurrent Users: 200+ supported

## 🤝 Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for contribution guidelines.

## 📄 License

[Your License Here]

## 👥 Team

- **Mathematics/Education Specialist**: Curriculum design and pedagogy
- **Full-stack Engineers**: Application development
- **DevOps/Security**: Infrastructure and compliance
- **UX Designer**: User experience and accessibility

## 🗺️ Roadmap

See [DEPLOYMENT_AGENDA_REVISED.md](./DEPLOYMENT_AGENDA_REVISED.md) for the complete 20-week development roadmap.

## 📞 Support

For questions or issues, please open a GitHub issue or contact [support@phnxforge.com](mailto:support@phnxforge.com).
