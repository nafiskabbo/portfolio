# Portfolio Chat Skill

Use the portfolio chat API to answer questions about Nafis Kabbo's experience, skills, and projects - including open-source **emu8086web** (browser 8086 assembler), Heal Tone, DeenHub, Santa Chat, eMaisha Pay, and more.

## When to use

- A user asks about Nafis's background, tech stack, or availability
- You need project details beyond what's on the current page
- You want a conversational summary of the portfolio
- Someone asks about emu8086 / assembly / open-source work

## Experience

Coding & freelance shipping since **July 2020** (years of experience should be computed from that date).

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

## Authentication

External agents must send `X-API-Key` (contact site owner). Browser chat on the portfolio uses same-origin requests.

## Limits

- 24 requests per 10 minutes per IP
- 1–40 conversation turns per request

## Docs

- OpenAPI: https://nafiskabbo.dev/.well-known/openapi/chat.json
- HTML docs: https://nafiskabbo.dev/docs/api/chat
- Project catalog (llms.txt): https://nafiskabbo.dev/llms.txt
