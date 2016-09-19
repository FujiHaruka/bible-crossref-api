const Sequelize = require('sequelize')
const {
  MYSQL_DATABASE,
  MYSQL_ROOT_PASSWORD
} = require('../../env')

let sequelize = new Sequelize(MYSQL_DATABASE, 'root', MYSQL_ROOT_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 20
  },
  logging: () => {/* Do nothing now*/}
})

let RefferenceModel = sequelize.define('cross_reference', {
  verse: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  ref_verses: {
    type: Sequelize.STRING(1300)
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = RefferenceModel
