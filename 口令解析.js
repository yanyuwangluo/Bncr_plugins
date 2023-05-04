/**
 * @author 烟雨
 * @description 🐒解析京东口令
 * @origin 烟雨阁
 * @version v1.0.1
 * @name 京东口令解析url
 * @rule ^jx([\s\S]+)$
 * @priority 100000
 * @admin true
 * @public false
 *
 */
const request = require('request');

module.exports = async s => {
    //you code
    kl = s.param(1);
    var options = {
        'method': 'POST',
        'url': 'https://api.nolanstore.top/JComExchange',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "code": kl
        })

    };
    request(options, async (error, response) => {
        if (error) {
            console.error(error);
            return;
        }
        try {
            //转成json格式
            const data = JSON.parse(response.body);
            //打印数据
            //console.log(data);
            let img = data.data.img
            let title = data.data.title
            let userName = data.data.userName
            let jumpUrl = data.data.jumpUrl
var logs = `解析口令：${kl}
发起账号：${userName}
活动名称：${title}
活动链接：${jumpUrl}
跳转链接：${"https://www.yanyuwangluo.cn/jd?url="+jumpUrl}`
            await s.reply(logs);
            //发图片
            await s.reply({
                type: 'image',
                /* 发送网络图片 */
                path: img,
            });
        } catch (error) {
            console.error(error);
        }
    });
    //插件运行结束时 如果返回 'next' ，则继续向下匹配插件 否则只运行当前插件
    return 'next'  //继续向下匹配插件
}