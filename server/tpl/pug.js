module.exports = `
doctype html
head
  meta(charset="UTF-8")
  meta(name="viewport" content="width=device-width, initial-scale=1.0")
  meta(http-equiv="X-UA-Compatible" content="ie=edge")
  title koa server/title
  link(href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet")
  script(src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"/script)
  script(src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"/script)
body
  .container
    .row
      .col-md-8
        h1 Hi #{you}
        p #{me}
      .col-md-4
        p 测试静态页面 pug 模板引擎
`