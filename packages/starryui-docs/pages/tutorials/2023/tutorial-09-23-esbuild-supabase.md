The full source code for the project created in this tutorial is available on [GitHub](https://github.com/starryui/tutorial-2023-09-23-esbuild-supabase).

### Install Dependencies

Create a `package.json` file with [npm](https://www.npmjs.com/) and install [TypeScript](https://www.typescriptlang.org/), [Supabase](https://supabase.com/), and [StarryUI](https://starryui.com/).

```shell
mkdir my-project && cd ./my-project
npm init # fill out the prompts to create package.json
npm i --save typescript @starryui/layout @starryui/theme @starryui/traits @starryui/theme-midnight
npm i --save-dev esbuild
```

---

### Setup TypeScript

Add a script to `package.json` to compile and serve the app:

```typescript
{
 "scripts": {
  "start": "esbuild index.ts --bundle --outfile=dist/main.js --servedir=. --serve=8080"
 }
}
```

`index.ts` runs in the browser. esbuild only compiles that file, bundles the StarryUI packages into `dist/main.js`, and serves the files in this directory. It does not run the app in Node.

---

### Page

Create `index.html` in your project directory. The browser loads the bundle from this page:

```html
<!DOCTYPE html>
<head>
 <title>My Project</title>
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <style>
  body {
   background-color: #232327;
  }
 </style>
</head>
<body>
 <script src="/dist/main.js"></script>
</body>
```

---

### Code

Create a file 'index.ts' in your project directory with the following content:

```ts
import { StarryUITheme, applyTheme } from '@starryui/theme'
import { column } from '@starryui/layout'
import { themeMidnight } from '@starryui/theme-midnight'
import { withTextContent } from '@starryui/traits'

const theme: StarryUITheme = themeMidnight

const mainArea = applyTheme(theme, column).add(withTextContent('Hello world'))()

document.body.appendChild(mainArea)
```

---

### Build and Run

Now it's time to serve the app.

```shell
npm start
```

If there were no errors in any of the previous steps, you should now have a working application that you can visit at [http://localhost:8080](http://localhost:8080)

You made it to the end of the tutorial. Happy coding!
