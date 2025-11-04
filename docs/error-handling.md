---
layout: default
title: Error Handling
---

# Error Handling

The API uses standard HTTP status codes and returns error information in a consistent format.

## Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "message": "Human-readable error message",
    "stack": "Error stack trace (only in development mode)"
  }
}
```

## HTTP Status Codes

| Status Code | Meaning               | When It Occurs                                           |
| ----------- | --------------------- | -------------------------------------------------------- |
| 200         | OK                    | Successful request                                       |
| 400         | Bad Request           | Invalid input, missing required fields, invalid provider |
| 404         | Not Found             | Endpoint does not exist                                  |
| 500         | Internal Server Error | Server error, AI provider error, parsing error           |

## Common Error Scenarios

### 400 Bad Request

**Missing Required Field**

```json
{
  "success": false,
  "error": {
    "message": "Product input is required"
  }
}
```

**Invalid Provider**

```json
{
  "success": false,
  "error": {
    "message": "Invalid provider. Supported providers: groq (2-3s, Excellent), openrouter (8-10s, Good)"
  }
}
```

**Invalid Input Format**

```json
{
  "success": false,
  "error": {
    "message": "Either simplePrompt or structured fields (projectName, category, purpose) must be provided"
  }
}
```

### 500 Internal Server Error

**AI Provider Error**

```json
{
  "success": false,
  "error": {
    "message": "Failed to generate PRD: Groq API error: Bad Request - Invalid API key"
  }
}
```

**Parsing Error**

```json
{
  "success": false,
  "error": {
    "message": "Failed to parse PRD response: Unexpected token in JSON"
  }
}
```

## Best Practices

### 1. Always Check Response Status

```javascript
const response = await fetch('http://localhost:3000/api/ai/generate-prd', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const result = await response.json();

if (!result.success) {
  console.error('Error:', result.error.message);
  // Handle error
} else {
  // Use result.data
}
```

### 2. Validate Input Before Sending

Validate required fields on the client side before making requests:

```javascript
if (!productInput.productName) {
  console.error('Product name is required');
  return;
}
```

### 3. Handle Network Errors

```javascript
try {
  const response = await fetch(url, options);
  const data = await response.json();
  // Process data
} catch (error) {
  if (error.name === 'TypeError') {
    console.error('Network error - check if server is running');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### 4. Retry Logic for Transient Errors

For production applications, implement retry logic for 500 errors:

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      }
      if (response.status === 500 && i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

## Error Messages by Endpoint

### POST /api/ai/generate-prd

- `"Product input is required"` - Missing `productInput` field
- `"Invalid provider. Supported providers: ..."` - Unsupported provider
- `"Failed to generate PRD: ..."` - AI provider or parsing error

### POST /api/ai/generate-project-description

- `"Either simplePrompt or structured fields (projectName, category, purpose) must be provided"` - Missing required input
- `"Invalid provider. Supported providers: ..."` - Unsupported provider
- `"Failed to generate project description: ..."` - AI provider or parsing error

## Development vs Production

In development mode, error responses include stack traces:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "stack": "Error: Error message\n    at ..."
  }
}
```

In production, stack traces are omitted for security.

---

[← Back to Home](index.html) | [Next: Examples →](examples.html)
