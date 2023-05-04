/**作者
 * @author yanyu
 * 插件名
 * @name 买家秀
 * 组织名  预留字段，未来发布插件会用到
 * @origin 烟雨阁
 * 版本号
 * @version 1.0.5
 * 说明
 * @description 买家秀
 * 触发正则   在bncr 所有的rule都被视为正则
 * @rule ^(买家秀)$
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
    const options = {
        method: 'GET',
        url: 'https://api.vvhan.com/api/tao?type=json',
        headers: {
            Cookie: 'wzws_sessionid=gjFhZDM5ZoAyNy4yMjMuMjAuMjQygTc5OWE0MKBkP+0n'
        }
    };

    request(options, async (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }

        try {
            //转成json格式
            const data = JSON.parse(body);
            //打印数据
            //console.log(data);
            //发文字
            await s.reply(data.title)
            //发图片
            await s.reply({
                type: 'image',
                /* 发送网络图片 */
                path: data.pic,
                // msg: jpgURL,
            });
        } catch (error) {
            console.error(error);
        }
    });

    //插件运行结束时 如果返回 'next' ，则继续向下匹配插件 否则只运行当前插件
    return 'next'  //继续向下匹配插件
}