/* Imports */
const express =  require('express');
const path = require('path');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
//const bodyParser = require("body-parser");
const {
    logErrors,
    clientErrorHandler,
    errorHandler
} =  require('./utils/middleware/errorsHandler')

/* APP  */
const app = express();

/* middleware */
app.use(express.json())



/* Statics files  */
app.use("/static", express.static(path.join(__dirname, "public")));


/* View engine setup */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");



/* routes */

app.use('/products', productsRouter);
app.use("/api/products", productsApiRouter)

/* redirect */
app.get ('/', function(req, res) {
   res.redirect('/products');
});


/* Error handlers  */
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


/* Server  */
const server =  app.listen(8000, function(){
    console.log(`listenin http://localhost:${server.address().port}`);
});


