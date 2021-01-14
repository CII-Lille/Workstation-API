import { DataTypes, Model, Optional } from 'sequelize'

import { sequelize } from '../database'

export interface WorkstationRequestStatusAttributes {
    /** ID of the WorkstationRequest */
    requestId: number
    /** Status of the Request */
    status: 'validation-pending' | 'validated' | 'running' | 'done' | 'error'
}

export type WorkstationRequestCreationAttributes = Optional<WorkstationRequestStatusAttributes, 'status'>

export class WorkstationRequestStatus
    extends Model<WorkstationRequestStatusAttributes, WorkstationRequestCreationAttributes>
    implements WorkstationRequestStatusAttributes {
    // Attributes
    public requestId!: number
    public status!: 'validation-pending' | 'validated' | 'running' | 'done' | 'error'

    // Timestamps
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

// ---- Initalize ------------------------------------------------------------------------

WorkstationRequestStatus.init(
    {
        requestId: {
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(32),
            defaultValue: 'validation-pending',
            allowNull: false
        }
    },
    {
        tableName: 'ws_request_status',
        sequelize
    }
)
