# TODO:
- give files a constant color in the file viewer.

- change toolbox to a toolbar across the top of the resume editor (think about mobile design) ✔
- drop and drop ordering ✔
- bug: file viewer not updating after renaming. ✔
- redesign database: section/exps have order ✔
- override ctrl+s -> saves file ✔
- resume tools in a toolbar (changed to toolbar) ✔
- some kind of icon to show the file is not saved (are you sure you want to leave prompt?) ✔
- authentication (navbar - unauthed login/register - register just goes to the login page) ✔
- simple markdown parser ✔
- build the preview ✔
- generate pdf (generation step: convert markdown like text to pdf) ✔
    - markdown support: 
    1) bold (text enclosed in **)
    1) italic (text enclosed in _)
    1) headers (starts w/ # ... ######)
    1) bullet (starts w/ *)
- DARK THEME ✔
- Help menu ✔
- Error pages ✔
- Custom logo ✔

maybe:
1) support multiple pages
1) links (`[text](http://a.com)`)
1) images (`![alt](cat.png)`)

Ideas (future):
1) Allow pdfs to be viewed on a public link
- toggle resumes between public/private.
- changes to resume auto pushed to live link (if public)

1) Add ctrl-z/ctrl-y, ctrl-shift-z -> include undo/redo buttons on toolbar

1) Terminal:
- put resume reducer into context, so that commands can be sent from terminal.
(the terminal will probably only work for the current active resume).
(terminal cmds: open files, CRUD files, CRUD sections/items, save)

1)  MUI skeleton for loading states.

1) Tutorial (some kind of app walk through)

1)  try Lato font for file viewer
- create a mui theme (dark mode & fonts).
- navbar uses monospace font.
Segoe UI: https://gist.github.com/AndrewCraswell/106143d1bb5d4162689b9e1d89a2d0fb

-----------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.