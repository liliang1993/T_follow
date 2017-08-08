<template>
  <div>
      <!-- <drag-dialog
                v-for = "(item,key) in $store.state.traderule.view_rules_dialogs"
                :key = 'key'
                :title="item.title"
                @close="onCloseDialog(key)"
        >
            <trade-rule-table :Config= 'item'></trade-rule-table>
      </drag-dialog> -->
  </div>
</template>

<script>
    import TradeRuleDialogJS from './TraderuleDialog.js';
    export default TradeRuleDialogJS;
</script>

<style scoped lang='less'>
    
</style>
