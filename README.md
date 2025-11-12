# Smart Loan Processing System (SLPS) Demo

A Vite + React webapp that maps Agile PBIs (Epics → User Stories → Tasks) onto interactive product features auto-aligned to the Project Charter PRD.

- Each Epic = a route/page
- Each User Story = an interactive UI/logic component
- Each Task = working, user-visible logic (form, API simulation, dashboard, notification, etc)
- All navigation/pages/components are dynamic from `src/data/epics.json`
- PRD-alignment and acceptance-criteria validation are automatic

---

## Quickstart

npm install
npm run dev

Open [http://localhost:5173](http://localhost:5173)

Edit `src/data/epics.json` or `src/data/prd.txt` to live-update scope/features.

---

Built for demo/prototype purposes only.