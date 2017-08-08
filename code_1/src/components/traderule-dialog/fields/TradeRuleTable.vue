<template>
    <div>
        <el-row  :gutter="20" class='actions-top'>
<!--         <el-col :span='3' >
      <el-input
      placeholder="输入关键字"
      icon="search"
      v-model="keyword"
      :on-icon-click="handleIconClick">
    </el-input>
    </el-col> -->
    <el-col :span='21'>
                <el-button type='primary' @click='onAddRule()'>{{$t('Add rule')}}</el-button>
                <el-button type='primary' @click='onEditRules()'>{{$t('Edit rules')}}</el-button>
                <el-button type='primary' @click='ondefaultSplippage()'>{{$t('Revert splippage to default')}}</el-button>
                <el-button type='primary' @click='onSubmitChanges()'>{{$t('Submit Changes')}}</el-button>
                <el-button type='primary' @click='onInvertSelect()'>{{$t('Invert select')}}</el-button>
                <el-button type='danger'  :disabled="batch_flag" @click='onBatchDelete()'>{{$t('Delete selected rules')}}</el-button>
                </el-col>
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig"
      class = 'trade_rule'
      @selection-change = 'onSelectionChange '
      >
        <template slot="handler" scope="scope">
              <el-button
                  type="info"
                  icon='edit'
                  size="mini"
                  @click='onEditRowRule(scope.row)'></el-button>
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                 @click='onSingleDelete(scope.row)' ></el-button>
        </template>
        <template slot="route_type" scope="scope">
                <div  v-if = 'editFlag'>
                        <div class='route_type'>
                        <span>if size >=</span>
                        <el-input 
                            class='threshold_input'
                            v-model="scope.row.attributes.route_type.threshold"
                            >
                            </el-input> 
                        </div>
                        <div class='route_type'>
                            <span>then</span>
                            <el-select  v-model="scope.row.attributes.route_type.right">
                                <el-option value="best" label="best"></el-option>
                                <el-option value="bestright" label="bestright"></el-option>
                                <el-option value="second" label="second"></el-option> 
                                <el-option value="ratio" label="ratio"></el-option>             
                            </el-select> 
                       </div>
                       <div class='route_type'>
                            <span>else</span>
                            <el-select v-model="scope.row.attributes.route_type.left">
                                <el-option value="best" label="best"></el-option>
                                <el-option value="bestright" label="solid"></el-option>
                                <el-option value="second" label="second"></el-option> 
                                <el-option value="ratio" label="ratio"></el-option>             
                            </el-select>
                       </div>
                </div>
                <div v-if = '!editFlag'>
                          &gt;=&nbsp;{{scope.row.attributes.route_type.threshold}}&nbsp;then&nbsp;{{scope.row.attributes.route_type.right}}&nbsp;else&nbsp;{{scope.row.attributes.route_type.left}}
                </div>
        </template>
        <template slot="limit_order_types" scope="scope">
               <div v-if = '!editFlag'
               v-for='item in scope.row.attributes.limit_order_types'>
               {{$store.state.global.limit_order_types[item.type]+' '+item.tol}}
               </div>
        </template>
               <!-- <div
                class="limit_order_types_edit" 
                v-for='(item,index) in  $store.state.global.limit_order_types'  
               >
                    <el-input
                            v-model='scope.row.convert_limit_order_types[index].input_val'
                            type="input"
                            placeholder='tolerate'
                    >
                    <el-checkbox  
                    v-model="scope.row.convert_limit_order_types[index].checkbox_val" 
                    class='checkbox_item' slot="prepend"  size='small'  >{{item}}</el-checkbox>
                </el-input>
               </div> -->       
        <template slot="coverage" scope="scope">
                <el-input
                            v-if='editFlag'  
                            type="input"
                            v-model="scope.row.attributes.coverage"
                            >
                </el-input>          
                <span v-if = '!editFlag'>{{scope.row.attributes.coverage}}</span>   
          </template>
          <template slot="better_fill" scope="scope">
              <el-input 
                            v-if='editFlag'
                            type="number"
                            v-model="scope.row.attributes.better_fill"
                            >
             </el-input>
            <span v-if = '!editFlag'>{{scope.row.attributes.better_fill}}</span>   
          </template>
<!--           <template slot="slippages" scope="scope">
               <div v-if= '!editFlag' v-for='item in scope.row.attributes.slippages'>{{item.join(',')}}</div>
        </template> -->
          <!-- <template slot="slippages" scope="scope">
                    <el-row  v-if='scope.row.attributes.slippages.length>0' v-for="group in scope.row.attributes.slippages" style="margin-left:10px;margin-bottom:10px">
                        <el-col :span="3"  v-for="inputItem in group">
                            <el-input  v-model="inputItem" :placeholder="inputItem.playholder">
                            </el-input>
                        </el-col>
                        <el-col :span="5" >
                            <el-button @click.prevent="removeSlippages(group)">Delet
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                            <el-col :span="24" style="margin-left:20px;"> 
                                <el-button @click.prevent="addSlippages">Add
                                </el-button>
                            </el-col>
                    </el-row>
          </template> -->
          <template slot="open_partial" scope="scope">
                <el-select v-if='editFlag' v-model="scope.row.attributes.open_partial ">
                    <el-option :value="true" label="true"></el-option>
                    <el-option :value="false" label="false"></el-option>             
                </el-select>
                <span v-if='!editFlag'>{{scope.row.attributes.open_partial}}</span>
          </template>       
        <template slot="bbook_exec_type" scope="scope">
                <el-select v-if='editFlag'  v-model="scope.row.attributes.bbook_exec_type">
                             <el-option value="vwap" label="vwap"></el-option>
                             <el-option value="worst" label="worst"></el-option>           
                </el-select>
                <span v-if='!editFlag'>{{scope.row.attributes.bbook_exec_type}}</span>
        </template>
        <template slot="lps" scope="scope">
                 <el-checkbox-group v-if='editFlag'  v-model="scope.row.attributes.lps">
                    <el-checkbox v-for='item in $store.state.global.lps' :label='item'></el-checkbox>
                  </el-checkbox-group>
                   <div v-if= '!editFlag'>
                          <span v-for ='lp in scope.row.attributes.lps'>{{lp}}&nbsp;</span>
                   </div>
        </template>
    </bel-table> 
  </div>
</template>
  
<script >
import TradeRuleTableJs from './TradeRuleTable.js';
export default TradeRuleTableJs;
</script>
<style scoped lang='less'>
.route_type{
    margin-top:10px;
}
.select{
    width:80px;

}
</style>