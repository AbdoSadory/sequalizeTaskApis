import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'

const User = sql_config.define(
  'tbl_user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true, // for soft deletion
  }
)

export default User
