<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# FINA-ADVISOR-APP

<em>Empower Financial Growth Through Smarter Insights</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/last-commit/EddieTheEgg/FINA-Advisor-App?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/EddieTheEgg/FINA-Advisor-App?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/EddieTheEgg/FINA-Advisor-App?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white" alt="Python">
<img src="https://img.shields.io/badge/FastAPI-009688.svg?style=flat&logo=FastAPI&logoColor=white" alt="FastAPI">
<img src="https://img.shields.io/badge/React_Native-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React Native">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/PostgreSQL-316192.svg?style=flat&logo=PostgreSQL&logoColor=white" alt="PostgreSQL">
<img src="https://img.shields.io/badge/OpenAI-412991.svg?style=flat&logo=OpenAI&logoColor=white" alt="OpenAI">
<img src="https://img.shields.io/badge/SQLAlchemy-D71F00.svg?style=flat&logo=SQLAlchemy&logoColor=white" alt="SQLAlchemy">
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/AWS_EC2-FF9900.svg?style=flat&logo=Amazon-AWS&logoColor=white" alt="AWS EC2">
<img src="https://img.shields.io/badge/Supabase-3ECF8E.svg?style=flat&logo=Supabase&logoColor=white" alt="Supabase">

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

## ✨ Key Features

- **JWT Authentication** with secure password handling
- **Transaction Management** with AI-powered categorization
- **Budget Tracking** and spending analytics
- **Cross-Platform Mobile App** for iOS and Android
- **OpenAI Integration** for smart financial insights

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │   FastAPI       │    │   Supabase      │
│   Frontend      │◄──►│   Backend       │◄──►│   PostgreSQL    │
│   (iOS/Android) │    │   (Python 3.10) │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Metro Bundler │    │   OpenAI API    │    │   AWS EC2       │
│   Development   │    │   Finance APIs  │    │   Deployment    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Technology Choices:**
- **FastAPI**: Modern Python web framework with automatic API documentation
- **React Native**: Cross-platform mobile development for iOS and Android
- **Supabase**: Cloud PostgreSQL database with built-in authentication
- **OpenAI API**: Integration with GPT models for AI-powered features
- **AWS EC2**: Cloud deployment and hosting platform

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

## 📊 What I Learned

### Development Achievements
- **Full-Stack Implementation**: Complete mobile app with backend API
- **Cross-Platform**: Single codebase for iOS and Android
- **Database Design**: Proper schema with relationships and migrations
- **API Design**: RESTful endpoints with proper HTTP methods

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
