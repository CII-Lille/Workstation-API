import express from 'express'

import { sequelize } from './database/index'
import { WorkstationRequest } from './models/WorkstationRequest'

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

app.listen(app.get('port'), () => {
    console.log(`App is running on http://localhost:${app.get('port')}`)
    ;(async () => {
        try {
            await sequelize.authenticate()
            await sequelize.sync()

            // Testing
            const reqs = await WorkstationRequest.findAll()
            console.log(reqs)
        } catch (err) {
            console.error('Enable to connect to the database: ', err)
        }
    })()
})
