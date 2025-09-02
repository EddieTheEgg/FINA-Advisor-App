# Scripts Directory

This directory contains all setup and deployment scripts for the LLM-EIapp project.

## Setup Scripts (`setup/`)

- **`setup-domain.sh`** - Configures domain settings for the application
- **`setup-ec2.sh`** - Sets up AWS EC2 instance for deployment
- **`setup-ssl.sh`** - Configures SSL certificates for secure connections

## Deployment Scripts (`deployment/`)

- **`docker-manage.sh`** - Manages Docker containers for the application
- **`start-service.sh`** - Starts the application service
- **`backup.sh`** - Creates backups of application data
- **`health-check.sh`** - Performs health checks on the application

## Usage

All scripts should be run from the project root directory:

```bash
# Setup scripts
./scripts/setup/setup-ec2.sh
./scripts/setup/setup-domain.sh
./scripts/setup/setup-ssl.sh

# Deployment scripts
./scripts/deployment/start-service.sh
./scripts/deployment/docker-manage.sh
./scripts/deployment/backup.sh
./scripts/deployment/health-check.sh
```

## Prerequisites

- Ensure you have the necessary permissions to run the scripts
- Some scripts may require specific environment variables or configuration files
- Refer to the individual script files for detailed usage instructions
