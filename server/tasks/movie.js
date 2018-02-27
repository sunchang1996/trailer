const { resolve } = require('path');

const cp = require('child_process'); // 派出一个子进程

;(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list.js')
  const child = cp.fork(script, [])
  let invoked = false

  // 注册监听函数
  child.on('error', err => {
    if (invoked) return

    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = false

    let err = code === 0 ? null : new Error('exit code' + code)

    console.log(err)
  })

  // 拿到send 过来的 数据
  child.on('message', data => {
    let result = data.result
    console.log(result)
  })
})()