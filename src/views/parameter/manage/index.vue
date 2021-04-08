<template>
  <el-row :gutter="40">
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>订单参数设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">自动取消时间</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">自动收货时间</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">可售后时段</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">最小订单支付金额</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">用户可取消订单时间</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">管理员可取消订单时间<br />（推送ERP时间）</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">自提订单超时未提取自动取消订单时间</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>发票参数设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">发票收款人</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">发票复核人</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">发票可申请时间</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
        </ul>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>库存提醒设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">发票收款人</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">发票复核人</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">发票可申请时间</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.el-card {
  margin-bottom: 20px;
}
.list {
  .list-item {
    display: flex;
    // height: 55px;
    border-bottom: 1px solid #ddd;
    flex-direction: row;
    align-items: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    color: #666;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }
    .title {
      flex: 1;
      padding-right: 20px;
    }
    .value {
      width: 80px;
    }
    .el-button {
      // width: 50px;
      margin: 0 10px;
    }
  }
}
</style>