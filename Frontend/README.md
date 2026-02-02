# AllLinks Frontend

A responsive **Link-sharing platform frontend**. This frontend allows users to view and manage personalized profiles, interact with links, and connect with the backend for authentication and data management.

## Features

- Dynamic user pages: `/[handle]` for each user's profile.
- Secure authentication handled via a custom backend.
- Add, links in user profiles.
- Responsive UI for desktop, tablet, and mobile devices.


## Tech Stack

- **Frontend Framework:** Next.js 15.4.4 (App Router)
- **Styling:** Tailwind CSS 4.1
- **Language:** JavaScript (ES6+)
- **API Requests:** Fetch API / Axios (to backend)


## Project Structure

``` 
frontend/
│
├─ /app/                         # Next.js App Router pages
│   ├─ /[handle]/page.js         # Dynamic user pages
|   ├─ /generate/page.js         # Page to generate link for user Loged in. 
│   ├─ /login/page.js            # Page responsible for ui of Login and Signup of User. 
|   ├─ /globals.css              # Common CSS page for Whole page.
│   ├─ /layout.js                # Main Page to Load Front-end.
|   └─ /page.js                  # Home page of website.
|
|─ /components                   # Reusable components (Navbar, Dropdown, Button, Footer).
├─ /store                        # Client-side state management (auth store)
├─ /public                       # Static assets (images, icons)
└─ next.config.js                # Next.js configuration
```


## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/codeArray-go/AllLink-f.git
cd frontend
```

2. Install dependencies:
```bash
npm install or npm i
```

3. Creating environmental variable:
``` bash
mkdir .env.local
```
inside .env.local file add 
NEXT_PUBLIC_BACKEND_URL=<your-backend-url>

4. Run development server:
``` bash
npm run dev
```
If you are using it on your machine then your url will be:- http://localhost:3000


## API Integration

- All data operations (login, signup, profile update, link CRUD) are handled by the backend.
- The frontend communicates via REST API endpoints exposed by the backend.


## Responsive Design

- Fully responsive layout for mobile, tablet, and desktop.
- Components automatically adjust using Tailwind CSS utilities.
- Certain buttons or elements adapt to screen width (e.g., hiding logout on small screens).

