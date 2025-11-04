---
layout: default
title: Getting Started
---

# Getting Started

This guide will help you get started with the Generative AI Services API.

## Prerequisites

- A server running the API (or access to a hosted instance)
- Ability to make HTTP requests (curl, Postman, or any HTTP client)
- Basic understanding of REST APIs and JSON

## API Base URL

The API is typically available at:

```
http://localhost:3000
```

For production deployments, replace with your production server URL.

## Making Your First Request

### 1. Check API Status

Before making any requests, verify the API is running:

```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### 2. Generate Your First Project Description

Let's create a simple project description:

```bash
curl -X POST http://localhost:3000/api/ai/generate-project-description \
  -H "Content-Type: application/json" \
  -d '{
    "simplePrompt": "A task management application for teams"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "description": "A comprehensive task management application designed for teams to collaborate, track progress, and manage projects efficiently...",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "generatedFrom": "simple_prompt",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## Understanding Request/Response Format

### Request Format

All POST requests should:
- Use `Content-Type: application/json` header
- Send data as JSON in the request body
- Include required fields as specified in endpoint documentation

### Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "data": {
    // Response data varies by endpoint
  }
}
```

Error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "stack": "Error stack trace (in development)"
  }
}
```

## Next Steps

- Explore [API Endpoints](endpoints.html) for detailed endpoint documentation
- Review [Examples](examples.html) for common use cases
- Understand [Error Handling](error-handling.html) for troubleshooting

---

[← Back to Home](index.html)

