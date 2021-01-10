import { DataTypes, Model, Optional } from 'sequelize'

import { sequelize } from '../database'

export interface WorkstationRequestAttributes {
    id: number
    name: string
    surname: string
    promotion: string
    email: string
    submissionDate: Date
    deadlineDate: Date
    environment: string
    langage: string
    description: string
    dependencies: string
    sourceUrl: string
    resultDescription: string
    insutrctions: string
    needMultithreading: boolean
    needGpu: boolean
}

export type WorkstationRequestCreationAttribute = Optional<
    WorkstationRequestAttributes,
    'id' | 'submissionDate' | 'deadlineDate' | 'dependencies' | 'needMultithreading' | 'needGpu'
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
}

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
