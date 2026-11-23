# ai-chat

**Pay-per-call LLM inference with an OpenAI-compatible request body. Model auto-routing between `deepseek-flash` and `deepseek-v4-pro`, JSON response with token usage.**

- **Route**: `POST https://api.xynaptic.io/v1/ai-chat`
- **Price**: $0.02 per call (same on Base, Polygon, Arbitrum, Solana)
- **Required body**: `messages` array; `model` optional (`"auto"` routes automatically)
- **Content-Type**: `application/json`

```bash
curl -s -X POST https://api.xynaptic.io/v1/ai-chat \
  -H 'Content-Type: application/json' \
  -d '{"model":"auto","messages":[{"role":"user","content":"Summarize x402 in one sentence."}]}'
# -> 402 Payment Required (x402 v2 challenge, $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from the catalog example):

```json
{
  "id": "xyn-chat-8f3c1a9b2e",
  "object": "chat.completion",
  "model": "deepseek-flash",
  "choices": [
    { "index": 0, "message": { "role": "assistant", "content": "..." }, "finish_reason": "stop" }
  ],
  "usage": { "prompt_tokens": 812, "completion_tokens": 96, "total_tokens": 908 },
  "service": "ai-chat",
  "summary": "chat analysis: LLM synthesis",
  "xynaptic": {
    "provider": "zai",
    "model_requested": "auto",
    "model_used": "deepseek-flash",
    "routing": "direct",
    "fallback_used": false
  }
}
```

**Limits**: the model is chosen by the router; `xynaptic.model_used` tells you which one actually answered. Maximum prompt/completion size is not stated in the catalog — treat long contexts as unsupported until confirmed. No streaming documented (single JSON response). Tool/function calling is not documented; `tools` appears in the example as an empty array.

*Verified 2026-11-23: `POST` without a payment header answers 402 + x402 v2 challenge, not 500; price read from the live catalog and OpenAPI.*
