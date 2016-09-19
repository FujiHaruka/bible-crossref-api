#!/usr/bin/env node

const { execSync } = require('child_process')
const {
  MYSQL_DATABASE,
  MYSQL_ROOT_PASSWORD,
  DB_CONTAINER_NAME,
  DB_PORT
} = require('../env')

let cmd = `

docker run -d \\
--name ${DB_CONTAINER_NAME} \\
-e MYSQL_DATABASE=${MYSQL_DATABASE} \\
-e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} \\
-p ${DB_PORT}:3306 \\
mysql:5.7 \\
--character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

`.trim()

console.log('> ' + cmd)

execSync(cmd, {
  stdio: 'inherit'
})
