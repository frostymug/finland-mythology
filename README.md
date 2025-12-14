# The Journey to Pohjola

A Family Mythology - An interactive web application exploring Finnish mythology through a family's personal journey.

## Description

This project is an interactive mythology map that tells the story of a family through the lens of Finnish mythology. Click on locations on the map to discover characters and their stories, each inspired by the Kalevala and other Finnish traditions.

## Features

- Interactive map interface
- Character profiles with detailed mythology
- Responsive design
- React Router for navigation

## Technologies

- React 18
- React Router DOM v7
- Vite
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/finland-mythology.git
cd finland-mythology
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
finland-mythology/
├── public/
│   ├── characters/     # Character portrait images
│   └── map-background.png
├── src/
│   ├── App.jsx         # Main app component with routing
│   ├── MythologyMap.jsx    # Interactive map component
│   ├── CharacterPage.jsx   # Individual character pages
│   ├── CharacterData.js    # Character data and helpers
│   └── main.jsx        # Entry point
└── package.json
```

## License

Private project - All rights reserved

