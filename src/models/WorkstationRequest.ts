import { Association, DataTypes, HasOneGetAssociationMixin, Model, Optional } from 'sequelize'

import { sequelize } from '../database'
import { WorkstationRequestStatus } from './WorkstsationRequestStatus'
import { WorkstationRequestToken } from './WorkstsationRequestToken'

export interface WorkstationRequestAttributes {
    /** ID of the WorkstationRequest */
    id: number
    /** Name of the request sender */
    name: string
    /** Surname of the request sender */
    surname: string
    /** Promotion of the request sender */
    promotion: string
    /** Email of the request sender */
    email: string
    /** Submission datetime of the request */
    submissionDate: Date
    /** Deadline datetime of the request */
    deadlineDate: Date
    /** Environment to use for the project */
    environment: string
    /** Main langage used in the project */
    langage: string
    /** Basic description of the project */
    description: string
    /** Dependencies of the project */
    dependencies: string
    /** URL that lead to the source of the project */
    sourceUrl: string
    /** Description of the expected result */
    resultDescription: string
    /** Instruction to build/run the project */
    insutrctions: string
    /** Does the project use multithreading ? */
    needMultithreading: boolean
    /** Does the project need to use the GPU ? */
    needGpu: boolean
}

export type WorkstationRequestCreationAttributes = Optional<
    WorkstationRequestAttributes,
    'id' | 'submissionDate' | 'deadlineDate' | 'dependencies' | 'needMultithreading' | 'needGpu'
>

/**
 * @class WorkstationRequest Model
 * @abstract Model of a deposited project request to run on the workstation
 */
export class WorkstationRequest
    extends Model<WorkstationRequestAttributes, WorkstationRequestCreationAttributes>
    implements WorkstationRequestAttributes {
    // Attributes
    public id!: number
    public name!: string
    public surname!: string
    public promotion!: string
    public email!: string
    public submissionDate!: Date
    public deadlineDate!: Date
    public environment!: string
    public langage!: string
    public description!: string
    public dependencies!: string
    public sourceUrl!: string
    public resultDescription!: string
    public insutrctions!: string
    public needMultithreading!: boolean
    public needGpu!: boolean

    // Timestamps
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    // Associations
    public getStatus!: HasOneGetAssociationMixin<WorkstationRequestStatus>
    public getToken!: HasOneGetAssociationMixin<WorkstationRequestToken>

    public readonly status?: WorkstationRequestStatus
    public readonly token?: WorkstationRequestToken

    public static associations: {
        status: Association<WorkstationRequest, WorkstationRequestStatus>
        token: Association<WorkstationRequest, WorkstationRequestToken>
    }
}

// ---- Initalize ------------------------------------------------------------------------

WorkstationRequest.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        promotion: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        submissionDate: {
            type: DataTypes.DATE,
            defaultValue: () => new Date(),
            allowNull: false
        },
        deadlineDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        environment: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        langage: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dependencies: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sourceUrl: {
            type: DataTypes.STRING(2048),
            allowNull: false
        },
        resultDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        insutrctions: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        needMultithreading: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        needGpu: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        tableName: 'ws_requests',
        sequelize
    }
)

// ---- Hooks ----------------------------------------------------------------------------

// Set and register status
WorkstationRequest.addHook('afterSave', async (requestInstance) => {
    const status = new WorkstationRequestStatus({
        requestId: requestInstance.getDataValue('id')
    })

    await status.save()
})

// Create and register token
WorkstationRequest.addHook('afterSave', async (requestInstance) => {
    const token = new WorkstationRequestToken({
        requestId: requestInstance.getDataValue('id')
    })

    await token.save()
})

// ---- Associations ---------------------------------------------------------------------

WorkstationRequest.hasOne(WorkstationRequestStatus, { foreignKey: 'requestId', onDelete: 'cascade', as: 'status' })
WorkstationRequest.hasOne(WorkstationRequestToken, { foreignKey: 'requestId', onDelete: 'cascade', as: 'token' })
