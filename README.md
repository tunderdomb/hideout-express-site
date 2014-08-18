gulp test
====

## Running in development mode

    gulp

The default gulp task involves:

- starting a livereload server
- running `app.js` via nodemon with the `--debug` flag
- opening the index of the app in the browser.
- watching resource file changes
- continuously rebuilding the application and refreshing the browser

### Debugging

By default the `--debug` flag will run the debugger on port 5858.
You can bind to it using your ide for instance.