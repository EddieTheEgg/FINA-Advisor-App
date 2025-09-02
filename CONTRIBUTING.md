# Contributing to FINA-Advisor-App

> **Note**: This is currently a private project. This document is for reference only.

Thank you for your interest in FINA-Advisor-App! This document provides guidelines and information for potential contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.10+
- Git
- Docker (optional)

### Development Setup

> **Access Required**: Contact the repository owner for access permissions.

1. **Clone Repository** (requires access)
   ```bash
   git clone https://github.com/EddieTheEgg/FINA-Advisor-App.git
   cd FINA-Advisor-App
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install -r backend/requirements.txt
   
   # Frontend
   cd finance_app
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 📝 How to Contribute

### Reporting Issues

- Use the GitHub issue tracker
- Include detailed steps to reproduce
- Provide system information (OS, Node.js version, etc.)
- Include relevant logs or error messages

### Suggesting Features

- Open an issue with the "enhancement" label
- Describe the feature and its benefits
- Consider implementation complexity

### Code Contributions

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   # Backend tests
   cd backend && pytest
   
   # Frontend tests
   cd finance_app && npm test
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Code Style Guidelines

### Python (Backend)
- Follow PEP 8
- Use type hints
- Write docstrings for functions
- Use meaningful variable names

### TypeScript/JavaScript (Frontend)
- Use ESLint configuration
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling

### Git Commit Messages
Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## 🧪 Testing

### Backend Testing
```bash
cd backend
pytest tests/ -v
```

### Frontend Testing
```bash
cd finance_app
npm test
```

### Integration Testing
```bash
# Run full test suite
npm run test:integration
```

## 📚 Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update API documentation for backend changes
- Include examples in your contributions

## 🔒 Security

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Follow security best practices
- Report security vulnerabilities privately

## 🏷️ Pull Request Process

1. **Ensure Tests Pass**
   - All existing tests must pass
   - New tests should be added for new features

2. **Update Documentation**
   - Update README.md if needed
   - Add/update code comments

3. **Request Review**
   - Assign appropriate reviewers
   - Provide clear description of changes
   - Link related issues

4. **Address Feedback**
   - Respond to review comments
   - Make requested changes
   - Keep PR up to date with main branch

## 🎯 Areas for Contribution

### High Priority
- Bug fixes
- Performance improvements
- Security enhancements
- Test coverage improvements

### Medium Priority
- New features
- UI/UX improvements
- Documentation updates
- Code refactoring

### Low Priority
- Code style improvements
- Minor optimizations
- Additional test cases

## 📞 Getting Help

- **Email**: edditheeggy@gmail.com for questions and access requests
- **Repository Access**: Contact owner for viewing permissions

## 📄 License

This is a private project. All rights reserved.

---

Thank you for your interest in FINA-Advisor-App! 🎉
