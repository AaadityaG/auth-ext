# Auth Extension

A React-based browser extension for authentication management.

## Setup Instructions

### Prerequisites
- Node.js 20.19+ or 22.12+

### Local Development

1. Clone the repo and Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` (if exists) or create a new `.env` file
   - Configure the environment instance:
     - For development: `VITE_INSTANCE=DEV`
     - For production: `VITE_INSTANCE=PROD`

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Extension

1. Build the project:
   ```bash
   npm run build
   ```

2. The build files will be generated in the `dist/` folder

3. Load the extension in your browser:
   - Open your browser's extension management page (e.g., `chrome://extensions` for Chrome)
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist/` folder from this project

### Environment Configuration

The project supports two environment instances:
- `DEV`: For development and testing
- `PROD`: For production deployment

Set the instance type in your `.env` file:
```
VITE_INSTANCE=DEV
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint the code

