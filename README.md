# TaskFlow – Production-Ready AWS Deployment

A production-ready backend deployment project demonstrating modern DevOps practices using **Docker**, **AWS EC2**, **Amazon RDS**, **Nginx**, and **GitHub Actions CI/CD**.

This project focuses on deploying a Node.js application in a production-style environment rather than simply running it locally.

---

# Architecture

```text
                    Internet
                        │
                    HTTP (80)
                        │
                     Nginx
                        │
                Reverse Proxy
                        │
                 localhost:3001
                        │
          Docker Container (Node.js)
                        │
                 Amazon RDS PostgreSQL
```

---

# Features

* Dockerized Node.js application
* Amazon RDS PostgreSQL database
* Nginx Reverse Proxy
* Automated CI/CD using GitHub Actions
* Docker Hub image deployment
* AWS EC2 hosting
* Environment variable configuration
* Production-ready architecture
* Secure database networking using AWS Security Groups

---

# Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Amazon RDS

### Cloud

* AWS EC2
* AWS VPC
* Security Groups

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* Docker Hub
* Nginx
* Linux (Ubuntu)

---

# Project Structure

```text
taskflow/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── server.js
├── routes/
├── controllers/
├── middleware/
├── models/
├── public/
├── views/
└── README.md
```

---

# CI/CD Pipeline

```text
Developer
     │
git push
     │
     ▼
GitHub Repository
     │
     ▼
GitHub Actions
     │
docker build
     │
     ▼
Docker Image
     │
docker push
     ▼
Docker Hub
     │
SSH
     ▼
AWS EC2
     │
docker compose pull
     │
docker compose up -d
     ▼
Running Application
```

---

# Deployment Architecture

```text
Internet
      │
      ▼
Nginx
      │
      ▼
Docker Container
(Node.js)
      │
      ▼
Amazon RDS PostgreSQL
```

---

# AWS Services Used

* Amazon EC2
* Amazon RDS PostgreSQL
* VPC
* Security Groups

---

# DevOps Workflow

### Development

* Develop application locally
* Test using Docker Compose

### Continuous Integration

* Push code to GitHub
* GitHub Actions builds Docker image
* Pushes image to Docker Hub

### Continuous Deployment

* EC2 pulls the latest Docker image
* Container is restarted automatically
* Application connects to Amazon RDS

---

# Production Features

* Docker containerization
* Managed PostgreSQL database (Amazon RDS)
* Reverse proxy using Nginx
* Environment-based configuration
* Automated deployment pipeline
* Persistent managed database
* Separation of application and database services

---

# Learning Outcomes

This project helped me understand:

* Docker image creation
* Docker Compose
* Containerized deployments
* Linux server management
* AWS EC2
* Amazon RDS
* Nginx Reverse Proxy
* CI/CD with GitHub Actions
* Docker Hub
* Environment variables
* AWS Security Groups
* Production deployment workflow

---

# Future Improvements

* HTTPS using Let's Encrypt
* Custom domain
* Docker image versioning
* Multi-stage Docker builds
* Health checks
* Infrastructure as Code using Terraform
* Kubernetes deployment
* Monitoring with Prometheus & Grafana

---

# Screenshots (Optional)

Add screenshots of:

* Application Home Page
* GitHub Actions Success
* Docker Containers
* AWS EC2 Dashboard
* Amazon RDS Dashboard
* pgAdmin Connected to RDS

---

# Author

**Jignesh Solanki**

* GitHub: [https://github.com/Jignesh4611](https://github.com/Jignesh4611)
* LinkedIn: [https://linkedin.com/in/solanki-jignesh4611](https://linkedin.com/in/solanki-jignesh4611)
