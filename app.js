const Express = require('express')
const app = Express()
const PORT = 4001

const responseHTML = (reqPath) =>
`
<h1 style="color:red;"> Howdy there, pardner! </h1>
<h3> You have reached ${reqPath} at port ${PORT} </h3>
`
app.get('/', (req, res) => {
  res.send(responseHTML('the index')).status(200)
})
/* 
*fulfilling the first lab steps: 

app.get('/i', (req, res) => {
  res.send('I').status(200)
})
app.get('/got', (req, res) => {
  res.send('I got').status(200)
})
app.get('/you', (req, res) => {
  res.send('I got you').status(200)
})
app.get('/babe', (req, res) => {
  res.send('I got you Babe').status(200)
})
* steps fulfilled...
*/

app.get('/:page', (req, res, next) => {
  if(req.params.page === 'generator'){
    next()
  } else {
    res.send(responseHTML(req.path)).status(200)
  }
})

app.use((req,res,next) => {
  console.log('this is the generator endpoint')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})