# Epics PRD-Aligned App

A Vite + React webapp that dynamically generates routes/pages, features, and interactivity based on Epics, User Stories, and Tasks JSON, with full mapping to PRD objectives.

- Each Epic = a page/route
- Each User Story = a dynamic feature component
- Each Task = real input/logic/visual UI
- All schema/content updates automatically from `src/data/epics.json`
- PRD alignment & guardrail self-validation

## Quickstart

npm install
npm run dev

Open http://localhost:5173

Edit `src/data/epics.json` or `src/data/prd.txt` to change app scope and content.

---

Built with [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)