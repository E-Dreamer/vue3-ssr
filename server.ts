const path = require('path')
const express = require('express')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')
const manifest = require('./dist/server/ssr-manifest.json')

const server = express()

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
console.log(appPath)
const createApp = require(appPath).default

server.use('/img', express.static(path.join(__dirname, './dist/client', 'img')))
server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, './dist/client', 'css')))
server.use(
  '/favicon.ico',
  express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
)

server.get('*', async (req: any, res: any) => {
  const { app, router, store } = createApp()
  await router.push(req.url)
  await router.isReady()

  const matchedComponents = router.currentRoute.value.matched

  //主动触发所有匹配的组件的asyncData函数
  Promise.all(
    matchedComponents.map((Component: any) => {
      // Component.component.default.methods.asyncData
      if (Component.asyncData) {
        return Component.asyncData({ store, route: router.currentRoute })
      }
    })
  )
    .then(async () => {
      const appContent = await renderToString(app)

      fs.readFile(
        path.join(__dirname, '/dist/client/index.html'),
        (err: object, html: any) => {
          if (err) {
            throw err
          }

          html = html
            .toString()
            .replace('<div id="app">', `<div id="app">${appContent}`)
            .replace(
              '</script>',
              `</script><script type="application/javascript">window.__INITIAL_STATE__=${JSON.stringify(
                store.state
              )}</script>`
            )
          res.setHeader('Content-Type', 'text/html')
          res.send(html)
        }
      )
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

console.log('You can navigate to http://localhost:8080')

server.listen(8080)
