const express = require('express')
const http = require('http')
const fs = require('fs')
const app = express()
const querystring = require('querystring')
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken')
const httpreq = (path, method, req, res) => {
    const request = http.request({
        hostname: 'www.lb717.com',
        port: 80,
        method: method,
        path: path,
        headers: {
            'Content-Type': 'html/text;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }, (response) => {
        let data = ''
        response.setEncoding = 'utf8'
        response.on('data', (chunk) => {
            data += chunk
        })
        response.on('end', () => {
            res.json(data)
        })
    })
    request.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });
    console.log(typeof req.body)
    request.write(querystring.stringify(req.body))
    request.end()
}
app.use(bodyparser.urlencoded())

//允许跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Tocken')
    res.header('Content-Type', 'application/x-www-form-urlencoded')
    next()
})
//http://www.lb717.com/mobile/Category/categorySon?sonid=2

//首页商品列表
app.post('/mall/index/getGoodsChannel', (req, res) => {
    httpreq('/mall/index/getGoodsChannel', 'POST', req, res)
})

//详情页
app.post('/detail', (req, res) => {
    httpreq('/mobile/goods/index.html?goods_id=2614', 'get', req, res)
})

//分类商品
app.post('/classify/goods', (req, res) => {
    let params = req.body
    let userdata = JSON.parse(fs.readFileSync('classify.json'))
    let resInfo = {
        code: 1,
        data: []
    }
    userdata.forEach((item, i) => {
        if (item.id == params.id) {
            resInfo.code = 0
            res.json(item)
        }
    })

})

//登录
app.post('/user/login', (req, res) => {

    let params = req.body
    console.log(params)
    let userdata = JSON.parse(fs.readFileSync('user.json'))
    let resInfo = {
        code: 1,
        info: '用户名或密码错误',
        token: ''
    }
    userdata.forEach((item, i) => {
        if (item.name == params.name && item.psw == params.psw) {
            resInfo.code = 0,
                resInfo.info = '登录成功'
            resInfo.token = jwt.sign(params, '717', {
                expiresIn: 60 * 60
            })
        }
    })
    res.json(resInfo)
})

//注册
app.post('/user/register', (req, res) => {
    let data = JSON.parse(fs.readFileSync('user.json'))
    data.push(req.body)
    fs.writeFileSync('user.json', JSON.stringify(data))
    res.json({ code: 0, msg: '注册成功' })
})

//添加购物车和加减
app.post('/user/addcar', (req, res) => {
    let carinfo = JSON.parse(fs.readFileSync('addcar.json'))
    jwt.verify(req.body.token, '717', (err, decoded) => {

        let flag = true;
        if (err) {
            console.log(err)
            res.json({ code: 1, msg: '添加购物车失败' })
        } else {
            if (carinfo[decoded.name]) {
                carinfo[decoded.name].forEach((item) => {
                    if (item.goods_id == req.body.goods_id) {
                        item.status = item.status * 1 + req.body.type * 1
                        if (item.status <= 1) {
                            item.status = 1
                        }
                        flag = false
                    }
                })
                if (flag) {
                    carinfo[decoded.name].push(JSON.parse(req.body.goods_info))
                }

            } else {
                carinfo[decoded.name] = [JSON.parse(req.body.goods_info)]
            }
            fs.writeFile('addcar.json', JSON.stringify(carinfo), () => {
                res.json({ code: 0, msg: '添加购物车成功' })
            })
        }
    })


})

app.post('/user/checked', (req, res) => {
    let carinfo = JSON.parse(fs.readFileSync('addcar.json'))
    let all = true;
    jwt.verify(req.body.token, '717', (err, decoded) => {
        carinfo[decoded.name]
        if (err) {
            console.log(err)
            res.json({ code: 1 })
        } else {
            if (carinfo[decoded.name]) {
                carinfo[decoded.name].forEach((item) => {
                    if (req.body.type == 'notAll') {
                        if (item.goods_id == req.body.goods_id) {
                            console.log(1234)
                            item.is_verify = !item.is_verify
                        }
                        if (!item.is_verify) {
                            all = false
                        }
                    } else {
                        console.log(req.body.checked)
                        if (req.body.checked == 'true') {
                            item.is_verify = true
                            console.log(11111)
                            all = true
                        } else {
                            item.is_verify = false
                            all = false
                        }
                    }

                })
            }
            fs.writeFile('addcar.json', JSON.stringify(carinfo), () => {
                res.json({ code: 0, all: all })
            })
        }
    })
})

//删除商品
app.post('/user/delete', (req, res) => {
    let carinfo = JSON.parse(fs.readFileSync('addcar.json'))
    jwt.verify(req.body.token, '717', (err, decoded) => {
        carinfo[decoded.name]
        if (err) {
            console.log(err)
            res.json({ code: 1, msg: err })
        } else {
            console.log(carinfo[decoded.name])
            let arr = carinfo[decoded.name].filter((item, index) => {
                return !item.is_verify
            })
            carinfo[decoded.name] = arr
            fs.writeFile('addcar.json', JSON.stringify(carinfo), () => {
                res.json({ code: 0, msg: '删除成功', data: arr })
            })
        }

    })


})
app.post('/user/cargoods', (req, res) => {
    let carinfo = JSON.parse(fs.readFileSync('addcar.json'))
    jwt.verify(req.body.token, '717', (err, decoded) => {
        let arr = carinfo[decoded.name]
        let flag = true;
        if (err) {
            console.log(err)
            res.json({ code: 1, msg: err })
        } else {
            res.json({ code: 0, data: arr })
        }
    })


})

//

app.post('/user/gostore', (req, res) => {
    jwt.verify(req.body.token, '717', (err, decoded) => {
        if (err) {
            console.log(err)
            res.json({ code: 1, msg: '请登录' })
        } else {
            res.json({ code: 0, msg: '已登录' })
        }
    })
})
app.listen(8000, () => {
    console.log(8000)
})