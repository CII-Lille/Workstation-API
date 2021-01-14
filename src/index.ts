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

            // Create
            /*const req = new WorkstationRequest({
                name: 'MIQUET',
                surname: 'Gautier',
                promotion: 'M1',
                email: 'gautier.miquet@isen.yncrea.fr',
                environment: 'Linux',
                langage: 'C++',
                description: 'Software to work with AtilaCalculatorSoftware results',
                dependencies: `- Qt5
                - Boost >= 1.72
                - GiDPost >= 2.7
                - zlib
                - HDF5
                - VTK 8.2.0`,
                sourceUrl: 'https://github.com/Xisabla/AtilaCalculatorSoftware',
                resultDescription: 'Executable file "AtilaCalculatorSoftware"',
                insutrctions: `Run the following commands:
                - mkdir build && cd build
                - cmake ../
                - make
                
                Detailed build instructions with dependencies install can be found here: https://github.com/Xisabla/AtilaCalculatorSoftware/wiki/Building`,
                needGpu: true
            })

            await req.save()

            console.log(req)*/

            // Find and show
            /*const req_ = await WorkstationRequest.findByPk(1, {
                include: [WorkstationRequest.associations.status, WorkstationRequest.associations.token]
            })

            console.log(req_.toJSON())
            console.log(req_.status?.toJSON(), req_.token?.toJSON())*/
        } catch (err) {
            console.error('Enable to connect to the database: ', err)
        }
    })()
})
