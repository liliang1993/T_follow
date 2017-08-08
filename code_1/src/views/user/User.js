/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
    name: 'user_list',
    data () {
      return {
          add_user_dialog:{
                show:false,
                isModal: true,
                title:{
                  text:'Add user'
                },
                fields:[
                  {
                      type:'input',
                      key:'username',
                      label: 'User'
                  },
                  {
                    type:'input',
                      key:'password',
                      label: 'Password'
                  },
                  {   
                      key:'role',
                      type: 'select',
                      desc: '请选择',
                      label: 'Role',
                      list: (()=>{
                            var i,len,roles,role,result;
                            result = [];
                            roles = this.$store.state.global.roles;
                            console.log('roles',roles);
                            for (i = 0 ,len = roles.length; i<len; i++) {
                                     role = roles[i];
                                     result.push({value: role,text:role});
                            }
                            console.log('result',result);
                          return result;
                      })()
                    
                  },
                  {
                    type:'input',
                      key:'lps',
                      label: 'LPs'
                  },
                  {
                    type:'input',
                      key:'groups',
                      label: 'Groups'
                  },
                  {
                      type:'input',
                      key:'symbols',
                      label: 'MT4 Symbols'
                  },            
                  {
                      type:'input',
                      key:'desc',
                      label: 'Description'
                  }],
                  default_value:{
                    role:'Admin'
                  }
          },



          edit_user_dialog:{
                show:false,
                isModal: true,
                title:{
                  text:'Edit User'
                },
                fields:[{
                    type:'input',
                    key:'username',
                    label: 'User',
                    disabled: true,
                },
                {
                  type:'input',
                    key:'password',
                    desc:'Input nothing means no change',
                    label: 'Password'
                },
                {
                    key: 'role',
                    type: 'select',
                    desc: '请选择',
                    label: 'Role',
                    list: (()=>{
                              var i,len,roles,role,result;
                              result = [];
                              roles = this.$store.state.global.roles;
                              for (i = 0 ,len = roles.length; i<len; i++) {
                                       role = roles[i];
                                       result.push({value: role,text:role});
                              }
                              return result;
                        })()

                },
                   {
                    type:'input',
                    key:'lps',
                    value:'',
                    label: 'LPs'
                },
                 {
                    type:'input',
                    key:'groups',
                    label: 'Groups'
                },
                {
                    type:'input',
                    key:'symbols',
                    label: 'MT4 Symbols'
                }, 
                {
                    key: 'status',
                    type: 'select',
                    desc: '请选择',
                    label: 'status',
                    list: [
                          {value: 0, text : 'Enabled'},
                          {value: 1, text : 'Disabled'}
                        ]

              },
              {
                    type:'input',
                    key:'desc',
                    label: 'Description'
              }],
              default_value:{}
          },
        tableData: [] ,
        pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
      }
    },
    computed:{
      tableConfig: {
        get () {
          return {
            table: {
              attr: {
                data: this.tableData,
                maxHeight: '100%',
                defaultSort:{prop: 'std_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'user_id',
                  label:  this.$t('user_id'),
                  minWidth: 180,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'username',
                  label: this.$t('username'),
                  minWidth: 180,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'role',
                  label: this.$t('role'),
                  minWidth: 180,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'status',
                  label: this.$t('status'),
                  width: 100,
                  align: 'center',
                  scopedSlot: 'status'
                }
              },{
                attr: {
                  prop: 'update_time',
                  label: this.$t('update_time'),
                  width: 180,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'create_time',
                  label: this.$t('create_time'),
                  minWidth: 180,
                  align: 'center'
                }
              },{
                attr: {
                  label: this.$t('edit'),
                  minWidth: 180,
                  scopedSlot: 'handler',
                  align: 'center'
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        onCloseDialog(type){
          this[type].show = false;

         },
        onAddUser(){      
            this.add_user_dialog.show = true; 
        },

        onEditUser(row) {
            this.edit_user_dialog.show = true; 
            this.$nextTick(() => {
                  Object.assign(this.edit_user_dialog.default_value,row,{password:''});         
            });
        },
        add_user_submit(data){
               this.$$api_common_ajax({
                data: {
                  func_name:'user.create_user',
                  args:[data.username, data.password, data.role, data.desc],
                  kwargs:{groups:data.groups,  lps: data.lps ,symbols: data.symbols}
                },
                fn: data => {
                    this.find_page_user();
                    this.add_user_dialog.show  = false;
                },
                errFn: (err) => {
                }
              });           
        },
        edit_user_submit(data){
                  this.$$api_common_ajax({
                    data: {
                      func_name:'user.update_user',
                      args:[data.user_id, data.password, data.role, data.status, data.desc ],
                      kwargs:{groups:data.groups,  lps: data.lps ,symbols: data.symbols}
                    },
                    fn: data => {
                        this.find_page_user();
                        this.edit_user_dialog.show  = false;
                    },
                    errFn: (err) => {
                      this.$message({
                        showClose: true,
                        message: err.response.data,
                        type: 'error'
                      });
                    }
                  });      
        },  

    /*
      
    */
    onChangeCurrentPage(page){
        this.pagination.current_page = page;
        this.find_page_user();
    },
    onChangePageSize(page_size){
        this.pagination.page_size = page_size;
        this.find_page_user();
    },
    find_page_user(){
      this.$$api_common_ajax({
        data: {
          func_name:'user.page_user',
          args:[this.pagination.current_page,this.pagination.page_size],
          kwargs:{}
        },
        fn: data => {
            this.tableData = data[0];
            this.pagination.total = data[1];
        },
        errFn: (err) => {
          this.$message({
                        showClose: true,
                        message: err.response.data,
                        type: 'error'
                      });
        }
      });
    },


    init(){
        this.find_page_user();
        console.log('store',this.$store.state.global.roles);
    }
    },
    mounted() {
        this.init();
    }
}
