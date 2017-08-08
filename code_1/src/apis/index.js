/**
 * Created by sailengsi on 2017/5/11.
 */

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */

import user from './user/';

import common from './common/'

export default [{
    module:'user',
    name:'用户管理',
    list:user
},{
    module:'common',
    name:'订单管理',
    list: common
}];