// Use Node's request module to connect to create HTTP requests, fs module to write the file
const request = require('request');
const fs = require('fs');

// array of command line arguments
let args = process.argv.slice(2);
let url = args[0];
let path = args[1];

// should take two command line arguments: a URL and a local file path
const fetcher = (url, path) => {
  request(url, (error, response, body) => {
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode);
    if (error) {
      console.log('error:', error); // Print the error if one occurred
      return;
    }
    // should download the resource at the URL to the local path on your machine
    fs.writeFile(path, body, err => {
      if (err) {
        console.error(err);
        return;
      } else {
        // Should print message like : Downloaded and saved 1235 bytes to ./index.html
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      }
    });
  });
};

fetcher(url, path);
