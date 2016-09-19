const co = require('co')
const Sequelize = require('sequelize')
const importData = require('./db/data.json')
const {
  DB_PORT,
  MYSQL_DATABASE,
  MYSQL_ROOT_PASSWORD
} = require('../env')

let sequelize = new Sequelize(MYSQL_DATABASE, 'root', MYSQL_ROOT_PASSWORD, {
  host: 'localhost',
  port: DB_PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10
  },
  logging: (data) => {}
})

let Reference = sequelize.define('cross_reference', {
  verse: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  ref_verses: {
    type: Sequelize.STRING(2000)
  }
}, {
  timestamps: false,
  freezeTableName: true
})

/**
 * Sync database
 */
co(function * () {
  yield Reference.sync({force: true})

  let mainVerses = Object.keys(importData)
  let dataList = []
  let insertCount = 0
  for (let verse of mainVerses) {
    let refVerses = importData[verse]
    dataList.push({
      verse: verse,
      ref_verses: JSON.stringify(refVerses)
    })
    if (dataList.length > 500) {
      console.log('Insert', ++insertCount)
      yield Reference.bulkCreate(dataList)
      dataList = []
    }
  }
  console.log('Insert data ', ++insertCount)
  yield Reference.bulkCreate(dataList)
  console.log('Finish')
}).catch(err => console.log(err))
