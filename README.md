# Task Tracker

A simple, dependency-free to-do list application built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just open `index.html` in a browser and it works.

[Live Demo](https://felixjackquinkwokkenzi.github.io/Task-Tracker/)

## Features

- Add, edit, and delete tasks
- Mark tasks as complete / incomplete
- Filter tasks by **All**, **Active**, or **Completed**
- Live counter showing the number of active tasks
- Clear all completed tasks in one click
- Data persists across page reloads via `localStorage`
- Empty-state messaging when a list/filter has no matching tasks
- Accessible markup: labeled controls, visible keyboard focus, and respect for reduced-motion preferences
- Responsive layout, from mobile (360px) to desktop

## Tech Stack

| Layer    | Technology                          |
|----------|--------------------------------------|
| Markup   | Semantic HTML5                      |
| Styling  | Plain CSS3 with custom properties   |
| Logic    | Vanilla JavaScript (ES6+)           |
| Storage  | Browser `localStorage`              |
| Font     | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |

No external libraries or frameworks are used.

## Project Structure

```
todolist-app/
├── index.html        # App markup
├── css/
│   └── style.css     # Design tokens, layout, and component styles
├── js/
│   └── script.js      # State management, rendering, and event handling
└── README.md
```

## Getting Started

No installation or build step is required.

1. Download or clone this folder.
2. Open `index.html` directly in any modern browser (Chrome, Edge, or Firefox).

That's it — the app runs entirely client-side.

## How It Works

Tasks are stored in memory as an array of objects, and persisted to `localStorage` under the key `"todos"`. Each task follows this shape:

```js
{
  id: "1718000000000",     // unique identifier, generated from a timestamp
  text: "Learn CSS Grid",  // task description
  completed: false,        // completion state
  createdAt: 1718000000000 // creation timestamp
}
```

The UI re-renders from this array on every change (add, toggle, delete, edit, filter, or clear), so the array is always the single source of truth.

### Interactions

| Action                  | How to trigger it                          |
|--------------------------|---------------------------------------------|
| Add a task               | Type in the input field and press Enter / click **Add** |
| Mark complete/incomplete | Click the checkbox next to a task           |
| Edit a task               | Double-click the task text, edit, then press Enter or click outside to save (Escape cancels) |
| Delete a task             | Click the **✕** button on the task          |
| Filter tasks              | Click **All**, **Active**, or **Completed** |
| Clear completed tasks     | Click **Clear completed** in the footer     |

## Browser Support

Tested on the latest versions of Chrome, Edge, and Firefox. The app relies only on standard, widely supported Web APIs (`localStorage`, CSS custom properties, `prefers-reduced-motion`), so it should work in any modern browser.

## License

This project was built for personal learning purposes and is free to use, modify, or extend.

## 🧑‍💻 Author

- **Felix Jackquin Kwok Kenzi** - [GitHub Profile](https://github.com/felixjackquinkwokkenzi)