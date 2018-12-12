import express from 'express'
import css from './controllers/css'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  if (
    req.method == 'GET' ||
    req.url == '/login' ||
    req.url == '/logout'
  ) {
    next()
  } else if (req.session.authUser) {
    next()
  } else {
    res.status(401).json({ message: '你没有权限' })
  }
})
//Add GET -/api/css
router.get('/css', css.all)
router.post('/css/add', css.add)

// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
