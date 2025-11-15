# Running the Project

## Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn package manager

## Steps to Run

1. **Navigate to the web directory:**
   ```bash
   cd web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # OR if you prefer pnpm:
   # pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # OR if using pnpm:
   # pnpm dev
   ```

4. **Open your browser:**
   The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Troubleshooting

If Node.js is not found:
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Or use a version manager like nvm: `nvm install node`

If dependencies fail to install:
- Try deleting `node_modules` and `package-lock.json`/`pnpm-lock.yaml`
- Run `npm install` again

