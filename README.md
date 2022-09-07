## Testing Deployment

1. for the front end
```
cd frontendApp
npm install
cd ..
```

2. for the back end, install dependencies
```
cd backend
npm install
cd ..
```

3. launch the server
```
cd frontendApp
npm start
cd ../backend
npm start
```

## Code Structure

The code is mainly divided into front-end (in the frontendApp folder) and back-end (in the backend folder).

In the front-end part, the [package.json](frontendApp/package.json) and [package-lock.json](frontendApp/package-lock.json) are config files. The main code is in the src folder.

In the src folder, there are several folders. All the components for web pages are in the components folder. Code to build two web pages is in the pages folder. Resources such as Duke logo are in the static folder.