const {
  BIBLE_CROSSREF_API_ENV_PATH
} = process.env

let defaultEnv = {
  APP_PORT: 3000,
  MYSQL_DATABASE: 'crossref',
  MYSQL_ROOT_PASSWORD: 'password1',
  DB_CONTAINER_NAME: 'bible-crossref-api-db',
  DB_PORT: 3306,
  URL_PREFIX: '' // for example '/api'
}

module.exports = BIBLE_CROSSREF_API_ENV_PATH ? require(BIBLE_CROSSREF_API_ENV_PATH) : defaultEnv
