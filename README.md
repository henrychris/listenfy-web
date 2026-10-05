# Listenfy Web

A simple website for Listenfy.

## Getting Started

1. Install dependencies:

   ```
   bun install
   ```

2. Start the development server:

   ```
   bun run dev
   ```

3. Build for production:
   ```
   bun run build
   ```

## Environment Variables

- `PUBLIC_REDIRECT_URL`: Must match the URL configured on the Spotify developer app & the backend's environment variables
- `PUBLIC_DISCORD_CLIENT_ID`: This is the client ID of the Discord bot. It is used in the link on the homepage for users to install the bot in their servers.
