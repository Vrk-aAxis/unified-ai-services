---
layout: default
title: Authentication
---

# Authentication

## Current Status

**The API currently does not require authentication.** All endpoints are publicly accessible.

## Security Considerations

For production deployments, consider implementing:

1. **API Key Authentication**
   - Add API keys to restrict access
   - Include key in request headers: `X-API-Key: your-api-key`

2. **Rate Limiting**
   - Implement rate limiting per IP or API key
   - Prevent abuse and control costs

3. **CORS Configuration**
   - Configure allowed origins in production
   - Currently set to allow all origins (`cors()`)

4. **HTTPS**
   - Always use HTTPS in production
   - Protect data in transit

## Future Authentication

If authentication is added in the future, it will be documented here with:

- Authentication method
- How to obtain credentials
- How to include credentials in requests
- Token refresh procedures

## Environment Variables

The API uses environment variables for configuration. Ensure these are set:

```bash
# Required for Groq
GROQ_API_KEY=your-groq-api-key

# Required for OpenRouter
OPENROUTER_API_KEY=your-openrouter-api-key

# Required for Gemini
GEMINI_API_KEY=your-gemini-api-key

# Optional - Server configuration
PORT=3000
NODE_ENV=production
```

---

[← Back to Home](index.html) | [Next: Error Handling →](error-handling.html)
