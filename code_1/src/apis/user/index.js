/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [{
	name: '登录',
	method: 'login',
	path: '/ajax_login',
	type: 'post',
}, {
	name: '登出',
	method: 'logout',
	path: '/ajax_logout',
	type: 'post',
}, {
	name: '获取用户列表',
	method: 'findUserPage',
	path: '/ajax/api',
	type: 'post',
}, {
	name: '创建用户',
	method: 'createUser',
	path: '/ajax/api',
	type: 'post',
}, {
	name: '更新用户',
	method: 'updateUser',
	path: '/ajax/api',
	type: 'post',
}];
