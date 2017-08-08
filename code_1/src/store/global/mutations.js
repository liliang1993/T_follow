import * as types from './mutations_types'

import {
    store
} from 'utils/';

export default {
    [types.SHOW_LOADING](state) {
        state.ajax_loading =true;
    },

    [types.HIDE_LOADING](state) {
        state.ajax_loading=false;
    },
    [types.UPDATE_GLOBAL_CONTEXT](state,global_context) {
        state.context = global_context;
        store.set('context', state.context);
    },

    [types.UPDATE_GLOBAL_USER_INFO](state,global_user_info) {
        state.user_info = global_user_info;
        store.set('user_info', state.user_info);
    },
    [types.UPDATE_GLOBAL_ROLES](state,global_roles) {
        state.roles = global_roles;
        store.set('roles', state.roles);
    },
    [types.UPDATE_GLOBAL_QUOTE_TYPES](state,global_quote_types) {
        state.quote_types = global_quote_types;
        store.set('quote_types', state.quote_types);
    },
    [types.UPDATE_GLOBAL_SOURCES](state,global_sources) {
        state.sources= global_sources;
        store.set('sources', state.sources);
    },
    [types.UPDATE_GLOBAL_LPS](state,global_lps) {
        state.lps= global_lps;
        store.set('lps', state.lps);
    },
    [types.UPDATE_GLOBAL_STD_SYMBOLS](state,global_std_symbols) {
        state.std_symbols = global_std_symbols;
        store.set('std_symbols', state.std_symbols);
    },


    [types.UPDATE_GLOBAL_ZINDEX](state) {
        state.dialog_zIndex  += 1;
        // store.set('context', state.context);
    },
    [types.UPDATE_GLOBAL_LOCALE](state,locale) {
        state.locale = locale;
        store.set('locale', state.locale);
    },
};