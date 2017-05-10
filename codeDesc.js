module.exports = function (err) {
    err = parseInt(err);
    switch (err) {
        //info接口
        case 200:
            return '操作成功';
        case 400:
            return '请求消息格式错误';
        case 401:
            return '登录失败，请检查用户名和密码是否正确';
        case 402:
            return '注册失败，该账号已经注册过';
        case 403:
            return '服务器拒绝请求';
        case 404:
            return '请求业务不存在';
        case 405:
            return '请求缺少字段';
        case 500:
            return '服务器返回异常，请求不能被处理';
        case 501:
            return '数据库出现异常';
        default:
            break;
    }
}