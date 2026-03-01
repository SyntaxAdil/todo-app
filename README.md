# To-Do App ✅

A clean and responsive Todo application built with **React** and styled with **DaisyUI + Tailwind CSS**.

---

## Features

- ➕ Add new todos with button click or `Enter` key
- ✏️ Inline edit todos with auto-focus
- ✅ Mark todos as complete with a checkbox
- 🗑️ Delete todos
- 💾 Persistent storage via `localStorage` — todos survive page refresh
- 🕐 Timestamps — shows "Created on" and "Edited on" dates
- 🔽 Scroll button appears when todos overflow, hides near top/bottom

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| React | UI & state management |
| Tailwind CSS | Styling |
| DaisyUI | Component classes |
| Lucide React | Icons |
| localStorage | Data persistence |

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/todo-app.git

# Navigate into the project
cd todo-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Project Structure

```
src/
├── components/
│   └── Wrapper.jsx       # Layout wrapper component
├── pages/
│   └── Todo.jsx          # Main Todo component
└── main.jsx
```

---

## How It Works

### State
| State | Purpose |
|-------|---------|
| `todos` | List of all todo items |
| `inputTodo` | Controlled input value |
| `editTodo` | ID of the todo currently being edited |
| `showScroll` | Controls visibility of the scroll button |

### Refs
| Ref | Purpose |
|-----|---------|
| `inputRef` | Auto-focuses the main input on mount |
| `taskItemsRef` | Map of todo input refs — used to focus on edit |
| `container` | Ref to the scrollable todo list container |

---

## Known Limitations

- No drag-and-drop reordering
- No due dates or priority levels
- No categories or filtering

---

## License

&copy; All rights reserved. **Abdur Rahman Adil**