# Centro de Juegos Educativos - UNPAZ

## Overview

This is a web-based educational game center featuring three different games: Sports Trivia (Jeopardy-style), Nutritional Roulette, and Physical Education Quiz. It's designed for competitive learning between two teams/players across different educational topics. The application is built as a single-page application using vanilla HTML, CSS, and JavaScript, making it lightweight and easy to deploy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built using vanilla HTML, CSS, and JavaScript without any frameworks
- **Screen-based Navigation**: Uses CSS classes to show/hide different game screens (initial setup, game board, question screens)
- **Component Structure**: Modular approach with distinct screens for team setup, game board, and question display
- **Responsive Design**: CSS includes viewport meta tag and flexible layouts for different screen sizes

### Game Logic Architecture
- **State Management**: Centralized game state object tracking teams, scores, current turn, and progress
- **Question Database**: Structured object containing questions organized by categories and point values
- **Turn-based System**: Implements alternating team turns with score tracking
- **Multi-Game System**: Three different game types with unique mechanics and educational focuses

### Data Structure
- **Questions Object**: Multiple JSON files containing different question structures for each game type
- **Game State**: Multiple state objects for different games (gameState, rouletteGameState, quizGameState)
- **Dynamic Content**: Team names, scores, and game-specific information dynamically updated in the DOM

### User Interface Design
- **Multiple Game Interfaces**: 
  - Jeopardy-style board for Sports Trivia
  - Spinning roulette wheel for Nutritional Game
  - Multiple choice interface for Physical Education Quiz
- **Real-time Scoreboard**: Persistent score display with team names and current turn indicator
- **Progressive Disclosure**: Questions revealed through different mechanics per game
- **Visual Feedback**: CSS animations, transitions, and color-coded visual elements

## External Dependencies

### Core Technologies
- **HTML5**: Semantic markup with modern web standards
- **CSS3**: Advanced styling with gradients, animations, and flexbox layouts
- **Vanilla JavaScript**: No external JavaScript libraries or frameworks

### Browser Requirements
- **Modern Web Browser**: Requires support for ES6+ JavaScript features
- **CSS3 Support**: Needs modern CSS features like flexbox and CSS animations
- **Local Storage**: May utilize browser storage for game state persistence

### Assets and Resources
- **No External APIs**: All questions and game data are stored in local JSON files
- **Self-contained**: No external fonts, images, or CDN dependencies  
- **Offline Capable**: Can run entirely offline once loaded
- **Multiple Question Databases**: Separate JSON files for each game type

### Deployment Requirements
- **Static Hosting**: Can be deployed on any static web server
- **No Backend**: Purely client-side application with no server requirements
- **Cross-platform**: Compatible with desktop and mobile browsers

## Game Types

### 1. Trivia Deportiva (Sports Trivia)
- **Format**: Jeopardy-style board with 4 categories and 5 point values
- **Mechanics**: Turn-based selection, 20 questions total
- **Categories**: Team Sports, Individual Sports, Olympics, Sports Equipment
- **Scoring**: Point values from 200-1000 based on difficulty

### 2. Ruleta Nutricional (Nutritional Roulette)
- **Format**: Spinning wheel with 10 nutritional categories
- **Mechanics**: 6 rounds total, 3 questions per player
- **Categories**: 10 nutritional topics with color-coded visual system
- **Scoring**: 1 point per correct answer

### 3. Quiz de Educación Física (Physical Education Quiz)
- **Format**: Multiple choice questions (A, B, C, D)
- **Mechanics**: Individual gameplay, 6 questions total (3 per player)
- **Categories**: Health & Physical Activity, Sports Rules, Sports History
- **Scoring**: 1 point per correct answer
- **Level**: University/Professional level questions

## Recent Changes (August 2025)

- Added game selection screen with three game options
- Implemented Nutritional Roulette with spinning wheel mechanic
- Created Physical Education Quiz with multiple choice format
- Updated architecture to support multiple game types
- Added category selection for Physical Education Quiz
- Enhanced visual design with game-specific interfaces

## File Structure

- **index.html**: Main HTML with all game screens and modals
- **style.css**: Complete styling including responsive design and animations
- **script.js**: Game logic with state management for all three games
- **preguntas.json**: Sports trivia questions (4 categories, 25 questions each)
- **preguntas-nutricionales.json**: Nutritional questions (10 categories, 10 questions each)
- **preguntas-educacion-fisica.json**: Physical education questions (3 categories, 15 questions each)
- **replit.md**: Project documentation and architecture notes