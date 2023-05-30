# frontend-test-code

## Test task 1
- Maing page with the test input field that validates numbers
- Validations are basically defined by `numbers.test.ts`

## Test task 2
- `util` folder contains `pooledMap` which have files for test task 2
- `npm run test` will run all the tests with Jest including those for pooled map
- the pooled map functionality is not used in React app
- `pooledMapLibrary` has implementation with `@supercharge/promise-pool` - essentially existing library for the test task :D
- my custom implementation is inside `pooledMapCustom`, it uses `PromisePool` & `ResultProcessor` utility classes

## Scripts
- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Production :)

- [Deployed to Netlify](https://ornate-alpaca-e3154d.netlify.app/)
