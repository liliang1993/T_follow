export default {
  name: 'view-rules',
  data() {
    return {
      editFlag: false,
      batch_flag: true,
      batch_datas: [],
      keyword: '',
      tableData: [],
      config: this.Config,
      columns: [{
        attr: {
          type: 'selection',
          width: 60,
          align: 'center'
        }
      }, {
        attr: {
          prop: 'mt4_symbol',
          label: this.$t('MT4 symbol'),
          width: 90,
          sortable: true,
          align: 'center'
        }
      }, {
        attr: {
          prop: 'std_symbol',
          label: this.$t('STD symbol'),
          width: 90,
          sortable: true,
          align: 'center'
        }
      }, {
        attr: {
          prop: 'route',
          label: this.$t('Route'),
          width: 120,
          sortable: true,
          align: 'center',
          scopedSlot: 'route_type',
        }
      }, {
        attr: {
          prop: '',
          label: this.$t('Limit orders types'),
          width: 150,
          sortable: true,
          align: 'center',
          scopedSlot: 'limit_order_types_normal'
        }
      }, {
        attr: {
          prop: 'attributes.coverage',
          label: this.$t('Coverage'),
          width: 100,
          sortable: true,
          align: 'center',
          scopedSlot: 'coverage',
        }
      }, {
        attr: {
          prop: 'attributes.better_fill',
          label: this.$t('BetterFill'),
          width: 100,
          sortable: true,
          align: 'center',
          scopedSlot: 'better_fill'
        }
      }, {
        attr: {
          prop: 'attributes.slippages',
          label: this.$t('slippages'),
          width: 80,
          sortable: true,
          align: 'center',
          formatter: function(item) {
            var res = '';
            item.attributes.slippages.forEach(group => {
              res += group.join(',') + '\n';
            });
            return res;
          },
          scopedSlot: 'slippages'
        }
      }, {
        attr: {
          prop: 'attributes.open_partial',
          label: this.$t('Open Partial'),
          minWidth: 100,
          sortable: true,
          align: 'center',
          scopedSlot: 'open_partial'
        }
      }, {
        attr: {
          prop: 'attributes.open_lp_rejected_retry',
          label: this.$t('LP Rejected Retry'),
          width: 120,
          sortable: true,
          align: 'center',
          scopedSlot: 'open_lp_rejected_retry'
        }
      }, {
        attr: {
          prop: 'attributes.bbook_exec_type',
          label: this.$t('BBook Exec Type'),
          width: 120,
          sortable: true,
          align: 'center',
          scopedSlot: 'bbook_exec_type'
        }
      }, {
        attr: {
          prop: 'attributes.lps',
          label: this.$t('LPs'),
          minWidth: 60,
          sortable: true,
          align: 'center',
          scopedSlot: 'lps'
        }
      }, {
        attr: {
          label: this.$t('Operation'),
          minWidth: 80,
          align: 'center',
          scopedSlot: 'handler'
        }
      }]
    }
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: {
                prop: 'group'
              }
            }
          },
          columns: this.columns
        }
      }
    },
    get_trade_rules() {
      return this.$store.state.traderule.trade_rules;
    }
  },
  methods: {
    closeDialog(key) {
      this.$store.dispatch('delete_view_rules_dialogs', key);
    },
    onInvertSelect() {
      this.toggleSelection(this.tableData);
    },

    onSingleDelete(row) {
      this.$confirm('你确定删除吗', 'prompt', {
        type: 'warning'
      }).then(() => {
        var params = {
          func_name: 'router_api.trade_del_rule',
          args: [row.source, row.group, row.mt4_symbol]
        };
        CommonApi.postFormAjax.call(this, params, data => {
          this.$store.dispatch('update_traderule_table', true);
        })
      })
    },

    group_rules_edited() {

    },
    toggleSelection(rows) {
      if (rows) {
        console.log('22222');
        rows.forEach(row => {
          console.log('555', this.$refs.table);
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection(row)
      }
    },
    onSelectionChange(val) {
      if (val.length) {
        this.batch_flag = false;
        this.batch_datas = val;
      } else {
        this.batch_flag = true;
      }
    },
    onBatchDelete() {
      var selected_rules, i, len, rule;
      selected_rules = [];
      this.$confirm('你确定删除吗', 'prompt', {
        type: 'warning'
      }).then(() => {
        console.log('this.batch_datas', this.batch_datas);
        for (i = 0, len = this.batch_datas.length; i < len; i++) {
          rule = this.batch_datas[i];
          selected_rules.push({
            source: rule.source,
            group: rule.group,
            mt4_symbol: rule.mt4_symbol
          });
        }
        var params = {
          func_name: 'router_api.trade_del_rules',
          args: [selected_rules]
        };
        CommonApi.postFormAjax.call(this, params, data => {
          this.$store.dispatch('update_traderule_table', true);
        })
      })
    },
    onEditRules() {
      this.editFlag = true;
      console.log('this.columns', this.columns);
    },
    onSubmitChanges() {
      this.editFlag = false;
      console.log('this.columns', this.columns);
    },
    load_data() {
      this.tableData = [];
      for (var k in this.$store.state.traderule.trade_rules) {
        var rule = this.$store.state.traderule.trade_rules[k];
        var source = this.config.source;
        var group = this.config.group;
        if (rule.source === source && rule.group === group) {
          var new_rule = this.deepCopy(rule);
          new_rule.source = source;
          new_rule.group = group;
          this.tableData.push(new_rule);
        }
      }
    }
  },
  mounted() {
    this.load_data();
  },
  props: {
    Config: {
      type: Object,
      required: true
    }
  },
  watch: {
    Config(v) {
      if (v) {
        this.config = v;
      }
    },
    get_trade_rules(v) {
      console.log('config', v);
      if (v) {
        this.load_data();
      }
    }
  }
}