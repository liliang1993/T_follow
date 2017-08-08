<template>
    <div class='clearfix'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click='onAddUser()'>{{$t('Add user')}}</el-button>
        </el-col> 
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="status" scope="scope">
              <span :style="scope.row.status== 0 ? 'color:black;' : 'color:red;' ">{{scope.row.status == 0 ? 'Enabled' : 'Disabled'}}</span>
          </template>
          <template slot="handler" scope="scope">
              <el-button
                  type="info"
                  icon='edit'
                  size="mini"
                  @click='onEditUser(scope.row)'></el-button>
          </template>
    </bel-table> 
    <el-col :span="24" class='btm-action'>
            <el-pagination
                class='pagination'
                :page-sizes="pagination.page_sizes"
                :page-size="pagination.page_size"
                :layout="pagination.layout"
                :total="pagination.total"
                :current-page='pagination.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'
             >
            </el-pagination>
      </el-col>

        <drag-dialog
                v-if = 'add_user_dialog.show'
                :title="add_user_dialog.title"
                :isModal = 'add_user_dialog.isModal'
                @close="onCloseDialog('add_user_dialog')"
          >
                <form-data
                 ref='add_user_form'
                  :DefaultValue='add_user_dialog.default_value'
                  :FieldList='add_user_dialog.fields'
                  @onSubmit='add_user_submit'

                  >
                  </form-data>
        </drag-dialog>

         <drag-dialog
                v-if='edit_user_dialog.show'
                :title="edit_user_dialog.title"
                :isModal = 'edit_user_dialog.isModal'
                @close="onCloseDialog('edit_user_dialog')"
          >
                <form-data
                 ref='edit_user_form'
                  :DefaultValue='edit_user_dialog.default_value'
                  :FieldList='edit_user_dialog.fields'
                  @onSubmit='edit_user_submit'
                  >
                  </form-data>
        </drag-dialog>
  </div>
</template>
  
<script >
import UserJs from './User.js';
export default UserJs;
</script>
<style scoped lang='less'>
     @import url(User.less);
</style>