# Simon's Challenge

Simon’s Challenge is a memory-based game built using vanilla JavaScript, HTML, and CSS.  
The game challenges players to remember and repeat color sequences that grow progressively harder with each round.
Players can choose between Easy, Medium, and Hard difficulty levels, each offering a unique gameplay experience.

## Live Demo
👉  https://thrisha-burra23.github.io/Simons-Challenge-game/

## GamePlay Overview
1. Choose a difficulty level (Easy / Medium / Hard)
2. Click **Start** to begin the game
3. Watch the color sequence carefully
4. Repeat the sequence by clicking the pads in the correct order
5. Each successful round increases your score and level
6. One wrong move ends the game

## Difficulty Levels

### Easy
- One color added per round
- Slower speed
- Fixed pad positions

### Medium
- Two colors added per round
- Faster sequence playback than easy
- Fixed pad positions

### Hard Level
- One color added per round
- Faster sequence playback
- Pad positions change every time

## Features
- Dynamic DOM-based UI (no hardcoded game layout)
- Three difficulty levels with unique logic
- Real-time score and level tracking
- Visual feedback 
- Reset and back navigation
- Responsive design for small screens
- Built using pure JavaScript (no libraries)

## Tech Stack
- HTML5
- CSS3
- JavaScript (Es6)

##  Project Structure

```bash
.
├── index.html
├── styles.css
├── app.js
├── favicon.png
└── README.md
```
## How to run the project
1. Clone the repository:git clone https://github.com/thrisha-burra23/Simons-Challenge-game.git
2. Open the project folder
3. Open index.html in your browser
No installations or dependencies required

## Concepts Used
- DOM Manipulation
- Event Handling
- Game State MAnagement
- Arrays and Sequences
- Timers(SetTimeout)
- Conditional Logic
- CSS Grid
- Responsive Styling

## Future Improvements
- Sound Effects for each color
- Timer based challenge Mode

## Acknowledgements
Inspired by the classic Simon Says game.
