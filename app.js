const Express = require('express')
const app = Express()
const PORT = 4001

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})