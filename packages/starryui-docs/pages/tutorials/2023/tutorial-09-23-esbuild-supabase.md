The full source code for the project created in this tutorial is available on [GitHub](https://github.com/starryui/tutorial-2023-09-23-esbuild-supabase).

### Install Dependencies

Create a `package.json` file with [npm](https://www.npmjs.com/) and install [TypeScript](https://www.typescriptlang.org/), [Supabase](https://supabase.com/), and [StarryUI](https://starryui.com/).

```shell
mkdir my-project && cd ./my-project
npm init # fill out the prompts to create package.json
npm i --save typescript @types/node @starryui/theme @starryui/traits @starryui/theme-midnight
```

---

### Setup TypeScript

Add a script to `package.json` to build the app:

```typescript
{
 "scripts": {
  "build": "tsc index.ts"
 }
}
```

---

### Code

Create a file 'index.ts' in your project directory with the following content:

```ts

```

---

### Build and Run

Now it's time to build and run our app.

```shell
npm run build
node .
```

If there were no errors in any of the previous steps, you should now have a working application that you can visit at [http://localhost:8080](http://localhost:8080)

You made it to the end of the tutorial. Happy coding!
