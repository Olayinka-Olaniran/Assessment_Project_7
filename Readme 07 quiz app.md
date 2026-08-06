# Quiz App

**Live Demo:** https://olayinka-olaniran.github.io/Assessment_Project_7/
**Repository:** https://github.com/Olayinka-Olaniran/Assessment_Project_7

A category-based, timed multiple-choice quiz app with question navigation and instant scoring, built from a fully data-driven question bank.

## Overview

This project (Weekly Assessment 7) presents a quiz with a category picker (HTML, CSS, JavaScript), each with its own question set and time allowance. Questions, choices, and per-answer feedback messages all live in a separate data module (`quizData.js`), so the quiz engine itself contains no hardcoded question content — new categories or questions can be added purely by editing that file.

## Features

- Category selection (HTML / CSS / JavaScript), each with an independent question set and timer
- Countdown timer with auto-submit when time runs out
- Question-by-question navigation (Prev / Next, plus jump-to-question buttons)
- Instant per-question feedback (correct/incorrect messages) shown via an alert dialog
- Results view with score summary after finishing
- Open Graph meta tags configured for clean link previews when shared (title, description, and a custom `og-image.png`)

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (data-driven rendering from a separate quiz data module)

## Project Structure

```
Assessment_Project_7/
├── index.html               # Instructions screen, quiz UI, results dialog
├── WeeklyAssessment7.js      # Quiz engine: timer, navigation, scoring
├── quizData.js               # All categories, questions, choices, and feedback text
├── WeeklyAssessment7.css     # Styling
└── og-image.png               # Social share preview image
```

## How to Run

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally
npx serve .
```

Select a category, click **Start Quiz**, and answer within the time limit.

## Adding Questions

To add or edit quiz content, edit `quizData.js` directly — follow the existing structure for a category (a `label`, a `timerInMs`, and a `questions` array with `id`, `question`, `options`, `correctMsg`, and `incorrectMsg`). No changes to the quiz engine are needed.
