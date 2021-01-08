const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const colourRouter = require('./routes/colourRouter')

app.use('/arses', colourRouter)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})