* use SWR for data fetching (comes preinstalled as dependency w nextjs)
* JSON response format (https://google.github.io/styleguide/jsoncstyleguide.xml)
 - either contains a data or error key (if both, error takes precedence)

Ideas (TODO):
1) Redesign database: 
- section -> {...existing, order}
2) put resume reducer into context, so that commands can be sent from terminal.
(the terminal will probably only work for the current active resume).
(terminal cmds: open files, CRUD files, CRUD sections/items, save)

1) MUI skeleton for loading states.
2) MUI speed dial for toolbar.
3) Override ctrl+s -> saves file

4) try Lato font for file viewer

VSCODE fonts:
1) file system: size: 13px, line height: 22px, font: Segoe WP Semibold, fontweight: 600
Segoe UI: https://gist.github.com/AndrewCraswell/106143d1bb5d4162689b9e1d89a2d0fb

Screen size:
1) google docs -> default width = 816px;












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
