import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

// const http = require('http'); 
// const fs = require('fs');
// const file = fs.createWriteStream("file.jpg");

const fs = require('fs');
const request = require('request');


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  var download = function(uri: string, filename: string, callback: () => void){
    request.head(uri, function(err: any, res: { headers: { [x: string]: any; }; }, body: any){
      console.log('content-type:', res.headers['content-type']);
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  
  download('http://media.wired.com/photos/623bb74dff94bf7082476291/3:2/w_1280%2Cc_limit/Security_Opensource_sabotage_1336099562.jpg', 'image.jpg', function(){
    console.log('done');
  });
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();