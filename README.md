<div align="center">
  <img src="https://user-images.githubusercontent.com/33373459/214206680-febe194f-c361-4847-a258-55980b3540c5.svg" width="100"/>
  <h2 align="center">Resume Builder</h2>
  <p align="center">
    <br />
    ➜ Maintain multiple versions of your resume 
    <br />
    ➜ Real time PDF previewer
    <br />
    ➜ Drag & drop reordering
    <br /><br />
    <a href="https://andrewzh.com/Bitcamp2022">Live Demo Link</a>
    
  </p>
</div>
<br />

<div align="center">
    <img src="https://user-images.githubusercontent.com/33373459/214163165-8eafcb8f-f40d-44cf-a221-4cbb0500774e.png" alt="App picture" width="1000px"/>
</div>

## 🎇 Inspiration:

Creating your resume is no easy task. Finding the perfect words to describe yourself and convey your experiences is already time consuming enough.
<br /><br />
<i>So why waste time struggling to figure out how to format a resume?</i>
<br />
Just bring your creativity, and the Resume Builder will take care of the rest.
<br />

## 📋 Features:

1. Create & maintain multiple resumes.
1. Preview your changes in real time using the PDF previewer.
1. Add headings, bullets, and bold/italic text using markdown-like syntax.
1. Experiment with different layouts using the drag-and-drop feature.
1. Make copies of your resumes to never lose your previous versions.

## 📚 Accomplishments / What I Learned:

### Markdown parser & lexer -
> <p>To implement features such as bold/italic text, bullet points, and headers, I wrote a custom markdown lexer & parser. The lexer takes in a string and converts the string into an array of predefined tokens.</p>
> <p>The tokens are passed to the parser, where they are converted into an abstract syntax tree (AST). To make this conversion, the parser relies on a set of predefined rules to determine how the AST should be structured. The AST contains all the information required for the PDF generator to create the properly formatted PDF document.</p>

&nbsp;[Lexer Code](utils/markdownParser/lexer.ts) | [Parser Code](utils/markdownParser/parser.ts)

```typescript
ex: "**Some** Text" => 
    [TOK_BOLD , TOK_STRING, "Some", TOK_BOLD, TOK_STRING, "Text"] =>
    AST: { 
        "head": {
            "text": "Some",
            "bold": true,
            "italic": false,
            "bullet": false,
            "heading": "none",
            "next": {
                "text": " Text",
                "bold": false,
                "italic": false,
                "bullet": false,
                "heading": "none",
                "next": null
            }
        }
    }
```
<img src="https://user-images.githubusercontent.com/33373459/214205193-8a013855-eec3-4e9b-8a73-599e887d4407.png" width="400"/>

### Custom pdf generator -
> <p>Building the pdf generator was one of the most challenging aspects of this project. jsPDF provides many tools to position text down to the pixel. However, this meant that many of the higher level features, such as line wrapping, text alignment, page margins, indentation, and line spacing, had to be coded from scratch.</p>

&nbsp;[PDF Generator Code](utils/pdfgen.ts)

### Authentication -
> <p>Using next-auth, I implemented signin using the google provider and stored the accounts on my MongoDB database. It is important to ensure user sessions are valid at all times to protect routes & prevent unauthorized access to API endpoints.</p>

### TypeScript -
> <p>One of my goals for this project was to learn many of the features TypeScript has to offer. I created custom types for my resume objects and for my API responses, among other things. This ensured uniformity accross my entire application, preventing incorrently structured data from being used.</p>
> <p>While working with different npm packages, I frequently examined their type declaration files to gain a deeper understanding of the packages I used. As a result, I was able to always write highly strictly typed code, instead of resorting to bad practices like using the any type.</p>

&nbsp;[My types file](/types.d.ts)
<br />

## 🤖 Tech Stack:

<table>
  <tr>
    <td> 
      <a href="https://nextjs.org/">
        <img src="https://skillicons.dev/icons?i=nextjs" height="40" width="40"/>
      </a>
    </td>
    <td>
      <a href="https://www.typescriptlang.org/">
        <img src="https://skillicons.dev/icons?i=ts" height="40" width="40"/>
      </a>
    </td>
  </tr>
</table>

&nbsp;&nbsp;&nbsp;Next.js + TypeScript
<br />

```
Database: MongoDB
Authentication: next-auth
API: Express.js / Vercel Serverless Functions
Data Fetching: SWR
PDF generator: jsPDF
Styling Library: MUI
```
<br />

## 💡 Future Ideas:

1. PDF generator/parser:

    - support multiple pages
    - links (`[text](http://a.com)`)
    - images (`![alt](cat.png)`)

1. Allow pdfs to be viewed on a public link

    - toggle resumes between public/private.
    - changes to resume auto pushed to live link (if public)

1. Add ctrl-z/ctrl-y, ctrl-shift-z -> include undo/redo buttons on toolbar

1. MUI skeleton for loading states.

1. Tutorial (some kind of app walk through)

1. Terminal:
    - put resume reducer into context, so that commands can be sent from terminal.<br />
      (the terminal will probably only work for the current active resume).<br />
      (terminal cmds: open files/preview, CRUD for files/headers/sections/etc., save)

## 🚀 Running the App:

### Prerequisites

1. NPM is required to run this project: [Useful Resource](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2. Vercel CLI (optional - used to host site on Vercel):

    ```sh
    npm i -g vercel
    ```

3. MongoDB database: [Useful Resource](https://www.mongodb.com/basics/create-database)
4. Google Cloud Platform project: [Useful Resource](https://developers.google.com/workspace/guides/create-project)

<br />

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/pillious/Resume-Builder.git
    ```
2. Install NPM packages

    ```sh
    cd Resume-Builder
    npm install
    ```

3. Add environmen variables to `.env` file

4. Run app locally

    ```sh
    npm run dev
    ```

5. View app on localhost:3000.
<hr />

### Deployment:

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

1. Check production build for errors

    ```sh
    npm run build
    npm start
    ```

2. Deploy to Vercel
    ```sh
    vercel
    vercel --prod
    ```
