import * as types from './mutations_types';

export default {
	update_trade_rules: ({
		commit
	}, trade_rules) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_TRADE_RULES,trade_rules);
			resolve();
		});
	},

	update_remark_dialogs: ({
		commit
	}, remark_dialog) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_REMARK_DIALOGS,remark_dialog);
			resolve();
		});
	},
	delete_remark_dialogs:({
		commit
	}, dialog_id) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_REMARK_DIALOGS,dialog_id);
			resolve();
		});
	},
	update_traderule_remark:({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_REMARK_DIALOGS);
			resolve();
		});
	},

	update_copy_to_new_group_dialogs: ({
		commit
	}, copy_to_new_goup_dialog) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_COPY_TO_NEW__GROUP_DIALOGS,copy_to_new_goup_dialog);
			resolve();
		});
	},
	delete_copy_to_new_group_dialogs:({
		commit
	}, dialog_id) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_COPY_TO_NEW__GROUP_DIALOGS,dialog_id);
			resolve();
		});
	},

	update_traderule_table:({
		commit
	},flag) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_TRADERULE_TABLE,flag);
			resolve();
		});
	},
	update_view_rules_dialogs:({
		commit
	},view_rules_dialog) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_VIEW_RULES_DIALOGS,view_rules_dialog);
			resolve();
		});
	},
	delete_view_rules_dialogs:({
		commit
	},view_rules_dialog_id) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_VIEW_RULES_DIALOGS,view_rules_dialog_id);
			resolve();
		});
	},

};