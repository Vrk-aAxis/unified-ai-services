---
layout: default
title: Examples
---

# Examples

Practical examples for using the Generative AI Services API.

## Table of Contents

- [Generate PRD](#generate-prd)
- [Generate Project Description](#generate-project-description)
  - [Simple Mode](#simple-mode)
  - [Structured Mode](#structured-mode)
  - [Hybrid Mode](#hybrid-mode)

## Generate PRD

### Complete Example

```bash
curl -X POST http://localhost:3000/api/ai/generate-prd \
  -H "Content-Type: application/json" \
  -d '{
    "productInput": {
      "productName": "TaskFlow Pro",
      "version": "2.0.0",
      "targetAudience": "Enterprise teams and project managers",
      "primaryGoals": [
        "Streamline project management workflows",
        "Improve team collaboration",
        "Provide real-time project insights",
        "Automate task assignment and tracking"
      ],
      "highLevelProblem": "Enterprise teams struggle with fragmented project management tools, leading to communication gaps, missed deadlines, and lack of visibility into project status",
      "techStack": {
        "frontend": "React with TypeScript",
        "backend": "Node.js with Express",
        "database": "PostgreSQL",
        "hosting": "AWS (EC2, RDS, S3)",
        "other": "Redis for caching, WebSocket for real-time updates"
      }
    },
    "provider": "groq"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "data": {
      "title": "TaskFlow Pro",
      "version": "2.0.0",
      "overview": {
        "problem": "Enterprise teams struggle with fragmented project management tools...",
        "solution": "TaskFlow Pro provides a unified platform...",
        "objectives": [
          "Streamline project management workflows",
          "Improve team collaboration",
          "Provide real-time project insights"
        ]
      },
      "features": [
        {
          "name": "Task Management",
          "description": "Create, assign, and track tasks...",
          "priority": "High",
          "userStories": [
            "As a project manager, I want to create tasks..."
          ],
          "acceptanceCriteria": [
            "Users can create tasks with title, description, and assignee",
            "Tasks can be organized into projects and categories"
          ],
          "dependencies": ["User authentication system"],
          "estimation": {
            "storyPoints": 8,
            "tshirtSize": "L"
          }
        }
      ],
      "architecture": {
        "systemOverview": "The system follows a microservices architecture...",
        "components": [...],
        "dataFlow": "...",
        "security": {...}
      },
      "timeline": {
        "phases": [...],
        "milestones": [...]
      },
      "successMetrics": [...],
      "risks": [...]
    }
  }
}
```

## Generate Project Description

### Simple Mode

**Use Case:** Quick description from a simple prompt

```bash
curl -X POST http://localhost:3000/api/ai/generate-project-description \
  -H "Content-Type: application/json" \
  -d '{
    "simplePrompt": "A mobile fitness app that tracks workouts and provides personalized training plans",
    "provider": "groq"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "description": "FitTrack is a mobile fitness application designed to help users track their workouts and achieve their fitness goals. The app provides personalized training plans based on user preferences, fitness level, and goals, making it suitable for both beginners and experienced athletes. With real-time workout tracking, progress analytics, and social features, FitTrack empowers users to maintain consistency and stay motivated on their fitness journey.",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "generatedFrom": "simple_prompt",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### Structured Mode

**Use Case:** Detailed description with specific project details

```bash
curl -X POST http://localhost:3000/api/ai/generate-project-description \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "EcoMarket",
    "category": "E-commerce",
    "purpose": "Sustainable shopping platform connecting eco-conscious consumers with green products",
    "targetUsers": "Environmentally conscious consumers aged 25-45",
    "keyFeatures": [
      "Carbon footprint calculator",
      "Eco-certification badges",
      "Sustainable packaging options",
      "Local supplier network"
    ],
    "provider": "groq"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "description": "EcoMarket is an innovative e-commerce platform in the sustainability category, designed to connect eco-conscious consumers with verified green products. The platform serves environmentally aware consumers aged 25-45 who prioritize sustainable shopping practices. Key features include a carbon footprint calculator, eco-certification badges for products, sustainable packaging options, and a network of local suppliers. EcoMarket makes it easy for consumers to make environmentally responsible purchasing decisions while supporting sustainable businesses.",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "generatedFrom": "structured_input",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### Hybrid Mode

**Use Case:** Combining structured data with additional context

```bash
curl -X POST http://localhost:3000/api/ai/generate-project-description \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "LearnHub",
    "category": "Education",
    "purpose": "Online learning platform for professionals",
    "simplePrompt": "Focus on microlearning and skill-based courses for career advancement",
    "provider": "groq"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "description": "LearnHub is an online learning platform in the education category, specifically designed for professionals seeking career advancement through skill-based learning. The platform emphasizes microlearning approaches, breaking down complex topics into bite-sized, manageable lessons that fit into busy schedules. With a focus on practical, career-relevant skills, LearnHub enables professionals to upskill efficiently and stay competitive in their fields.",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "generatedFrom": "hybrid",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## JavaScript/TypeScript Examples

### Using Fetch API

```javascript
async function generatePRD(productData) {
  try {
    const response = await fetch('http://localhost:3000/api/ai/generate-prd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productInput: productData,
        provider: 'groq'
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  } catch (error) {
    console.error('Error generating PRD:', error);
    throw error;
  }
}

// Usage
const productData = {
  productName: "TaskFlow Pro",
  version: "2.0.0",
  targetAudience: "Enterprise teams",
  primaryGoals: ["Streamline workflows", "Improve collaboration"],
  highLevelProblem: "Teams struggle with fragmented tools",
  techStack: {
    frontend: "React",
    backend: "Node.js",
    database: "PostgreSQL",
    hosting: "AWS"
  }
};

generatePRD(productData)
  .then(data => {
    console.log('PRD Generated:', data);
  })
  .catch(error => {
    console.error('Failed:', error);
  });
```

### Using Axios

```javascript
import axios from 'axios';

async function generateProjectDescription(input) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/ai/generate-project-description',
      {
        ...input,
        provider: 'groq'
      }
    );

    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
}

// Usage
generateProjectDescription({
  simplePrompt: "A task management app for remote teams"
})
  .then(description => {
    console.log('Description:', description.description);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

## Common Patterns

### Error Handling Pattern

```javascript
async function safeGeneratePRD(productData) {
  try {
    const response = await fetch('http://localhost:3000/api/ai/generate-prd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productInput: productData })
    });

    const result = await response.json();

    if (!result.success) {
      // Handle specific error types
      if (response.status === 400) {
        console.error('Validation error:', result.error.message);
      } else if (response.status === 500) {
        console.error('Server error:', result.error.message);
        // Implement retry logic here
      }
      throw new Error(result.error.message);
    }

    return result.data;
  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('Network error - is the server running?');
    }
    throw error;
  }
}
```

### Batch Processing

```javascript
async function generateMultipleDescriptions(projects) {
  const descriptions = await Promise.all(
    projects.map(project =>
      fetch('http://localhost:3000/api/ai/generate-project-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simplePrompt: project.description,
          provider: 'groq'
        })
      }).then(res => res.json())
    )
  );

  return descriptions
    .filter(result => result.success)
    .map(result => result.data);
}
```

---

[← Back to Home](index.html)

