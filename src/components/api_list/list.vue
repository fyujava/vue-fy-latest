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
                <span>方玉</span>
            </el-header>

            <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        el:'tableData',
        data:{
            tableData:[],
            apiList:'/api/list'
        },
        created:function () {
            this.getApiList()
        },
        methods:{
            getApiList:function () {
               var that = this
                that.$http({
                    method:'GET',
                    url:this.apiList
                }).then(function (response) {
                    this.tableData = response.data
                }),function (error) {
                    alert(error)
                }
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