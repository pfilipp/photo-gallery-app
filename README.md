# Photo Gallery App

A modern, beautiful photo gallery application built with Electron, React 19, TypeScript 5, and Tailwind CSS 4.

![Photo Gallery Preview](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop)

## ✨ Features

- **Modern Stack**: Built with React 19, TypeScript 5, and Tailwind CSS 4
- **Beautiful UI**: Clean, dark-themed interface with smooth animations
- **Keyboard Navigation**: Use arrow keys (←/→) to navigate between photos
- **Photo Metadata**: Display title, location, date, and inspirational quotes
- **Thumbnail Navigation**: Click thumbnails to jump to any photo
- **Responsive Design**: Optimized for different screen sizes
- **Cross-Platform**: Runs on Windows, macOS, and Linux

## 🚀 Quick Start

### Prerequisites

- [Node.js 20+](https://nodejs.org/en/download/)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pfilipp/photo-gallery-app.git
cd photo-gallery-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
photo-gallery-app/
├── src/
│   ├── renderer/                 # React frontend
│   │   ├── components/          # React components
│   │   │   └── PhotoGallery.tsx # Main gallery component
│   │   └── screens/             # Screen components
│   ├── main/                    # Electron main process
│   ├── preload/                 # Electron preload scripts
│   ├── resources/               # Static assets
│   │   └── public/              # Public files
│   │       ├── photos/          # Photo files
│   │       └── photos-metadata.json # Photo metadata
│   └── shared/                  # Shared types and utilities
├── package.json
└── README.md
```

## 📸 Adding Your Own Photos

1. Add your photo files to `src/resources/public/photos/`

2. Update the metadata in `src/resources/public/photos-metadata.json`:

```json
[
  {
    "filename": "your-photo.jpg",
    "title": "Your Photo Title",
    "place": "Location Name",
    "date": "2024-01-01",
    "quote": "Your inspirational quote here"
  }
]
```

3. The app will automatically load your photos on restart!

## 🛠️ Development Scripts

- `npm run dev` - Start development mode with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run code linting
- `npm run lint:fix` - Fix linting issues automatically

## 🏗️ Building for Production

To create distributable packages:

```bash
npm run build
```

This will create platform-specific installers in the `dist` folder.

## 🎨 Customization

### Themes
The app uses Tailwind CSS for styling. You can customize colors, spacing, and other design tokens in the Tailwind configuration.

### Adding Features
- Image editing capabilities
- Slideshow mode
- Photo organization/albums
- EXIF data display
- Fullscreen mode

## 🧰 Tech Stack

- **Frontend**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Desktop**: Electron 34
- **Build Tool**: Vite 6, Electron Vite
- **Icons**: Lucide React
- **Package Manager**: npm

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Photo samples from [Unsplash](https://unsplash.com)
- Built with [daltonmenezes/electron-app](https://github.com/daltonmenezes/electron-app) boilerplate
- Icons by [Lucide](https://lucide.dev)

---

**Happy photo viewing! 📷✨**
