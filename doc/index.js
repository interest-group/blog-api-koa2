const readline = require('readline')
const fs = require('fs')

const startRegExp = /^\s*?\*\s*?@api/
const endRegExp = /^\s*?\*\//

function createDocs (aims) {
  console.log(arguments)
  Promise.all(aims.map(file => filterApis(file))).then(group => {
    const apis = []
    for (let i = 0; i < group.length; i++) {
      for (let j = 0; j < group[i].length; j++) {
        const content = group[i][j]
        console.log(content)
      }
    }
  })
}

// api内容包 转json
function toJson () {

}

// 过滤出api内容包
function filterApis (file) {
  return new Promise((resolve, reject) => {
    let inContent = false
    let content = []
    const apis = [content]
    const fRead = fs.createReadStream(file)
    const reader = readline.createInterface({ input: fRead })
    reader.on('line', (line) => {
      console.log(line)
      console.log(startRegExp.test(line))
      // 起点
      if (!inContent && startRegExp.test(line)) {
        inContent = true
      }
      // 终点
      if (inContent && endRegExp.test(line)) {
        inContent = false
        // 创建新的内容包
        content = []
        apis.push(content)
      }
      // 加入
      if (inContent) {
        content.push(line)
      }
    })
    reader.on('close', () => resolve(apis))
  })
}

module.exports = {
  createDocs
}
