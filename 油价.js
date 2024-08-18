/**作者
 * @author yanyu
 * 插件名
 * @name 油价查询
 * 组织名  预留字段，未来发布插件会用到
 * @origin 烟雨阁
 * 版本号
 * @version 1.0.5
 * 说明
 * @description 油价查询
 * 触发正则   在bncr 所有的rule都被视为正则
 * @rule ^(油价)([\s\S]+)$
 * @rule ^([\s\S]+)(油价)$
 * // 是否管理员才能触发命令
 * @admin flase
 * // 是否发布插件，预留字段，可忽略
 * @public false
 * // 插件优先级，越大优先级越高  如果两个插件正则一样，则优先级高的先被匹配
 * @priority 9999
 * // 是否禁用插件
 * @disable false
 * // 是否服务模块，true不会作为插件加载，会在系统启动时执行该插件内容
 * @service false
 */

const request = require('request');

const apiKey = "xxxxxxxxxxxxxxxxxx";

module.exports = async s => {
    code = s.param(1);
    //you code
    request.post({
        url: 'https://apis.tianapi.com/oilprice/index',
        form: {
            key: apiKey, prov: code
        }
    }, async function (err, response, tianapi_data) {
        if (err) {
            console.log(err);
        } else {
            var data = JSON.parse(tianapi_data);
            var list = data.result;
            data =
            "查询地区：" +
            list.prov +
            "\n零号柴油：" +
            list.p0 +
            "\n89号汽油：" +
            list.p89 +
            "\n92号汽油：" +
            list.p92 +
            "\n95号汽油：" +
            list.p95 +
            "\n98号汽油：" +
            list.p98 +
            "\n更新时间：" +
            list.time.slice(0,10);
        }
        await s.reply(data);
        //console.log(data);
    })
    //插件运行结束时 如果返回 'next' ，则继续向下匹配插件 否则只运行当前插件
    return 'next'  //继续向下匹配插件
  }
