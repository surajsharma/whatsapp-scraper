![project logo](docs/images/project-logo.png)

### Developing Localy

There are three main parts to the Scraper.

1. The Strapi Backend
2. The scraping script itself
3. The Gatsby Frontend

Here's how to run each of them:

1. The Strapi Backend: To ensure the scraper has a place to store the processed data, we need to ensure the backend is up and running. The backend resides in the `/api` directory, and should run with a `npm run develop` after doing an `npm install` within the dir.

2. The scraper: The scraper uses Google Drive to get the whatsapp zip and txt files into a `./Downloaded` folder, extracts the zips and moves the txt into `./Extracted` another folder, before finally converting it all into JSON and moving the respective files into the `./JSON` folder. To run, simply do `node .` within the `./scraper` directory.

3. The Gatsby Frontend: In the `ui-web-community` dir, do `npm i` and `gatsby develop` provided you have gatsby CLI installed.
