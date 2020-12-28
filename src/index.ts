import express from 'express'

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

app.listen(app.get('port'), () => {
    console.log(`App is running on http://localhost:${app.get('port')}`)
})
