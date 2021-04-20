const through = require('through2')

// 将文件转化为 api json
function toApiJson () {
  return through.obj(function (file, encoding, callback) {
    const api = new ApiJson()
    api.toJson(file.contents.toString('utf-8'))
    if (api.hasBlocks()) {
      file.contents = Buffer.from(api.getStringify())
      file.extname = '.json'
    }
    console.log(file.path)
    this.push(file)
    callback()
  })
}

module.exports = {
  toApiJson
}

function ApiJson () {}

ApiJson.prototype = {
  toJson (string) {
    // 转化为内容块
    this.blocks = string.match(/\/\*\*[\s\S]*?\*\//g) || []
    this.blocks = this.blocks.filter(data => data.indexOf('@api') >= 0)
    for (let i = 0; i < this.blocks.length; i++) {
      this.parseBlock(i)
    }
  },
  getStringify () {
    return JSON.stringify(this.blocks)
  },
  hasBlocks () {
    return this.blocks.length > 0
  },
  // 解析内容块
  parseBlock (index) {
    const block = this.blocks[index]
    // 格式化成行
    const lines = block.replace(/\r|\r\n/g, '\n').substring(0, block.length - 2).split(/\*\s*?@/).slice(1)
    // 逐行读取
    const result = {}
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/\s\*\s|\n\s*?$/g, '')
      const [name, content] = this.splitOne(line, /\s+/)
      switch (name) {
        case 'apiName':
        case 'apiGroup':
        case 'apiDescription':
          this.toStringAttr(result, name, content)
          break
        case 'apiUrl':
          this.toUrlAttr(result, name, content)
          break
        case 'apiParam':
        case 'apiQuery':
        case 'apiBody':
          this.toParamsAttr(result, name, content)
          break
        case 'request':
        case 'response':
          this.toExampleAttr(result, name, content)
          break
      }
    }
    this.blocks[index] = result
  },
  // 格式化URL
  toUrlAttr (result, name, content) {
    const value = /{(.*)}/g.exec(content)
    result.apiMethod = value ? value[1] : 'UNKNOWN'
    result.apiUrl = content.replace(/{.*}/g, '').trim()
  },
  // 格式化 参数
  toParamsAttr (result, name, content) {
    const [key, type, description, required] = content.split('|').map(v => v.trim()).filter(v => v)
    result[name] = result[name] || []
    result[name].push({ key, type, description, required })
  },
  // 格式化 例子
  toExampleAttr (result, name, content) {
    result[name] = result[name] || []
    const description = content.split('\n')[0]
    if (description && description.indexOf('{') < 0) {
      const value = content.substr(description.length + 2)
      result[name].push({ description, value })
    } else {
      result[name].push({ description: null, value: content })
    }
  },
  // 整行文本
  toStringAttr (result, name, content) {
    result[name] = content
  },
  // 分割
  splitOne (string, searchKey) {
    const index = string.search(searchKey)
    return [string.substring(0, index), string.substring(index).replace(/^\s+/, '')]
  }
}
