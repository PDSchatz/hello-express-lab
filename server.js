const Express = require('express')
const app = Express()
const PORT = 5000
/*
  ! this required some reading, like, common, what am I here for, to LEARN???
*/
const static = Express.static(`${__dirname}/public`, {
  //here we have to explicitly define '.html' as a default filetype for Express
  //otherwise, if we try to goto https://domain.com/example, Express will error out
  //and yell, "NO DEFAULT ENGINE WAS SET BLAH BLAH BLAH"
  //because it's looking for a filex called "example", not "example.html"
  //defining this lets express try and append '.html' onto the requrest before erroring.
  extensions: ['html']
})

app.use(static)

app.get('/', (_, res) => {
  res.render('index')
})

app.get('/:filename', (req, res) => {
  //! allegedly, res.render() takes a callback that is executed, but I could never get it work for error handling purposes...
  res.render(`${req.params.filename}`)
  // * for reference, here's a recreation of what I tried:
  /*
  res.render(`${req.params.filename}`, function(err, html){
    if(err){
      console.log(err)
      res.send(`<h1>file not found or whatever</h1>`)
    } else {
      * I tried sticking a console.log here so that I could see it firing even when localhost/next.html was hit, but it just never ever fired...
      res.render(html)
    }
  })
  */
})
  //here, we define a catch-all error handler
  //if Response.render() messes up (say, for instance, looking for a file that doesn't exist...)
  //it will call the next(err). Like I mentioned above, the docs speak of a callback function 
  //that can be used for error handling, but it never triggered for me... so I set up a catch-all one instead
app.use((err, req, res, next) => {
  //the ONLY way to get this thing to catch an error is to include the `next` parameter.
  //otherwise, it works as normal middleware with messed up names (lmao err.path)
  if(err){
    console.log(`oh noes, an error! \n ${err}`)
    res.status(500).send(`<h1>lmao the file ${req.path} could not found</h1>`)
  } else {
    res.status(404)
  }
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
//my head hurts now.