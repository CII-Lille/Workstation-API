import { createHash } from 'crypto'
import { DataTypes, Model, Optional } from 'sequelize'

import { sequelize } from '../database'

export interface WorkstationRequestAttributes {
    id: number
    name: string
    surname: string
    promotion: string
    email: string
    submission_date: Date
    deadline_date: Date
    environment: string
    langage: string
    description: string
    dependencies: string
    source_url: string
    result_description: string
    insutrctions: string
    need_multithreading: boolean
    need_gpu: boolean
}

export type WorkstationRequestCreationAttribute = Optional<
    WorkstationRequestAttributes,
    'id' | 'submission_date' | 'deadline_date' | 'dependencies' | 'need_multithreading' | 'need_gpu'
>

export class WorkstationRequest
    extends Model<WorkstationRequestAttributes, WorkstationRequestCreationAttribute>
    implements WorkstationRequestAttributes {
    // Attributes
    public id!: number
    public name!: string
    public surname!: string
    public promotion!: string
    public email!: string
    public submission_date!: Date
    public deadline_date!: Date
    public environment!: string
    public langage!: string
    public description!: string
    public dependencies!: string
    public source_url!: string
    public result_description!: string
    public insutrctions!: string
    public need_multithreading!: boolean
    public need_gpu!: boolean

    // Timestamps
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

WorkstationRequest.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128)
        },
        surname: {
            type: DataTypes.STRING(128)
        },
        promotion: {
            type: DataTypes.STRING(16)
        },
        email: {
            type: DataTypes.STRING(128)
        },
        submission_date: {
            type: DataTypes.DATE,
            defaultValue: () => new Date()
        },
        deadline_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        environment: {
            type: DataTypes.STRING(128)
        },
        langage: {
            type: DataTypes.STRING(64)
        },
        description: {
            type: DataTypes.TEXT
        },
        dependencies: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        source_url: {
            type: DataTypes.STRING(2048)
        },
        result_description: {
            type: DataTypes.TEXT
        },
        insutrctions: {
            type: DataTypes.TEXT
        },
        need_multithreading: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        need_gpu: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'ws_requests',
        sequelize
    }
)

// Not relevant, testing token creation after WorkstationRequest creation
// Goal is to create a reading token link to the request
// May use associations (https://sequelize.org/master/manual/assocs.html)
WorkstationRequest.addHook('afterCreate', 'token', (instance) => {
    const stringifiedInstance = JSON.stringify(instance.toJSON())
    const secret = process.env.SECRET ?? Math.random().toString(36).substring(2)
    const random = Math.random().toString(36).substring(2)

    const hash = createHash('sha256')

    hash.update(stringifiedInstance)
    hash.update(secret)
    hash.update(random)

    const token = hash.digest('hex')

    console.log(token, token.length, { secret, random })
})
