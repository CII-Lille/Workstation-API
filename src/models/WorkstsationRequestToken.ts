import { createHash } from 'crypto'
import { ValidationError } from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

import { sequelize } from '../database'
import { WorkstationRequest } from './WorkstationRequest'

export interface WorkstationRequestTokenAttributes {
    id: number
    requestId: number
    token: string
}

export type WorkstationRequestTokenCreationAttribute = Optional<WorkstationRequestTokenAttributes, 'id' | 'token'>

export class WorkstationRequestToken
    extends Model<WorkstationRequestTokenAttributes, WorkstationRequestTokenCreationAttribute>
    implements WorkstationRequestTokenAttributes {
    // Attributes
    public id!: number
    public requestId!: number
    public token!: string

    // Timestamps
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    // Static
    public static generateToken(wsRequest: WorkstationRequest): string {
        const request = JSON.stringify(wsRequest.toJSON())
        const secret = process.env.SECRET ?? Math.random().toString(36).substring(2)
        const random = Math.random().toString(36).substring(2)

        return createHash('sha256').update(request).update(secret).update(random).digest('hex')
    }
}

WorkstationRequestToken.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        requestId: {
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    },
    {
        tableName: 'ws_request_tokens',
        sequelize
    }
)

WorkstationRequestToken.addHook('beforeValidate', async (instance) => {
    const workstationRequest = await WorkstationRequest.findOne({ where: { id: instance.getDataValue('requestId') } })

    if (workstationRequest) {
        const request = JSON.stringify(workstationRequest.toJSON())
        const secret = process.env.SECRET ?? Math.random().toString(36).substring(2)
        const random = Math.random().toString(36).substring(2)
        const hash = createHash('sha256').update(request).update(secret).update(random).digest('hex')

        instance.setDataValue('token', hash)
    } else {
        return Promise.reject(new ValidationError(`Request entry for id n°${instance.getDataValue('requestId')} doesn't exist`))
    }
})

WorkstationRequestToken.belongsTo(WorkstationRequest, { foreignKey: 'requestId' })
