const fs = require('fs')
const path = require('path')

const config = {
  input: 'src/controller',
  output: 'docs/api',
  public: 'http://localhost:5220/api/public/v1',
  private: 'http://localhost:5220/api/private/v1'
}

// 文件类
function FileTool () {}
FileTool.prototype = {
  findFiles (dir) {
    this.files = []
    this.loopDir(dir)
    return this.files
  },
  join (...args) {
    return path.join(...args)
  },
  mkdir (dirpath) {
    if (!fs.existsSync(path.dirname(dirpath))) {
      this.mkdir(path.dirname(dirpath))
    }
    if (!fs.existsSync(dirpath)) {
      fs.mkdirSync(dirpath)
    }
  },
  loopDir (dir) {
    const files = fs.readdirSync(dir)
    for (let i = 0; i < files.length; i++) {
      const file = this.join(dir, files[i])
      if (this.isFile(file)) {
        this.files.push(file)
      } else {
        this.loopDir(file)
      }
    }
  },
  isFile (file) {
    return fs.lstatSync(file).isFile()
  }
}

// 序列化JSON
function JsonTool (file) {
  this.file = file
  this.json = []
}
JsonTool.prototype = {
  // 转化为
  toJson () {
    const blocks = this.toBlocks()
    for (let i = 0; i < blocks.length; i++) {
      this.parseBlock(blocks[i])
    }
    return this.json
  },
  // 转化为 内容块
  toBlocks () {
    // 转化为内容块
    const blocks = fs.readFileSync(this.file, 'utf8').match(/\/\*\*[\s\S]*?\*\//g) || []
    return blocks.filter(data => data.indexOf('@apiName') >= 0)
  },
  // 解析内容块
  parseBlock (block) {
    // 格式化成行
    const lines = block.substr(0, block.length - 2).replace(/\r\n|\r/g, '\n').split(/\*\s*?@/).slice(1)
    // 逐行读取
    const result = {}
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/\s\*\s|\n\s*?$/g, '')
      const [name, content] = this.splitOne(line, /\s+/)
      switch (name) {
        case 'apiName':
        case 'apiDescription':
          this.toStringAttr(result, name, content)
          break
        case 'apiGroup':
          this.toGroupAttr(result, name, content)
          break
        case 'apiUrl':
          this.toUrlAttr(result, name, content)
          break
        case 'apiParam':
        case 'apiBody':
          this.toParamsAttr(result, name, content)
          break
        case 'apiRequest':
        case 'apiResponse':
          this.toExampleAttr(result, name, content)
          break
      }
    }
    this.json.push(result)
  },
  // 格式化URL
  toUrlAttr (result, name, content) {
    const [method, apiUrl] = this.filterContent(content)
    result.apiMethod = method || 'UNKNOWN'
    result.apiUrl = apiUrl
  },
  // 格式化分类
  toGroupAttr (result, name, content) {
    const [auth, apiGroup] = this.filterContent(content)
    result.apiAuth = (auth || 'public').toLowerCase()
    result.apiGroup = apiGroup || 'api'
  },
  // 格式化 参数
  toParamsAttr (result, name, content) {
    const [key, type, description, v] = content.split('|').map(v => v.trim()).filter(v => v)
    const required = v ? '是' : '否'
    result[name] = result[name] || []
    result[name].push({ key, type, description, required })
  },
  // 格式化 例子
  toExampleAttr (result, name, content) {
    result[name] = result[name] || []
    const description = content.split('\n')[0]
    if (description && description.indexOf('{') < 0) {
      const value = ' ' + content.substr(description.length + 2)
      result[name].push({ description, value })
    } else {
      result[name].push({ description: null, value: '  ' + content })
    }
  },
  // 过滤括号数据
  filterContent (content) {
    const value = /{(.*)}/g.exec(content)
    return [value ? value[1] : '', content.replace(/{.*}/g, '').trim()]
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

// 序列化Markdown
function MarkdownTool (config) {
  this.config = config
  this.docs = {}
  this.files = []
}
MarkdownTool.prototype = {
  pushJson (json) {
    json.forEach(doc => {
      const name = doc.apiAuth + '_' + doc.apiGroup
      this.docs[name] = this.docs[name] || {
        // 前缀
        prefix: this.config[doc.apiAuth],
        // 文件名
        fileName: doc.apiAuth + '_' + doc.apiGroup,
        // 标题
        title: doc.apiAuth + ' ' + doc.apiGroup,
        // api
        apis: []
      }
      this.docs[name].apis.push(doc)
    })
  },
  toMarkdown () {
    Object.values(this.docs).forEach(({ prefix, fileName, title, apis }) => {
      const file = { name: fileName + '.md' }
      file.content = this.getLine(1, title)
      if (prefix) {
        file.content += this.getLine(2, '接口前缀')
        file.content += this.getCode(prefix) + '\n\n'
      }
      apis.forEach((api, index) => {
        file.content += this.toMarkdownApi(api, index)
      })
      this.files.push(file)
    })
  },
  writeFiles (dir) {
    const ft = new FileTool()
    ft.mkdir(dir)
    this.files.forEach(file => {
      fs.writeFileSync(ft.join(dir, file.name), file.content)
    })
  },
  toMarkdownApi (api, index) {
    // 标题
    let content = this.getLine(2, `${index + 1}.  ${api.apiName}`)
    // 描述
    if (api.apiDescription) {
      content += this.getLine(0, api.apiDescription)
    }
    // URL
    content += this.getCode(api.apiMethod + '     ' + api.apiUrl)
    // 参数
    content += this.getLine(3, '请求参数')
    // params 参数
    content += this.getParams(api.apiParam, '> params 参数')
    // body 参数
    content += this.getParams(api.apiBody, '> body 参数')
    // 无参数
    if (this.isEmpty(api.apiParam) && this.isEmpty(api.apiBody)) {
      content += this.getLine(0, '- 无')
    }
    // 请求示例
    content += this.getExample(api.apiRequest, '请求示例')
    // 响应示例
    content += this.getExample(api.apiResponse, '响应示例')
    return content + '\n\n'
  },
  getLine (h, content) {
    const before = h ? Array.apply(null, Array(h)).map(_ => '#').join('') + ' ' : ''
    return before + content + '\n\n'
  },
  getCode (value) {
    return '```\n' + value + '\n```\n'
  },
  isEmpty (array) {
    return !array || array.length <= 0
  },
  // 参数
  getParams (array, title) {
    if (array && array.length > 0) {
      let content = this.getLine(0, title)
      content += '| 参数名 | 参数类型 | 说明 | 是否必填 |\n'
      content += '| --- | --- | --- | --- |\n'
      array.forEach(v => {
        content += `| ${v.key} | ${v.type} | ${v.description} | ${v.required} |\n`
      })
      return content + '\n'
    }
    return ''
  },
  // 参数
  getExample (array, title) {
    if (array && array.length > 0) {
      let content = this.getLine(3, title)
      array.forEach((data) => {
        content += this.getLine(0, data.description || '')
        content += this.getCode(data.value)
      })
      return content + '\n'
    }
    return ''
  }
}

function main (config) {
  const mt = new MarkdownTool(config)
  const ft = new FileTool()
  ft.findFiles(ft.join(__dirname, config.input))
  ft.files.forEach(file => {
    mt.pushJson(new JsonTool(file).toJson())
  })
  mt.toMarkdown()
  mt.writeFiles(ft.join(__dirname, config.output))
}

main(config)
