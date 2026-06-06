# Portfolio Chat Skill

Use the portfolio chat API to answer questions about Nafis Kabbo's experience, skills, and projects.

## When to use

- A user asks about Nafis's background, tech stack, or availability
- You need project details beyond what's on the current page
- You want a conversational summary of the portfolio

## API

```
POST https://nafiskabbo.dev/api/chat
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "What Flutter projects has Nafis shipped?" }
  ]
}
```

## Response

```json
{
  "reply": "...",
  "modelUsed": "..."
}
```

## Limits

- 24 requests per 10 minutes per IP
- 1–40 conversation turns per request
- No authentication required

## Docs

- OpenAPI: https://nafiskabbo.dev/.well-known/openapi/chat.json
- HTML docs: https://nafiskabbo.dev/docs/api/chat
