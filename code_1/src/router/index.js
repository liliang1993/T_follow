/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {
	Home,
	Content
} from 'layout/';
import User from './user/';

export default new Router({
	routes: [{
			path: '/',
			name: 'Hello',
			hidden: true,
			redirect(to) {
				return 'home';
			}
		},
		User
	]
})