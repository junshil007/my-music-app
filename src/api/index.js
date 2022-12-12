/*
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-12-12
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-12
 * @Description: 
 */
const express = require('express')
const app = express()
app.use(express.static('../dist'))

module.exports = app