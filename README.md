# cloudflared-nodejs

Runs a Cloudflare Tunnel from Node.js using a token stored in `.env`.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `CLOUDFLARE_TUNNEL_TOKEN`.
3. `npm start`

The cloudflared binary is downloaded automatically on first run. Press Ctrl+C to stop the tunnel.
