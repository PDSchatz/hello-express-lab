const Express = require('express')
const path = require('path')
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
  if(req.path.includes('/generator/')){
    next()
  } else {
    res.send(responseHTML(req.path)).status(200)
  }
})

app.get('/generator/', (req,res) => {
//   res.send(
// `<h1 style="color:red;">let's make you a page!</h1>
//   <form action="./new_user" method="get">
//     <input type="text" placeholder="Your name here" name="user_name">
//   </form> 
// `    
//   ).status(200)

res.sendFile(path.resolve('./lol.html'), () => {
  console.log('file sent?')
  res.status(200)
})
})

app.get('/generator/new_user/', (req,res) => {
  console.log('we gots a new user, and their name is: ', req.query)
  res.send(
`<h1>OMG HELLO, ${req.query.user_name}!!!</h1>`
  )
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})