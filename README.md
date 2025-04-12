# Gallop Arena - Interactive Horse Racing Game

Gallop Arena is an interactive horse racing game built with Vue 3, TypeScript, and Pinia. The game features dynamic horse racing simulations with animated horse movements and comprehensive race scheduling.

## 🎮 Game Features

- **Dynamic Horse Generation**: Randomly generates 1-20 unique horses with distinct colors and condition scores
- **Race Scheduling**: Creates a 6-round race schedule with varying track lengths
- **Interactive Racing**: Real-time animated horse movements during races
- **Results Tracking**: Detailed race results displayed after each round
- **Modern UI**: Clean and responsive user interface

## 🏁 Race Specifications

The game includes 6 rounds with the following track lengths:

- Round 1: 1200 meters
- Round 2: 1400 meters
- Round 3: 1600 meters
- Round 4: 1800 meters
- Round 5: 2000 meters
- Round 6: 2200 meters

Each round features 10 randomly selected horses from the available pool of 20 horses.

## 🛠️ Technical Stack

- **Frontend Framework**: Vue 3
- **Language**: TypeScript
- **State Management**: Pinia
- **Build Tool**: Vite
- **Testing**: Vitest (Unit Tests) + Cypress (E2E Tests)
- **Linting**: ESLint + Prettier
- **Package Manager**: Bun

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/gallop-arena.git
cd gallop-arena
```

2. Install dependencies:

```bash
bun install
```

### Development

Start the development server:

```bash
bun dev
```

### Building for Production

```bash
bun run build
```

## 🧪 Testing

### Unit Tests

```bash
bun test:unit
```

### End-to-End Tests

```bash
# Development mode
bun test:e2e:dev

# Production mode
bun test:e2e
```

## 📋 Code Quality

### Linting

```bash
bun lint
```

### Type Checking

```bash
bun run type-check
```

## 🏗️ Project Structure

```
gallop-arena/
├── src/              # Source files
├── cypress/          # E2E tests
├── public/           # Static assets
├── tests/            # Unit tests
└── vite.config.ts    # Vite configuration
```

## 📝 Code Style

- Follows SOLID principles
- Uses TypeScript (no `any` type)
- Implements BEM methodology for CSS
- Clean code practices
- Comprehensive unit and end-to-end tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- Erbil Nas
