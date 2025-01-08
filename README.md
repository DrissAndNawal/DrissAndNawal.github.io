# Wedding Website for Driss Benzekri and Nawal Sassi

Welcome to the source code repository for the wedding website of Driss Benzekri and Nawal Sassi. This website is a static, interactive platform designed to share key information about the couple's wedding, itineraries, traditions, and more. Built with Angular and deployed via GitHub Pages, the website aims to provide a seamless experience for invitees.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Future Enhancements](#future-enhancements)

---

## Project Overview

This project is designed to celebrate the wedding of Driss Benzekri and Nawal Sassi. The site will serve as an interactive wedding invitation and a hub of information for the guests. It is optimized for mobile and desktop and showcases cultural and personal elements of the event.

---

## Features

1. **Main Page**
   - Wedding invitation with details about the ceremony.
   - Brief introduction to the couple.
   - Quick links to other pages.

2. **Itineraries**
   - Recommendations for restaurants, cafes, and attractions in Tunis.
   - Interactive map or clickable links to locations.

3. **Map of Notable Places**
   - Interactive map with pins marking important wedding-related locations:
     - Venue for the wedding ceremony.
     - Grandmother's house (location for the Henna ceremony).
     - Recommended accommodations for guests.
     - Key sightseeing spots near the wedding area.

4. **Songs**
   - List of classical Tunisian songs to learn.
   - Links to song lyrics and audio/video examples.

5. **Main Actors**
   - Profiles of the bride, groom, family, and close friends.
   - Photos and videos celebrating their roles in the wedding.

6. **Media Showcase**
   - Edited photos and videos of the couple.
   - Slideshow or gallery format for user engagement.

---

## Project Structure

The project is organized as follows:

```
wedding-website/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── main-page/         # Main page component
│   │   │   ├── itineraries/       # Itineraries page component
│   │   │   ├── map/               # Map of notable places component
│   │   │   ├── songs/             # Songs page component
│   │   │   ├── actors/            # Main actors page component
│   │   │   └── media-showcase/    # Media showcase component
│   │   ├── services/
│   │   │   └── data.service.ts    # Shared data service
│   │   └── app-routing.module.ts  # Routing for navigation
│   └── assets/
│       ├── images/                # Photos and media assets
│       └── songs/                 # Audio and lyric files
├── angular.json                   # Angular configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## Future Enhancements

- Add animations and transitions for a more interactive experience.
- Include a guestbook page for invitees to leave messages.
- Optimize the site for SEO and accessibility.
- Integrate a live countdown to the wedding day.
- Enhance the map with real-time navigation directions for guests.

---

We hope this website makes the wedding experience even more special for Driss and Nawal!