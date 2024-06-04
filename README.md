# iTune Search API

Create web App where user can search the album from artist name using iTune search API.
Task need to do.
1.	Create an Express.js app that accomplishes the following:
2.	Connects to the iTunes Search API: https://tinyurl.com/itunes-search-api 
3.	Pulls back a list of albums for a specified artist
4.	Filters the results so there are no duplicate albums (based on album name)
5.	Serves the filtered results to the front-end via a route
6.	Create a Vue.js app that accomplishes the following:
7.	Makes an API request to the above route to fetch the albums 
8.	Displays the albums (as thumbnail & title) in a grid
9.	Has a live search box to filter (on client-side) the currently displayed albums
10.	Create unit tests as appropriate, with the testing framework of your choice.


# Short Description
Allow User to search artist name from iTune search api, after getting unique artist (`unique by artistId`) then user can click and see all the albums of selected artist.
The technologies which we used in this project.
 * Vuejs for frontend
 * Nodjs for backend.
 * Jest for nodejs testing.
 * Vitest for vuejs testing.
 * axios for call API.

Some packages which used in project to help in dev.
 * express for server.
 * nodemon for dev.
 * typescript for oop & strongly typed attribute.

# Get Started
If you want to use API of this project on your APP or web. you can easily use it.
but before going to use API you need to install node packages on both directory `frontend` & `backend`.

run `cd frontend && npm install`. The API will run on `8080` port;
run `cd backend && npm install`. The vue will run on `5173` port;

 ## Run Project
After run above command, your project is ready to run, use this command to run `npm run dev` on both `frontend` & `backend`.

## Run Test
After project run successfuly, you can test UAT, use this command to run `npm run test` for `backend` & run `npm run test:unit` for `frontend`.

# New Idea
For reducing the load on itune search api, we can use cache before calling itune api. The workflow would be first search user `query` in cache, if found then return response otherwise call itune api and save in cache for future use and return response to user.
For this I would suggest `radis` or `aws opensearch/elastic search`.
