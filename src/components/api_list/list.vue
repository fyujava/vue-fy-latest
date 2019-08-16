<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>restapi</template>
                    <el-menu-item-group>
                        <template slot="title">api</template>
                        <el-menu-item index="1-1">api_list</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="student">
                        <el-menu-item index="1-3">student_list</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">musician</template>
                        <el-menu-item index="1-4-1">alomo</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>select user</el-dropdown-item>
                        <el-dropdown-item>add user</el-dropdown-item>
                        <el-dropdown-item>del user</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{username}}</span>
            </el-header>

            <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="id" label="id" width="140"></el-table-column>
                    <el-table-column prop="created" label="created" width="120"></el-table-column>
                    <el-table-column prop="title" label="title"></el-table-column>
                    <el-table-column prop="code" label="code"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="handleDelete(scope.$index,scope.row)"  type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>

        <!--查看内容-->
        <el-dialog title="详细信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="id" :label-width="formLabelWidth">
                        <el-input v-model="form.id" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="created" :label-width="formLabelWidth">
                        <el-input v-model="form.created" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="title" :label-width="formLabelWidth">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="code" :label-width="formLabelWidth">
                        <el-input v-model="form.code" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleEdit(form)">确 定</el-button>
                </div>
            </el-dialog>
    </el-container>
</template>

<script>
    export default {
        data: function () {
            return {
                tableData: [{date: '123123', name: '1223', address: 'asdfas'}],
                form: {
                    date: '',
                    name: '',
                    address: '',
                },
                formLabelWidth: '120px',
                dialogFormVisible: false,
            }
        },
        computed: {
      username(){
        let username = localStorage.getItem('ms_username');
        return username ? username : this.name;
      }
    },
        created() {
            this.queryapiList()
        },
        methods: {
            queryapiList: function () {
                this.$http.get('http://192.168.180.29:8000/api/name/?format=json').then((response) => {
                    this.tableData = response.data
                })
            },
            handleClick:function(row) {
                this.form=row;
                this.dialogFormVisible=true
            },
            handleDelete:function (index,row) {
                var id = row.id;
                var url = "http://192.168.180.29:8000/api/name/"+id+"/";
                this.$http.delete(url).then((response)=>{
                    this.$message('删除成功'+response.data);
                    this.tableData.splice(index, 1);
                })
            },
            handleEdit:function (form) {
                var url = "http://192.168.180.29:8000/api/name/"+form.id+"/?format=json";
                this.$http.put(url,{title:form.title,code:form.code}).then((response)=>{
                    this.$message('修改成功'+response.data);
                    this.queryapiList();
                    this.dialogFormVisible = false;

                })

            }


        }

    };
</script>
<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>