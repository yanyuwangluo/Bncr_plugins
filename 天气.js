/**作者
 * @author 烟雨阁
 * 插件名
 * @name 天气查询
 * 组织名  预留字段，未来发布插件会用到
 * @origin 烟雨阁
 * 版本号
 * @version 1.0.5
 * 说明
 * @description 天气查询
 * 触发正则   在bncr 所有的rule都被视为正则
 * @rule ^天气([\s\S]+)$
 * @rule ^([\s\S]+)(天气)$
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

//code = s.param(1);  获取输入
const request = require('request');

const app_id = "xxxxxxxxxxxx";
const app_secret = 'xxxxxxxxxxxx'
module.exports = async s => {
  //you code
  kl = s.param(1);
  var options = {
    'method': 'POST',
    'url': 'https://www.mxnzp.com/api/weather/current/'+encodeURIComponent(kl)+'?app_id=majtlqqagnrmjo8d&app_secret=RG5lQXRCVGhRVisxbEw2dDgrbEoxQT09',
    'headers': {
    }
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
        let dq = data.data.address
        let wd = data.data.temp
        let tq = data.data.weather
        let fx = data.data.windDirection
        let fl = data.data.windPower
        let sd = data.data.humidity
        let time = data.data.reportTime
var logs =`地区：${dq}
温度：${wd}
天气：${tq}
风向：${fx}
风力：${fl}
湿度：${sd}
发布时间：${time}`
     //打印log
     //console.log(logs)
     await s.reply(logs)
    } catch (error) {
        console.error(error);
    }
});
  //插件运行结束时 如果返回 'next' ，则继续向下匹配插件 否则只运行当前插件
  return 'next'  //继续向下匹配插件
}
