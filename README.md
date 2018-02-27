## boycottNRA

This cross-browser extension notifies users when a NRA supported site is loaded.
User can choose to block the site or proceed without blocking.


## Data

A list of sites that support the NRA as well as those that have withdrawn support from the NRA is in src/data/nra.json.


## Contribute

If you wish to contribute to this project, please create a pull request.


## Installation
1. Clone the repository `git clone https://github.com/bananalabs/boycottnra.git`
2. Run `npm install`
3. Run `npm run build`


##### Load the extension in Chrome & Opera
1. Open Chrome/Opera browser and navigate to chrome://extensions
2. Select "Developer Mode" and then click "Load unpacked extension..."
3. From the file browser, choose to `extension-boilerplate/build/chrome` or (`extension-boilerplate/build/opera`)


##### Load the extension in Firefox
1. Open Firefox browser and navigate to about:debugging
2. Click "Load Temporary Add-on" and from the file browser, choose `extension-boilerplate/build/firefox`


## Developing
The following tasks can be used when you want to start developing the extension and want to enable live reload - 

- `npm run chrome-watch`
- `npm run opera-watch`
- `npm run firefox-watch`


## Packaging
Run `npm run dist` to create a zipped, production-ready extension for each browser. You can then upload that to the appstore.


## Note
This project was based off of https://github.com/EmailThis/extension-boilerplate