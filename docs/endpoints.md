---
layout: default
title: API Endpoints
---

# API Endpoints

Complete reference for all available API endpoints.

## Base Path

All API endpoints are prefixed with `/api` except for the root health check.

## Health Check Endpoints

### GET /health

Check if the API server is running (root level endpoint).

**cURL Example:**

```bash
curl http://localhost:3000/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### GET /api/health

Comprehensive health check endpoint with version information.

**cURL Example:**

```bash
curl http://localhost:3000/api/health
```

**Response:**

```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

## AI Generation Endpoints

### POST /api/ai/generate-prd

Generate a comprehensive Product Requirements Document (PRD) based on product input.

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/ai/generate-prd \
  -H "Content-Type: application/json" \
  -d '{
    "productInput": {
      "productName": "Task Management App",
      "version": "1.0.0",
      "targetAudience": "Small to medium-sized teams",
      "primaryGoals": [
        "Improve team collaboration",
        "Track project progress",
        "Manage deadlines efficiently"
      ],
      "highLevelProblem": "Teams struggle to coordinate tasks and track project progress effectively",
      "techStack": {
        "frontend": "React",
        "backend": "Node.js",
        "database": "PostgreSQL",
        "hosting": "AWS",
        "other": "Redis for caching"
      }
    },
    "provider": "groq"
  }'
```

**Parameters:**

| Field          | Type   | Required | Description                                                              |
| -------------- | ------ | -------- | ------------------------------------------------------------------------ |
| `productInput` | Object | Yes      | Product information (see structure below)                                |
| `provider`     | String | No       | AI provider: `"groq"`, `"openrouter"`, or `"gemini"` (default: `"groq"`) |

**Product Input Structure:**

| Field              | Type          | Required | Description                    |
| ------------------ | ------------- | -------- | ------------------------------ |
| `productName`      | String        | Yes      | Name of the product            |
| `version`          | String        | Yes      | Version number                 |
| `targetAudience`   | String        | Yes      | Target user group              |
| `primaryGoals`     | Array[String] | Yes      | Main objectives of the product |
| `highLevelProblem` | String        | Yes      | Problem the product solves     |
| `techStack`        | Object        | Yes      | Technology stack (see below)   |

**Tech Stack Structure:**

| Field      | Type   | Required | Description             |
| ---------- | ------ | -------- | ----------------------- |
| `frontend` | String | Yes      | Frontend technology     |
| `backend`  | String | Yes      | Backend technology      |
| `database` | String | Yes      | Database technology     |
| `hosting`  | String | Yes      | Hosting platform        |
| `other`    | String | No       | Additional technologies |

**Response:**

```json
{
  "success": true,
  "data": {
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "data": {
      "title": "Task Management App",
      "version": "1.0.0",
      "overview": {
        "problem": "...",
        "solution": "...",
        "objectives": [...]
      },
      "features": [...],
      "architecture": {...},
      "timeline": {...},
      "successMetrics": [...],
      "risks": [...]
    }
  }
}
```

**Supported Providers:**

- `groq` - Fastest (3-5s), Excellent quality with structured output
- `openrouter` - Good (10-15s), Good quality with JSON mode
- `gemini` - Not recommended for PRD generation

**Use Cases:**

- Product planning
- Documentation generation
- Stakeholder communication
- Project kickoff

---

### POST /api/ai/generate-project-description

Generate a professional project description. Supports both simple prompt mode and structured input mode.

**cURL Example (Simple Mode):**

```bash
curl -X POST http://localhost:3000/api/ai/generate-project-description \
  -H "Content-Type: application/json" \
  -d '{
    "simplePrompt": "A task management application for teams to collaborate and track projects",
    "provider": "groq"
  }'
```

**cURL Example (Structured Mode):**

```bash
curl -X POST http://localhost:3000/api/ai/generate-project-description \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "TaskFlow",
    "category": "Productivity",
    "purpose": "Help teams manage tasks and projects efficiently",
    "targetUsers": "Small to medium-sized teams",
    "keyFeatures": ["Task assignment", "Progress tracking", "Team collaboration"],
    "provider": "groq"
  }'
```

**cURL Example (Hybrid Mode):**

```bash
curl -X POST http://localhost:3000/api/ai/generate-project-description \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "TaskFlow",
    "category": "Productivity",
    "simplePrompt": "Additional context about the project",
    "provider": "groq"
  }'
```

**Parameters:**

| Field          | Type          | Required      | Description                                                              |
| -------------- | ------------- | ------------- | ------------------------------------------------------------------------ |
| `simplePrompt` | String        | Conditional\* | Simple text description of the project                                   |
| `projectName`  | String        | Conditional\* | Name of the project                                                      |
| `category`     | String        | No            | Project category (e.g., "Productivity", "E-commerce")                    |
| `purpose`      | String        | Conditional\* | Purpose of the project                                                   |
| `targetUsers`  | String        | No            | Target user group                                                        |
| `keyFeatures`  | Array[String] | No            | Key features of the project                                              |
| `provider`     | String        | No            | AI provider: `"groq"`, `"openrouter"`, or `"gemini"` (default: `"groq"`) |

\*Either `simplePrompt` OR structured fields (`projectName`, `category`, `purpose`) must be provided.

**Response:**

```json
{
  "success": true,
  "data": {
    "description": "TaskFlow is a comprehensive task management application designed for small to medium-sized teams. The platform enables seamless collaboration, efficient task assignment, and real-time progress tracking...",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "generatedFrom": "hybrid",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response Fields:**

| Field           | Type   | Description                                                             |
| --------------- | ------ | ----------------------------------------------------------------------- |
| `description`   | String | Generated project description (2-3 sentences, ~100 words)               |
| `provider`      | String | AI provider used                                                        |
| `model`         | String | Model name used                                                         |
| `generatedFrom` | String | Generation mode: `"simple_prompt"`, `"structured_input"`, or `"hybrid"` |
| `timestamp`     | String | ISO 8601 timestamp                                                      |

**Supported Providers:**

- `groq` - Fastest (2-3s), Excellent reliability
- `openrouter` - Good (8-10s), Good reliability
- `gemini` - Okay (15-20s), Okay reliability

**Use Cases:**

- Project documentation
- Portfolio descriptions
- Project tracker entries
- Team onboarding

---

### POST /api/ai/generate-task-description

Generate a comprehensive task description. Supports both simple and detailed output modes.

**cURL Example (Simple Mode):**

```bash
curl -X POST http://localhost:3000/api/ai/generate-task-description \
  -H "Content-Type: application/json" \
  -d '{
    "responseType": "simple",
    "taskTitle": "Implement user authentication",
    "briefDescription": "Add login and registration functionality",
    "projectContext": "E-commerce platform"
  }'
```

**cURL Example (Detailed Mode - Minimal):**

```bash
curl -X POST http://localhost:3000/api/ai/generate-task-description \
  -H "Content-Type: application/json" \
  -d '{
    "responseType": "detailed",
    "taskTitle": "Implement user authentication",
    "briefDescription": "Add secure login and registration functionality with JWT tokens",
    "projectContext": "E-commerce platform"
  }'
```

**cURL Example (Detailed Mode - With All Optional Fields):**

```bash
curl -X POST http://localhost:3000/api/ai/generate-task-description \
  -H "Content-Type: application/json" \
  -d '{
    "responseType": "detailed",
    "taskTitle": "Implement user authentication",
    "briefDescription": "Add secure login and registration functionality with JWT tokens",
    "projectContext": "E-commerce platform",
    "projectDescription": "A full-stack e-commerce platform built with React and Node.js",
    "taskType": "feature",
    "priority": "high",
    "estimatedEffort": "M",
    "technicalRequirements": {
      "techStack": ["Node.js", "Express", "MongoDB", "JWT"],
      "frameworks": ["Passport.js"],
      "apis": ["REST API"]
    },
    "acceptanceCriteria": [
      "User can register with email and password",
      "User can login and receive JWT token",
      "Password is hashed using bcrypt"
    ],
    "dependencies": ["Database schema for users", "JWT library setup"],
    "constraints": "Must comply with GDPR for password storage",
    "provider": "groq"
  }'
```

**Parameters:**

| Field                   | Type   | Required | Description                                                              |
| ----------------------- | ------ | -------- | ------------------------------------------------------------------------ |
| `responseType`          | String | Yes      | Must be `"simple"` or `"detailed"`                                       |
| `taskTitle`             | String | Yes      | Title of the task                                                        |
| `briefDescription`      | String | Yes      | Brief description of what needs to be done                               |
| `projectContext`        | String | Yes      | Project or module name                                                   |
| `taskType`              | String | No       | Task type (e.g., "feature", "bugfix", "refactor")                        |
| `priority`              | String | No       | Priority level                                                           |
| `projectDescription`    | String | No       | Full project description (detailed mode only)                            |
| `estimatedEffort`       | String | No       | Estimated effort (detailed mode only)                                    |
| `technicalRequirements` | Object | No       | Technical requirements (detailed mode only)                              |
| `acceptanceCriteria`    | Array  | No       | Acceptance criteria (detailed mode only)                                 |
| `dependencies`          | Array  | No       | Dependencies or prerequisites (detailed mode only)                       |
| `constraints`           | String | No       | Technical or business constraints (detailed mode only)                   |
| `provider`              | String | No       | AI provider: `"groq"`, `"openrouter"`, or `"gemini"` (default: `"groq"`) |

**Response (Simple Mode):**

```json
{
  "success": true,
  "data": {
    "taskDescription": "Implement user authentication functionality for the e-commerce platform...",
    "responseType": "simple",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Detailed Mode):**

```json
{
  "success": true,
  "data": {
    "taskDescription": {
      "overview": "Brief overview of the task...",
      "detailedDescription": "Comprehensive description...",
      "technicalSteps": ["Step 1", "Step 2", ...],
      "acceptanceCriteria": ["Criterion 1", "Criterion 2", ...],
      "testingRequirements": ["Test 1", "Test 2", ...],
      "dependencies": ["Dependency 1", ...],
      "deliverables": ["Deliverable 1", ...],
      "risks": ["Risk 1", ...],
      "estimatedEffort": "M",
      "notes": "Additional notes...",
      "userStory": "As a user, I want..."
    },
    "responseType": "detailed",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Supported Providers:**

- `groq` - Fastest (2-3s), Excellent reliability with structured output
- `openrouter` - Good (8-10s), Good reliability with JSON mode
- `gemini` - Okay (15-20s), Okay reliability

---

## Response Times

| Provider   | Average Response Time | Best For                               |
| ---------- | --------------------- | -------------------------------------- |
| Groq       | 2-5 seconds           | Real-time applications, production use |
| OpenRouter | 8-15 seconds          | When Groq is unavailable               |
| Gemini     | 15-25 seconds         | Non-critical use cases                 |

---

[← Back to Home](index.html) | [Next: Authentication →](authentication.html)
