# Wedding Website for Driss Benzekri and Nawal Sassi

Welcome to the source code repository for the wedding website of Driss Benzekri and Nawal Sassi. This website is a static, interactive platform designed to share key information about the couple's wedding, itineraries, traditions, and more. Built with Angular and deployed via GitHub Pages, the website aims to provide a seamless experience for invitees.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Future Enhancements](#future-enhancements)
5. [License](#license)

---

## Project Overview

This project is designed to celebrate the wedding of Driss Benzekri and Nawal Sassi. The site will serve as an interactive wedding invitation and a hub of information for the guests. It is optimized for mobile and desktop and showcases cultural and personal elements of the event.

---

## Features

1. **Main Page**
   - Wedding invitation with countdown to the ceremony.
   - Quick links to other pages.

2. **RSVP Page**
   - Automatic RSVP submissions.
   ![RSVP Submission Preview](/doc/RSVP.png)  

3. **Map**
   - Recommendations for restaurants, cafes, and attractions in Tunis.
   - Interactive map with pins marking important wedding-related locations:
      - Venue for the wedding ceremony.
      - Grandmother's house (location for the Henna ceremony).
      - Recommended accommodations for guests.
      - Key sightseeing spots near the wedding area.

4. **Songs**
   - List of classical Tunisian songs to learn.
   - Links to song lyrics and audio/video examples.

5. **Attendees**
   - Profiles of the bride, groom, family, and close friends.
   - Photos and videos celebrating their roles in the wedding.

6. **Media Showcase**
   - Photos and videos of the couple.
   - Slideshow or gallery.

---

## Project Structure

The project is organized as follows:

```
DrissAndNawal.github.io/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── main-page/         # Main page component
│   │   │   ├── map/               # Map of notable places component
│   │   │   ├── songs/             # Songs page component
│   │   │   ├── attendees/         # Attendee profiles page component
│   │   │   └── media/             # Media showcase component
│   │   ├── services/
│   │       └── data.service.ts    # Shared data service (Optional)
│   └── assets/
│       ├── images/                # Photos and media assets
│       └── songs/                 # Audio and lyric files
├── angular.json                   # Angular configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

---

## Future Enhancements

- Include a guestbook page for invitees to leave messages.
- Optimize the site for SEO and accessibility.
- Enhance the map with real-time navigation directions for guests.

---

## 📄 License  

This project is licensed under the [GNU General Public License](LICENSE).