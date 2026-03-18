# Invoice Generator

A modern, web-based invoice generator application built with React and TypeScript. Create professional invoices with an intuitive interface, real-time preview, and PDF export functionality.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Features

✨ **Core Features:**
- 📝 Create and edit professional invoices
- 👤 Manage client information
- 📦 Add multiple line items with descriptions and pricing
- 💰 Automatic calculations (subtotal, tax, total)
- 📋 Add notes and payment terms
- 👁️ Real-time invoice preview
- 📄 Export to PDF format
- � **Bilingual Support** (English & Indonesian)
- �🎨 Modern, responsive UI design
- ✅ Form validation and error handling
- 🔧 Toolbar with quick actions- 🏷️ **Multiple Billing Models**: Support for Hourly, Product, and Service billing types
## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository** (or navigate to the project directory):
```bash
cd invoice-generator
```

2. **Install dependencies:**
```bash
npm install
```

## Usage

### Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

Build the application for production:

```bash
npm run build
```

The optimized build will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## Billing Models

The invoice generator supports multiple billing types for flexibility in invoicing:

### Available Billing Types

1. **Hourly** (Jam Kerja)
   - Ideal for time-based services
   - Shows "Total Hours" summary
   - Use for tracking work hours on projects

2. **Product** (Barang)
   - Ideal for selling goods or merchandise
   - Shows "Total Products" summary
   - Use for physical items or inventory

3. **Service** (Layanan)
   - Ideal for service-based work
   - Shows "Total Services" summary
   - Use for service deliverables

### How to Use Different Billing Types

1. Click "Add Item" to add a new line item
2. Select the appropriate billing type from the dropdown (Hourly, Product, or Service)
3. Enter the description, quantity, and rate
4. The invoice summary will automatically show the correct totals based on item types
5. Items of different types can be mixed in a single invoice

### Smart Invoice Summary

- Invoices automatically display only the relevant totals based on item types used
- If using hourly items: "Total Hours" is displayed
- If using product items: "Total Products" is displayed
- If using service items: "Total Services" is displayed
- The system handles multi-type invoices intelligently

## Language Support

The application supports both **English** and **Indonesian** languages:

- **Language Switcher**: Located at the top of the application, click to toggle between English and Indonesian
- **Persistent Language**: Your language preference is saved in browser local storage
- **Full Translation**: All UI elements, invoice fields, validation messages, and buttons are translated
- **Invoice Format**: Invoices automatically adjust all text based on the selected language

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## Project Structure

```
invoice-generator/
├── src/
│   ├── components/           # Reusable UI components
│   │   └── ui/              # Shadcn UI components
│   ├── features/            # Feature-specific modules
│   │   └── invoice/         # Invoice feature
│   │       ├── components/  # Invoice-related components
│   │       ├── types.ts     # TypeScript type definitions
│   │       └── utils.ts     # Utility functions
│   ├── lib/                 # Utility libraries
│   ├── assets/              # Static assets
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static public files
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # This file
```

## Tech Stack

### Core Framework
- **React** (v19.2.4) - User interface library
- **TypeScript** (v5.9.3) - Static type checking
- **Vite** (v8.0.0) - Build tool and development server

### UI & Styling
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **Shadcn UI** - Headless UI components
- **Lucide React** - Icon library
- **Class Variance Authority** - Utility for managing CSS class variants

### Utilities
- **html2pdf.js** - PDF export functionality
- **clsx** - Conditional className utility
- **Tailwind Merge** - Merge Tailwind CSS classes intelligently

### Development Tools
- **ESLint** - Code quality and style enforcement
- **TypeScript ESLint** - TypeScript support for ESLint
- **AutoPrefixer** - CSS vendor prefix addition
- **PostCSS** - CSS processing tool

## Development Workflow

### Writing Components

Components are organized by feature. Follow the established patterns:

```typescript
// Example component structure
export default function ComponentName() {
  return (
    <div className="component-class">
      {/* Component content */}
    </div>
  );
}
```

### Type Safety

Make use of TypeScript type definitions in `src/features/invoice/types.ts` for invoice-related data structures.

### Styling

Use Tailwind CSS utility classes for styling. Component-specific styles can be added to corresponding CSS files.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Invoice Creating! 🎉**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
