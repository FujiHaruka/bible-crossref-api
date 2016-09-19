const { validateBook } = require('./validete')
const RefferenceModel = require('./db')
const bookInfo = require('../src/book')

module.exports.fetchRef = function * fetchRef (book, chapter, verse) {
  // Validation
  book = book.toLowerCase()
  let valid = this.method === 'GET' &&
              validateBook(book) &&
              isIntStr(chapter) &&
              isIntStr(verse)
  if (!valid) {
    return
  }
  // Find
  let key = [book, chapter, verse].join('.')
  let one = yield RefferenceModel.findOne({
    where: {
      verse: key
    }
  })
  if (!one) {
    return
  }
  this.body = {
    key: key,
    refVerses: JSON.parse(one.ref_verses),
    book: bookInfo[book].jp,
    chapter: parseInt(chapter, 10),
    verse: parseInt(verse, 10)
  }
}

function isIntStr (str) {
  return str === '' + parseInt(str, 10)
}
