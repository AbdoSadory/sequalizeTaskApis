import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'

const Note = sql_config.define(
  'tbl_note',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    tblUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    paranoid: true, // for soft deletion
  }
)

export default Note
