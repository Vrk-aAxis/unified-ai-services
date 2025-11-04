---
layout: default
title: Home
---

# Generative AI Services API Documentation

Welcome to the Generative AI Services API documentation. This API provides endpoints for generating various types of AI-powered content including Product Requirements Documents (PRD), project descriptions, and task descriptions.

## Table of Contents

- [Getting Started](getting-started.html)
- [API Endpoints](endpoints.html)
- [Authentication](authentication.html)
- [Error Handling](error-handling.html)

## Overview

The Generative AI Services API is a RESTful API that leverages multiple AI providers (Groq, OpenRouter, Gemini) to generate structured documents and descriptions. The API supports both simple and detailed output modes for different use cases.

## Base URL

```
http://localhost:3000
```

For production, replace with your production server URL.

## Features

- **Multiple AI Providers**: Support for Groq (fastest), OpenRouter, and Gemini
- **Structured Output**: JSON-formatted responses for detailed modes
- **Flexible Input**: Support for both simple prompts and structured data
- **Error Handling**: Comprehensive error messages and validation
- **Health Checks**: Monitor API status and uptime

## Quick Start

1. **Check API Health**

   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Generate a Simple Project Description**
   ```bash
   curl -X POST http://localhost:3000/api/ai/generate-project-description \
     -H "Content-Type: application/json" \
     -d '{
       "simplePrompt": "An e-commerce platform for selling digital products"
     }'
   ```

## Rate Limits

Currently, the API has no rate limits. However, please use the service responsibly and consider implementing rate limiting in production environments.

## Support

For issues, questions, or contributions, please refer to the project repository.

---

**Last Updated**: 2024
