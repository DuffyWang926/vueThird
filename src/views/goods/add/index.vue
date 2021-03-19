<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>添加商品</span>
      </div>
    </template>
    <el-steps :active="activeIndex" finish-status="success" align-center>
      <el-step title="产品基本信息"></el-step>
      <el-step title="产品相关图片"></el-step>
      <el-step title="产品规格及子产品"></el-step>
      <el-step title="产品描述及详情"></el-step>
    </el-steps>
    <el-form
      ref="step1FormRef"
      v-show="activeIndex === 0"
      :model="step1Form"
      label-width="80px"
    >
      <el-form-item label="产品名称" prop="name">
        <el-input
          placeholder="产品名称"
          size="large"
          v-model="step1Form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品编码" prop="code">
        <el-input
          placeholder="产品编码"
          size="large"
          v-model="step1Form.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="仓库" prop="warehouseId">
        <el-select placeholder="----请选择----" v-model="step1Form.warehouseId">
          <el-option
            label="----请选择----"
            value=""
            disabled
            v-show="false"
          ></el-option>
          <el-option
            v-for="item in warehouses"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="税率种类" prop="taxe">
        <el-select placeholder="----请选择----" v-model="step1Form.taxe">
          <el-option
            label="----请选择----"
            value=""
            disabled
            v-show="false"
          ></el-option>
          <el-option
            v-for="item in taxes"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="是否自营">
            <el-switch> </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      ref="step2FormRef"
      v-show="activeIndex === 1"
      :model="step2Form"
      label-width="80px"
    ></el-form>
    <el-form
      ref="step3FormRef"
      v-show="activeIndex === 2"
      :model="step3Form"
      label-width="80px"
    ></el-form>
    <el-form
      ref="step4FormRef"
      v-show="activeIndex === 3"
      :model="step4Form"
      label-width="80px"
    ></el-form>
    <div style="display: flex; justify-content: center">
      <el-button
        type="primary"
        @click="prevStep"
        size="large"
        v-if="activeIndex > 0"
        >上一步</el-button
      >
      <el-button
        :type="activeIndex === 3 ? 'success' : 'primary'"
        @click="nextStep"
        size="large"
        >{{ activeIndex === 3 ? '提交' : '下一步' }}</el-button
      >
    </div>
  </el-card>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import lodash from 'lodash'
import service from '@/utils/request'
export default {
  setup() {
    const activeIndex = ref(0)
    const step1FormRef = ref(null)
    const step2FormRef = ref(null)
    const step3FormRef = ref(null)
    const step4FormRef = ref(null)
    const step1Form = reactive({
      name: '',
      code: '',
      warehouseId: '',
      taxe: ''
    })
    const step2Form = reactive({})
    const step3Form = reactive({})
    const step4Form = reactive({})
    const nextStep = () => {
      const currentForm = eval('step' + (activeIndex.value + 1) + 'FormRef')
        .value
      console.log(currentForm)
      if (activeIndex.value < 3) {
        activeIndex.value++
      } else {
      }
    }
    const prevStep = () => {
      if (activeIndex.value > 0) {
        activeIndex.value--
      }
    }
    const warehouses = ref([])
    const getWarehouses = async () => {
      const { data: res } = await service.get('getAllWarehouses')
      warehouses.value = res.warehouses
      console.log(warehouses.value)
    }
    getWarehouses()
    const taxes = ref([])
    const getTaxes = async () => {
      const { data: res } = await service.get('getAllTaxes')
      taxes.value = res.taxes
      console.log(taxes.value)
    }
    getTaxes()
    return {
      activeIndex,
      step1FormRef,
      step2FormRef,
      step3FormRef,
      step4FormRef,
      step1Form,
      step2Form,
      step3Form,
      step4Form,
      nextStep,
      prevStep,
      warehouses,
      taxes
    }
  }
}
</script>

<style scoped lang="scss">
.el-steps {
  margin-bottom: 20px;
}
.el-input,
.el-select {
  width: 400px;
}
</style>