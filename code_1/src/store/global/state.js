import {
    store
} from 'utils/';


export default {
    ajax_loading: false,
    context : store.get('context')||{},
    user_info: store.get('user_info'),
    roles: ["Admin","RulesEditor","Whitelabel","WhitelabelPro"],
    quote_types:  ["asian", "spread", "raw", "delta"],
    sources: ['risehills','solid'],
    lps: store.get('lps'),
    std_symbols: store.get('std_symbols'),
    dialog_zIndex: 1000,
    locale: store.get('locale') || 'en-US',
    ord_status:{    
	                0: "ok",
	                1: "confirm_nothing",
	                2: "request_error",
	                3: "no_shoplist",
	                4: "order_running",
	                5: "valve_overload",
	                6: "valve_closed",
	                7: "valve_error",
	                8: "position_existed",
	                9: "mend",
	                10: "no_position_existed",
	                11: "mt4 direct"
              	},
    limit_order_types: ['Instant','Market','Pending','Stopout','StopLoss','TakePro']
};