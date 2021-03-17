<template>
  <h3>会员列表</h3>
  <ul>
    <li>手机号</li>
    <li><input type="text" placeholder="请输入手机号"/></li>
    <li>手机号</li>
    <li><input type="text" placeholder="请输入手机号"/></li>
    <li>手机号</li>
    <li><input type="text" placeholder="请输入手机号"/></li>
    <li>手机号</li>
    <li><input type="text" placeholder="请输入手机号"/></li>
    <li>手机号</li>
    <li><input type="text" placeholder="请输入手机号"/></li>
    <li><button type="submit">查询</button></li>
  </ul>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="编号"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
   <!-- <el-table-column
      label="姓名"
      width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column> -->

    <el-table-column
      label="头像"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="手机号"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="姓名"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="身份证号"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="会员卡号"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="银行卡号"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="会员状态"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "MemberDetail",
    props:{
      data: {
        type: String,
        default: '绑卡信息'
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped="scoped">
  
   ul {
     list-style: none;
     display: block;
     height: 82px;
     margin-top: 20px;
     margin-bottom: 24px;
     padding-left: 8px;
     background-color: yellow;
    }
    ul li{
      float: left;
      background-color: #ffffff;
      }
    ul li:nth-child(even) input{
      width: 200px;
      border: 1px solid #d1d3e2;
      height: 38px;

    }
    /* div .el-row .el-col {
        line-height: 38px;
        background-color: #ffffff;
    }
    div .el-row .el-col span{
          font-size: 14px;
          color: #858796;
    }
    div .el-row .el-col input{
      display: block;
      border: 1px soild #d1d3e2;
      background-color: red;
    } */
</style>
