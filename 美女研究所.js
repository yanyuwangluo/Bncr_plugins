/**作者
 * @author 烟雨
 * 插件名
 * @name 美女研究所
 * 组织名  预留字段，未来发布插件会用到
 * @origin 烟雨阁
 * 版本号
 * @version 1.0.5
 * 说明
 * @description 美女研究所
 * 触发正则   在bncr 所有的rule都被视为正则
 * @rule ^(美女)$
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

module.exports = async s => {
    //you code
    url = 'http://jiuli.xiaoapi.cn/i/img/mnyjs.php'

    request(url, async (err, res, body) => {
        if (err) { return console.log(err); }
        //把body转换成json对象
        var obj = JSON.parse(body);
        //用正则表达式去掉标题中的百度搜索
        const str = obj.title;
        const regex = / - 百度搜索\[久黎API\]更多精彩内容不容错过/;
        const result = str.replace(regex, '');
        //打印标题
        //console.log(result);
        //发文字
        await s.reply(result);
        //打印图片链接
        for (var i = 0; i < obj.img.length; i++) {
            //console.log(obj.img[i]);
            //发图片
            await s.reply({
                type: 'image',
                /* 发送网络图片 */
                path: obj.img[i],
                // msg: jpgURL,
            });
        }
    })


    //插件运行结束时 如果返回 'next' ，则继续向下匹配插件 否则只运行当前插件
    return 'next'  //继续向下匹配插件
}