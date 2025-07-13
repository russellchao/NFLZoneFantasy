# NFL Zone 🏈  
A dynamic Full-Stack web application that brings NFL fans an interactive experience for exploring players, teams, schedules, and making bold predictions for the upcoming season.

## 🌟 Live Demo (Coming Soon)
> _Currently running locally. Hosting and deployment in progress._

---

## 📌 Table of Contents
- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Future Roadmap](#future-roadmap)
- [Known Issues](#known-issues)
- [Credits](#credits)

---

## 📖 About the Project
NFL Zone is a Fullstack web application for NFL fans that:
- Scrapes and displays NFL player stats by team and position
- Tracks schedules, game outcomes, and team rosters
- Allows registered users to log hot takes, predict game outcomes, and more

---

## 🛠️ Tech Stack

| Layer        | Tech                                           |
|--------------|------------------------------------------------|
| **Frontend** | React.js                                       |
| **Backend**  | Spring Boot (Java), Flask (Python)             |
| **Database** | PostgreSQL                                     |

---

## ✨ Features

### 🔍 Player & Team Exploration
- [x] View player stats by team and by position
- [x] Search for players by name and filter by year
- [x] Dynamically update stats when switching seasons
- [x] Expandable player tables for large stat sets

### 📅 Schedule Viewer
- [x] View full NFL schedule for a selected season
- [x] Team-specific schedules
- [x] Matchup detail component showing:
  - Scoring summary
  - Player/team leaders
  - Box scores and drive summaries
- [x] Handles live, upcoming, and finished games
- [x] Visual cues for overtime games and start times

### 🧑‍💻 User Authentication
- [x] Registration with email verification
- [x] Login/logout state detection
- [x] Password recovery via email
- [x] Confirmation prompts before logging out

### 🧠 Hot Take Zone
- [x] Submit up to 10 measurable "hot takes" per user
- [x] Backend validator for redundant/contradictory takes
- [x] AI-powered NLP validation (initial version)
- [x] Takes disabled after regular season kickoff
- [x] Ability to delete or view submitted takes
- [x] 100-character limit enforcement

---

## 🔮 Future Roadmap
- [ ] Predict-the-Winner weekly game for logged-in users
- [ ] Mini Fantasy game with weekly player drafts
- [ ] Moneyless betting feature with a point system
- [ ] Favorite teams and player tracking
- [ ] Discussion forum 
