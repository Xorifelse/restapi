const Sequelize = require('sequelize')
const sequelize = require('../db')

module.exports = sequelize.define('companies', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  },
  foundingYear: {
    type: Sequelize.INTEGER,
    field: 'founding_year',
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'companies'
})