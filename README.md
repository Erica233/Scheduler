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

Course Scheduler is a web app where users can create and modify their course schedules and can export them into different forms.

At homepage, users can choose to import their local schedule by clicking the first blue button or create a new schedule by filling in the schedule name and choosing course year, semester (including fall, spring, summer term 1 and summer term 2), course level (including undergraduate level and graduate level) and class days for their course.

## Code Structure

The code is mainly divided into front-end (in the frontendApp folder) and back-end (in the backend folder).

### Frontend

In the front-end part, the [package.json](frontendApp/package.json) and [package-lock.json](frontendApp/package-lock.json) are config files. The main code is in the src folder.

In the src folder, there are several folders. All the components for web pages are in the components folder. Code to build two web pages is in the pages folder. Resources such as Duke logo are in the static folder.

### Backend

After receiving the information from frontend including year, semester, level, and days provided by user, our crawler will send HTTP request to access the corresponding duke semester calendar and parse its HTML page to get data we need. With the parsing result of requested semester including its start date, end date, and holidays, an array will be used to store a default table containing all the dates on which class will be held and it will be sent to the frontend. The figure below shows an example of data sent to frontend.
