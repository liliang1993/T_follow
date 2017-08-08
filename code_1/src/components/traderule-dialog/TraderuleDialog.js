import TraderuleTable from './fields/';
export default {
  name: 'traderuledialog',
  components: {
    TraderuleTable
  },
  methods: {
    onCloseDialog(key) {
      this.$store.dispatch('delete_view_rules_dialogs', key);
    }
  }
}