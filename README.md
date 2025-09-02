# FINA-Advisor-App 💰

> **Empower Financial Growth Through Smarter Insights**

A comprehensive personal finance management application with AI-powered insights, built with React Native, FastAPI, and OpenAI integration.

[![React Native](https://img.shields.io/badge/React%20Native-0.72+-blue.svg)](https://reactnative.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-yellow.svg)](https://python.org/)
[![Status](https://img.shields.io/badge/Status-Private%20Repository-red.svg)]()

## 📱 Screenshots

*Add screenshots of your app here*

## ✨ Features

### 🔐 **Authentication & Security**
- Secure user registration and login
- Password reset functionality
- JWT-based authentication
- bcrypt password hashing

### 💳 **Financial Management**
- Transaction tracking and categorization
- Multiple account support
- Budget creation and monitoring
- Financial insights and analytics

### 🤖 **AI-Powered Insights**
- Smart transaction categorization
- Personalized financial advice
- Budget analysis and recommendations
- Spending pattern recognition

### 📊 **Analytics & Reporting**
- Monthly income/expense tracking
- Visual financial summaries
- Budget vs. actual spending
- Trend analysis

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │   FastAPI       │    │   Supabase      │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│   (iOS/Android) │    │   (Python)      │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   RN CLI        │    │   OpenAI API    │    │   AWS EC2       │
│   Development   │    │   AI Features   │    │   Deployment    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

> **Note**: This is a private repository. Contact the owner for access if you'd like to explore the codebase.

### Prerequisites

- **Node.js** 18+ and **npm/yarn**
- **Python** 3.10+
- **React Native CLI** (`npm install -g react-native-cli`)
- **iOS Simulator** (for iOS development)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development)
- **Docker** (optional, for containerized deployment)

### Installation

1. **Clone the repository** (requires access)
   ```bash
   git clone https://github.com/EddieTheEgg/FINA-Advisor-App.git
   cd FINA-Advisor-App
   ```

2. **Backend Setup**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   pip install -r backend/requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd finance_app
   npm install
   # or
   yarn install
   ```

4. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your configuration
   # - Database URL (Supabase)
   # - OpenAI API Key
   # - JWT Secret
   ```

### Running the Application

#### Backend (Development)
```bash
cd backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend (Development)
```bash
cd finance_app

# iOS
npx react-native run-ios

# Android
npx react-native run-android

# Metro bundler
npx react-native start
```

#### Production Deployment
```bash
# Using Docker
docker-compose up -d

# Or using deployment scripts
./scripts/deployment/start-service.sh
```

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd finance_app
npm test
# or
yarn test
```

## 📁 Project Structure

```
FINA-Advisor-App/
├── backend/                 # FastAPI backend
│   ├── src/
│   │   ├── auth/           # Authentication logic
│   │   ├── transactions/   # Transaction management
│   │   ├── budgets/        # Budget functionality
│   │   ├── ai/            # AI integration
│   │   └── database/      # Database configuration
│   └── requirements.txt
├── finance_app/            # React Native frontend
│   ├── src/
│   │   ├── features/      # Feature modules
│   │   ├── components/    # Reusable components
│   │   ├── navigation/    # Navigation setup
│   │   └── api/          # API client
│   └── package.json
├── scripts/               # Deployment scripts
│   ├── setup/            # Setup scripts
│   └── deployment/       # Deployment scripts
├── docs/                 # Documentation
│   ├── PRIVACY_POLICY.md
│   └── privacy-policy.html
└── docker-compose.yml    # Docker configuration
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Supabase PostgreSQL connection string | ✅ |
| `OPENAI_API_KEY` | OpenAI API key for AI features | ✅ |
| `JWT_SECRET` | Secret key for JWT token generation | ✅ |
| `CORS_ORIGINS` | Allowed CORS origins | ✅ |

### Database Setup

1. Create a Supabase project
2. Run database migrations:
   ```bash
   cd backend
   alembic upgrade head
   ```

## 🚀 Deployment

### AWS EC2 Deployment

1. **Setup EC2 Instance**
   ```bash
   ./scripts/setup/setup-ec2.sh
   ```

2. **Configure Domain & SSL**
   ```bash
   ./scripts/setup/setup-domain.sh
   ./scripts/setup/setup-ssl.sh
   ```

3. **Deploy Application**
   ```bash
   ./scripts/deployment/start-service.sh
   ```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build individual services
docker build -t fina-advisor-backend ./backend
docker build -t fina-advisor-frontend ./finance_app
```

## 📱 App Store Deployment

The app is configured for both iOS and Android deployment:

- **iOS**: Configured with proper app icons, Info.plist, and App Store Connect settings
- **Android**: Includes signing configuration and Play Store requirements

See `docs/` for detailed deployment guides.

## 🤝 Contributing

This is currently a private project. If you're interested in contributing or have suggestions, please contact the owner directly.

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

- **Documentation**: Check the `docs/` directory
- **Questions**: Contact edditheeggy@gmail.com
- **Repository Access**: Contact owner for viewing permissions

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) for the mobile framework
- [FastAPI](https://fastapi.tiangolo.com/) for the backend API
- [Supabase](https://supabase.com/) for the database and authentication
- [OpenAI](https://openai.com/) for AI-powered features

---

**Built with ❤️ by [EddieTheEgg](https://github.com/EddieTheEgg)**
