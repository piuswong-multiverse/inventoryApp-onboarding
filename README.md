# inventoryApp-onboarding
For testing, learning, etc.  See project: https://app.codingrooms.com/app/course/bootcamp-part-2-_UhUFa6/b/tiers-uhoR2sU

## Notes on this code as of September 2022

1. Running this locally: Clone this repo, install dependencies: ``npm install``
2. Seed the database with ``node models/populateDb``
3. Test with ``jest`` -- but these are not very comprehensive yet; back-end POST endpoints still TODO
4. By default Front-end runs on port 3000, backend on 3001; API calls via proxy server in dev environment
5. Still to do:  
    * Tier 5 bonus tasks 
        * users, orders, 
        * visually stunning, 
        * cart for purchase, 
        * mobile responsiveness, 
        * admin and authentication-based privileges, 
        * server-side validation for add/edit functions 
    * deployment options, 
    * dynamic handling of unlimited categories (tags), 
    * filter/display items by category, price, type, etc
    * web accessibility,
    * image file handling instead of links

## Tiers of Functionality

### Tier 1 (MVP): 
1. User can view all items in warehouse inventory
    * Sequelize model for item
        * Name, descr, price, category, image
    * Express route to GET all items
    * Front-end VIEW for all items
    * User views any individual item
2. Express Route to GET one item
    * Front-end view for one item

### Tier 2: Adding an item
1. Add Item front-end form
2. Express Route to ADD the Item
3. Form or Fetch request to add item when form is submitted

### Tier 3: Deleting an Item
1. Delete button on Single Item View
2. Express Route to DELETE the Item
3. Fetch request to delete item when button is clicked

### Tier 4: Updating an Item (patch)
1. Edit form on Single Item View
2. Express Route to UPDATE the Item
3. Fetch request to update item when form is submitted

## Steps to Develop the Project
0. Set up repo, gitignore; plan development over branches; Document notes in Readme
1. Set up node/npm, nodemon, sequelize, sqlite3, jest with
    * ``npm install nodemon sequelize sqlite3 jest express``
2. Set up sequelize, sqlite3, database
3. Install VSCode extension to view SQLite databases for easier debugging
4. Set up Jest
5. Test display of one item view simple Express view
    * Placeholder images work, e.g. https://placeholder.com/
6. Test full database with Jest
7. Seed database with starting data
    * Extra: Random data generator used to help generate lots of data: https://json-generator.com/
8. Create database model associations, seed the associations, and test them
    * Extra: "Category" treated more like a tag, with many-to-many relationship
9. Create API for getting all data, single record
    * Test with Postman (install locally as needed)
    * Extra: Create other endpoints as needed, e.g. "summary" data
10. Install React
    * Convention to name it signifying the client, e.g.:
    * ``npx create-react-app client``
11. Configure React and file structure as needed
    * Use template, or:
    * Extra: create structure from scratch
    * Extra: Organize components, CSS, helper functions/modules, routing?
    * hard-coding API calls is OK, but may run into CORS errors; using a proxy may be easier
        * Configure back-end port to be different from the React port (e.g. ``3001``)
        * Add this attribute to package.json inside the React ("client") folder with the appropriate back-end port: 
            * ``"proxy": "http://localhost:3001"``
        * Proxy not working? 
            * You may need to reset the npm cache (``npm install``) and/or reset the servers.
            * Dev environment might need OS-specific port. See: https://stackoverflow.com/questions/45367298/could-not-proxy-request-pusher-auth-from-localhost3000-to-http-localhost500
12. Create basic UI in React
    * Extra: Install React Dev Tools to help debug: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
13. Fetch API data from backend, display in frontend
    * Note: Fetch calls should be ``async``, called inside ``useEffect()``; other components should not be ``async``
14. Create appropriate user controls to choose what to display
    * Control what is shown with ``useState``
    * Handle errors related to unfulfilled promises with ``try/catch`` blocks, and checking if data are of appropriate types
15. Create Insert/Add item functionality
    * separate front-end view/componenet
    * API in back-end for adding to DB -- start with basics (non-associated attributes)
        * Testing: As time allows -- define separate Jest tests for new API endpoint; but also will see it in front-end
    * Incorporate associated attributes (i.e. "categories" in this project)
16. Create Delete item functionality
    * Front-end: Button somewhere associated with item to delete
    * API in back-end for deleting records - including associations
        * Testing: Jest tests, but also use front-end
        * Extra:  Negative testing, bulk testing using random data generator data
17. Create Update/Patch item functionality
    * Front-end: Button to edit single item, form to edit item fields
    * API in back-end to update records -- start with basics (non-associated attributes)
    * Incorporate associated attributes (i.e. "categories" in this project)
        * Testing: Jest tests, but also use front-end
        * Extra:  Negative testing, bulk testing using random data generator data
        * Extra: Proper routing when finishing editing data
18. Deploy project
    * Set up Railway account, connected to GitHub repo
    * Ensure React is deployed properly (if using Create-React-App: https://create-react-app.dev/docs/deployment/)
