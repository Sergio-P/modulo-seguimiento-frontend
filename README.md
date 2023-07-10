## Table of Contents

- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Learn More](#learn-more)
- [Contributing](#contributing)

## Getting Started

Follow these steps to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js `v18.15.0` installed on your local machine. If not, you can download it from [nodejs.org](https://nodejs.org/).

### Installation

Install the dependencies

```bash
npm install
```

Create Environment Variables on root inside file named `.env.local`:
- `BACKEND_HOST`: Hostname for backend service e.g: BACKEND_HOST=http://localhost
- `BACKEND_PORT`: Port for backend service e.g: BACKED_PORT=8000
- `FRONTEND_DOMAIN`: Domain for frontend deployment e.g: FRONTEND_DOMAIN=localhost
- `FRONTEND_PORT`: Port for frontend deployment e.g: FRONTEND_PORT=3000

#### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Run the production server:

First, you have to build your application. This will create an optimized version of your app, and it only needs to be done once. Run this command in your terminal:

```bash
npm run build
```

This command will generate a .next folder which contains the optimized build output.
After building the app, you can start the server in production mode with this command:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Directory Structure

The project adheres Next directory structure for optimal organization and ease of access.

- `pages` - This directory contains all pages that can be accessible from the project.
- `icons` - This directory contains all SVG files used for icons on the page.
- `api` - This directory contains all the function calls to connect with the backend.
- `components/ui` - This directory is for generic components on the page.
- `cases` - This directory is for non-generic components on the page.
- `types` - This directory contains the interfaces and enums for all types of inputs and outputs.
- `tailwind.config.js` - This file defines all extra modules used on the stylization of the page.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
