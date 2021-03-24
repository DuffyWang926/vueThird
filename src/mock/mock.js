import './role'
import './restrictRegions'
import './goods'
import "./restrictRegions.js"
import "./members.js"
import './categories'
import './warehouse'
import './rightsReq'
import './users'

const Mock = require('mockjs')

const userData = {
  status: 0,
  data: {}
}

Mock.mock('http://127.0.0.1:8079/login', userData)
