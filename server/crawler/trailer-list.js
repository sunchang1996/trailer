
const url = `https://movie.douban.com/tag/#/?sort=T&range=5,10&tags=`

const puppeteer = require('puppeteer')

// 添加一个等待时间的定时器
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time);
})

;(async () => {
  console.log('start')

  const browser = await puppeteer.launch({
    args: ['--no--sandbox'],
    dumpio: false,
  })

  const page = await browser.newPage() // 开启一个新的页面
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(3000)

  await page.waitForSelector('.more')

  // 加载两页数据 因为有一个加载更多的按钮 手动点击执行一次
  for(let i = 0; i< 1; i++) {
    await sleep(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    var $ = window.$;
    var items = $('.list-wp a') // 用jQuery拿到标签
    var links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        // 影片id
        let doubanId = it.find('div').data('id')
        // 影片标题
        let title = it.find('.title').text()
        // 拿到影片的评级
        let rate = Number(it.find('.rate').text())
        // 拿到页面上的图片地址，把图片替换成大图片
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links;
  })

  browser.close();// 关闭浏览器

  process.send({ result }) // 发送出去
  process.exit(0)
})()
