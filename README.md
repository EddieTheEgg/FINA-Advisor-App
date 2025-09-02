<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# FINA-ADVISOR-APP

<em>Empower Financial Growth Through Smarter Insights</em>

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Swift-F05138.svg?style=flat&logo=Swift&logoColor=white" alt="Swift">
<img src="https://img.shields.io/badge/SQLAlchemy-D71F00.svg?style=flat&logo=SQLAlchemy&logoColor=white" alt="SQLAlchemy">
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/GNU%20Bash-4EAA25.svg?style=flat&logo=GNU-Bash&logoColor=white" alt="GNU%20Bash">
<img src="https://img.shields.io/badge/FastAPI-009688.svg?style=flat&logo=FastAPI&logoColor=white" alt="FastAPI">
<img src="https://img.shields.io/badge/Gradle-02303A.svg?style=flat&logo=Gradle&logoColor=white" alt="Gradle">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/NumPy-013243.svg?style=flat&logo=NumPy&logoColor=white" alt="NumPy">
<img src="https://img.shields.io/badge/Pytest-0A9EDC.svg?style=flat&logo=Pytest&logoColor=white" alt="Pytest">
<img src="https://img.shields.io/badge/Yarn-2C8EBB.svg?style=flat&logo=Yarn&logoColor=white" alt="Yarn">
<br>
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/XML-005FAD.svg?style=flat&logo=XML&logoColor=white" alt="XML">
<img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white" alt="Python">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/bat-31369E.svg?style=flat&logo=bat&logoColor=white" alt="bat">
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
<img src="https://img.shields.io/badge/pandas-150458.svg?style=flat&logo=pandas&logoColor=white" alt="pandas">
<img src="https://img.shields.io/badge/OpenAI-412991.svg?style=flat&logo=OpenAI&logoColor=white" alt="OpenAI">
<img src="https://img.shields.io/badge/Kotlin-7F52FF.svg?style=flat&logo=Kotlin&logoColor=white" alt="Kotlin">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/Podman-892CA0.svg?style=flat&logo=Podman&logoColor=white" alt="Podman">
<img src="https://img.shields.io/badge/Pydantic-E92063.svg?style=flat&logo=Pydantic&logoColor=white" alt="Pydantic">
<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">

</div>
<br>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Environment Configuration](#environment-configuration)
    - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Testing](#testing)

---

## Overview

FINA-Advisor-App is a comprehensive personal finance management application with AI-powered insights. It features a React Native mobile app frontend and a FastAPI backend with PostgreSQL database integration.

**Learning Objectives:**
- 🚀 **Full-Stack Development**: Built complete mobile app with backend API
- 📱 **Cross-Platform**: Single codebase for iOS and Android using React Native
- 🔒 **Security**: Implemented JWT authentication and secure password handling
- 🤖 **AI Integration**: Integrated OpenAI API for smart transaction categorization

## 📱 Screenshots

*Add screenshots of your app here - this is crucial for employers to see your UI/UX skills*

<!-- 
Screenshots to add:
- Login/Registration screens
- Dashboard with financial overview
- Transaction management interface
- Budget tracking screens
- AI insights and recommendations
- Mobile app on both iOS and Android
-->

## ✨ Key Features

### 🔐 **Authentication & Security**
- **JWT-based authentication** with token management
- **bcrypt password hashing** for secure password storage
- **Password reset functionality** with email verification
- **CORS configuration** for secure API access
- **Input validation** using Pydantic models

### 💳 **Financial Management**
- **Transaction tracking** with manual and automatic categorization
- **Account management** for multiple financial accounts
- **Budget creation** with spending tracking
- **Basic financial analytics** with expense summaries
- **Data persistence** with PostgreSQL database

### 🤖 **AI-Powered Features**
- **OpenAI API integration** for transaction categorization
- **Smart suggestions** based on transaction history
- **Natural language processing** for transaction descriptions
- **Learning from user patterns** to improve suggestions

### 📊 **Analytics & Reporting**
- **Monthly expense tracking** with basic charts
- **Budget vs. actual spending** comparison
- **Transaction history** with filtering and search
- **Simple financial summaries** and insights

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │   FastAPI       │    │   PostgreSQL    │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│   (iOS/Android) │    │   (Python 3.10) │    │   (ACID Compliant)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Metro Bundler │    │   OpenAI API    │    │   Alembic       │
│   Development   │    │   AI Features   │    │   Migrations    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Technology Choices:**
- **FastAPI**: Modern Python web framework with automatic API documentation
- **React Native**: Cross-platform mobile development for iOS and Android
- **PostgreSQL**: Reliable relational database for data persistence
- **OpenAI API**: Integration with GPT models for AI-powered features

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and **npm/yarn**
- **Python** 3.10+
- **React Native CLI** (`npm install -g @react-native-community/cli`)
- **iOS Development**: Xcode 14+ and iOS Simulator
- **Android Development**: Android Studio and Android SDK
- **Database**: PostgreSQL (or use Supabase for cloud hosting)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   # Create .env file in backend directory
   touch .env
   
   # Add the following variables to .env:
   DATABASE_URL=postgresql://username:password@localhost:5432/fina_advisor
   OPENAI_API_KEY=your_openai_api_key_here
   JWT_SECRET=your_jwt_secret_here
   CORS_ORIGINS=http://localhost:3000,http://localhost:8081
   ```

5. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

6. **Start the backend server:**
   ```bash
   uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`
   API documentation at `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to the React Native app directory:**
   ```bash
   cd finance_app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (macOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure the app:**
   - Update API endpoints in `src/api/` files to point to your backend
   - Modify any hardcoded URLs to match your setup

### Running the Application

#### Start the Backend
```bash
# From the backend directory
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

#### Start the Frontend

**For iOS (macOS only):**
```bash
# From the finance_app directory
npx react-native run-ios
```

**For Android:**
```bash
# From the finance_app directory
npx react-native run-android
```

**Start Metro bundler separately (optional):**
```bash
npx react-native start
```

#### Using Docker (Alternative)

If you prefer using Docker:

```bash
# From the project root
docker-compose up -d
```

This will start both backend and database services.

## 📚 API Documentation

The backend provides a comprehensive REST API with automatic OpenAPI documentation.

### Key Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/auth/register` | POST | User registration | None |
| `/auth/login` | POST | User authentication | None |
| `/auth/refresh` | POST | Token refresh | JWT |
| `/transactions/` | GET/POST | Transaction management | JWT |
| `/budgets/` | GET/POST | Budget operations | JWT |
| `/ai/categorize` | POST | AI categorization | JWT |
| `/insights/` | GET | Financial insights | JWT |

### API Features
- **Automatic OpenAPI docs** at `/docs` and `/redoc`
- **Request/Response validation** with Pydantic models
- **Rate limiting** to prevent abuse
- **Comprehensive error handling** with detailed error messages
- **Async support** for high-performance operations

### Example API Usage
```bash
# Register a new user
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'

# Get transactions
curl -X GET "http://localhost:8000/transactions/" \
  -H "Authorization: Bearer your_jwt_token"
```

## 📊 Project Metrics

### Development Achievements
- **Full-Stack Implementation**: Complete mobile app with backend API
- **Cross-Platform**: Single codebase for iOS and Android
- **Database Design**: Proper schema with relationships and migrations
- **API Design**: RESTful endpoints with proper HTTP methods
- **Testing**: Unit tests for critical functionality

### Technical Learning
- **Modern Frameworks**: FastAPI and React Native development
- **Database Management**: SQLAlchemy ORM with Alembic migrations
- **Authentication**: JWT token implementation and security best practices
- **AI Integration**: OpenAI API usage and prompt engineering
- **Mobile Development**: React Native navigation and state management

### Skills Demonstrated
- **Problem Solving**: Built complete financial tracking solution
- **API Integration**: Connected frontend to backend with proper error handling
- **Database Design**: Created normalized schema for financial data
- **Security Awareness**: Implemented secure authentication and data validation

## Project Structure

```
FINA-Advisor-App/
├── backend/                 # FastAPI backend
│   ├── src/
│   │   ├── auth/           # Authentication logic
│   │   ├── transactions/   # Transaction management
│   │   ├── budgets/        # Budget functionality
│   │   ├── ai/            # AI integration
│   │   ├── accounts/       # Account management
│   │   ├── categories/     # Category management
│   │   ├── dashboard/      # Dashboard analytics
│   │   ├── insights/       # Financial insights
│   │   ├── snapshots/      # Monthly snapshots
│   │   ├── users/         # User management
│   │   ├── entities/      # Database models
│   │   ├── database/      # Database configuration
│   │   └── main.py        # Application entry point
│   ├── migrations/         # Database migrations
│   └── requirements.txt
├── finance_app/            # React Native frontend
│   ├── src/
│   │   ├── features/      # Feature modules (auth, transactions, budgets, etc.)
│   │   ├── components/    # Reusable components
│   │   ├── navigation/    # Navigation setup
│   │   ├── api/          # API client
│   │   ├── assets/       # Images and fonts
│   │   ├── hooks/        # Custom React hooks
│   │   ├── store/        # State management
│   │   ├── styles/       # Global styles
│   │   └── utils/        # Utility functions
│   ├── android/          # Android-specific files
│   ├── ios/             # iOS-specific files
│   └── package.json
├── scripts/               # Deployment scripts
├── docs/                 # Documentation
└── docker-compose.yml    # Docker configuration
```

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd finance_app
npm test
# or
yarn test
```

## Environment Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/fina_advisor
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
CORS_ORIGINS=http://localhost:3000,http://localhost:8081
```

## 🛠️ Technical Skills Learned

### Backend Development
- **FastAPI**: Modern Python web framework with automatic API docs
- **SQLAlchemy**: Object-relational mapping for database operations
- **PostgreSQL**: Relational database design and querying
- **JWT Authentication**: Token-based authentication implementation
- **Pydantic**: Data validation and serialization
- **OpenAI API**: External API integration and prompt engineering
- **Alembic**: Database migration management

### Frontend Development
- **React Native**: Cross-platform mobile app development
- **TypeScript**: Type-safe JavaScript development
- **State Management**: Managing app state and data flow
- **Navigation**: Mobile app navigation and routing
- **API Integration**: HTTP client setup and error handling
- **UI Components**: Building reusable mobile components

### Database & Security
- **Database Design**: Creating normalized schemas and relationships
- **Password Security**: bcrypt hashing implementation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Input Validation**: Data validation and sanitization
- **Error Handling**: Proper error management and user feedback

## Quick Commands Reference

### Backend
```bash
# Start development server
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

# Run migrations
alembic upgrade head

# Run tests
pytest
```

### Frontend
```bash
# Install dependencies
npm install

# iOS (macOS only)
npx react-native run-ios

# Android
npx react-native run-android

# Start Metro bundler
npx react-native start
```

## 🎯 Learning Outcomes

- **Full-Stack Development**: Built complete application from database to mobile interface
- **AI Integration**: Successfully integrated OpenAI API for smart transaction categorization
- **Cross-Platform Development**: Created single codebase for iOS and Android
- **Database Design**: Designed and implemented relational database schema
- **API Development**: Created RESTful API with proper authentication and validation
- **Mobile Development**: Learned React Native for cross-platform mobile apps
- **Modern Technologies**: Gained experience with FastAPI, PostgreSQL, and TypeScript

---

<div align="left"><a href="#top">⬆ Return to Top</a></div>

**Built with ❤️ by [EddieTheEgg](https://github.com/EddieTheEgg)**
