<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>添加团购活动</span>
      </div>
    </template>
    <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="140px" label-position="right" v-loading="loading">
      <div class="seperator">基本信息设置</div>
      <el-form-item label="活动名称" prop="name">
        <el-row class="w800">
          <el-col :span="7">
            <el-input placeholder="请输入活动名称" size="large" v-model="addForm.name"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="活动时间" :rules="[{ required: true, message: '', trigger: 'blur' }]">
        <el-row class="date-row w800">
          <el-col :span="7">
            <el-form-item prop="startDate">
              <el-date-picker v-model="addForm.startDate" type="datetime" placeholder="开始日期"> </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">至</el-col>
          <el-col :span="7">
            <el-form-item prop="endDate">
              <el-date-picker v-model="addForm.endDate" type="datetime" placeholder="结束日期"> </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="团购商品" :rules="[{ required: true, message: '', trigger: 'blur' }]">
        <el-row class="w800">
          <el-button type="primary" size="medium" style="margin-right: 10px" @click="dialogVisible = true" v-if="!productFlag">选择商品</el-button>
          <el-button type="warning" size="medium" @click="dialogVisible = true" v-else>更换商品</el-button>
        </el-row>
        <el-table :data="[product]" style="width: 800px; margin-top: 10px" v-if="productFlag" border>
          <el-table-column prop="name" label="商品"></el-table-column>
          <el-table-column label="原价">
            <template #default="scope">
              {{ scope.row.subProducts[0].nowPrice }}
            </template>
          </el-table-column>
          <el-table-column label="原积分">
            <template #default="scope">
              {{ scope.row.subProducts[0].points }}
            </template>
          </el-table-column>
          <el-table-column label="团购价格" width="150">
            <template #default="scope">
              <el-input
                v-model="scope.row.groupPrice"
                @blur="scope.row.groupPrice = isNaN(parseFloat(parseFloat(scope.row.groupPrice).toFixed(2))) ? '请输入合法数值' : parseFloat(parseFloat(scope.row.groupPrice).toFixed(2))"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="团购积分" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.groupPoints" @blur="scope.row.groupPoints = isNaN(parseInt(scope.row.groupPoints)) ? '请输入合法数值' : parseInt(scope.row.groupPoints)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="每份购买数量" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.eachNum" @blur="scope.row.eachNum = isNaN(parseInt(scope.row.eachNum)) ? '请输入合法数值' : parseInt(scope.row.eachNum)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="参团规格">
            <template #default="scope">
              <el-row v-for="item in scope.row.subProducts">{{ [item.colour, item.size].join(';') }}</el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="能否单独购买" prop="canSingleBuy">
        <el-row class="w800">
          <el-col :span="7">
            <el-select placeholder="----请选择----" v-model="addForm.canSingleBuy" @click="addFormRef.validateField('canSingleBuy')" style="width: 100%">
              <el-option label="----请选择----" value="" disabled v-show="false"></el-option>
              <el-option :value="2" label="可以单独购买"></el-option>
              <el-option :value="1" label="不可单独购买"></el-option>
            </el-select>
          </el-col>
          <el-col :span="17">
            <el-alert title="是否可以按照原价单独购买" type="info" show-icon :closable="false"> </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="拼团时效" prop="duration">
        <el-row class="w800">
          <el-col :span="7" style="display: flex">
            <el-input
              placeholder="请输入拼团时效"
              v-model="addForm.duration"
              @blur="addForm.duration = isNaN(parseInt(addForm.duration)) ? '请输入合法数值' : parseInt(addForm.duration)"
              style="flex: 1"
            ></el-input>
            <span style="width: 40px; padding-left: 10px">小时</span>
          </el-col>
          <el-col :span="17">
            <el-alert title="用户开团后多长时间内需达成拼团要求" type="info" show-icon :closable="false"> </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="活动规则概述" prop="activityRules">
        <el-row class="w800">
          <el-col :span="7">
            <el-input placeholder="活动概述（不超过20个字符）" v-model="addForm.activityRules" @blur="addForm.activityRules = addForm.activityRules.trim()"></el-input>
          </el-col>
          <el-col :span="17">
            <el-alert title="显示在商品详情页，结算页面" type="info" show-icon :closable="false"> </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="开团规则描述" prop="startGroupBuyRules">
        <el-row class="w800">
          <el-col :span="10">
            <el-input
              placeholder="开团规则描述（不超过120个字符）"
              v-model="addForm.startGroupBuyRules"
              @blur="addForm.startGroupBuyRules = addForm.startGroupBuyRules.trim()"
              type="textarea"
              resize="none"
              :rows="4"
            ></el-input>
          </el-col>
          <el-col :span="14">
            <el-alert title="显示在开团人的商品详情页和团购详细介绍处" type="info" show-icon :closable="false"> </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="成团规则描述" prop="finishGroupByRules">
        <el-row class="w800">
          <el-col :span="10">
            <el-input
              placeholder="成团规则描述（不超过120个字符）"
              v-model="addForm.finishGroupByRules"
              @blur="addForm.finishGroupByRules = addForm.finishGroupByRules.trim()"
              type="textarea"
              resize="none"
              :rows="4"
            ></el-input>
          </el-col>
          <el-col :span="14">
            <el-alert title="显示在参团人的商品详情页和团购详细介绍处" type="info" show-icon :closable="false"> </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="分享文案" prop="shareText">
        <el-row class="w800">
          <el-col :span="7">
            <el-input placeholder="分享文案（不超过20个字符）" v-model="addForm.shareText" @blur="addForm.shareText = addForm.shareText.trim()"></el-input>
          </el-col>
          <el-col :span="17">
            <el-alert title="显示在小程序分享卡片上" type="info" show-icon :closable="false"> </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="seperator" style="margin-top: 10px">会员条件设置</div>
      <el-form-item label="开团人员级别限制" prop="startGroupBuyLevels">
        <el-checkbox-group v-model="addForm.startGroupBuyLevels">
          <el-checkbox label="v0"></el-checkbox>
          <el-checkbox label="v1"></el-checkbox>
          <el-checkbox label="v2"></el-checkbox>
          <el-checkbox label="v3"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="开团人成团奖励" :rules="[{ required: true, message: '', trigger: 'blur' }]" v-if="addForm.startGroupBuyLevels.length > 0">
        <el-row class="money-row">
          <el-col :span="7">
            <el-form :model="addForm.groupBuyRewards">
              <el-form-item :label="key" label-width="40px" v-for="(value, key) in addForm.groupBuyRewards" :key="key" style="padding-bottom: 10px">
                <el-input
                  v-model="addForm.groupBuyRewards[key]"
                  @blur="
                    addForm.groupBuyRewards[key] = isNaN(parseFloat(parseFloat(addForm.groupBuyRewards[key]).toFixed(2)))
                      ? '请输入合法数值'
                      : parseFloat(parseFloat(addForm.groupBuyRewards[key]).toFixed(2))
                  "
                ></el-input>
                <span style="width: 60px; text-align: center">元/件</span>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="17">
            <el-alert type="info" show-icon :closable="false" style="line-height: 20px">
              <template v-slot:title> 不同级别可设定不同的奖励制度，此处设定的为每件商品的返利金额<br />如：商品A，每份购买数量要求是3，则用户每购买一份团长可得奖励为n*3元 </template>
            </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="开团人购买要求" prop="startGroupBuyRequirement" style="margin-top: 10px">
        <el-row class="w800">
          <el-col :span="7">
            <el-select placeholder="----请选择----" v-model="addForm.startGroupBuyRequirement" @click="addFormRef.validateField('startGroupBuyRequirement')" style="width: 100%">
              <el-option label="----请选择----" value="" disabled v-show="false"></el-option>
              <el-option :value="2" label="无需购买"></el-option>
              <el-option :value="1" label="首次开团购买"></el-option>
              <el-option :value="0" label="多次开团都需购买"></el-option>
            </el-select>
          </el-col>
          <el-col :span="17">
            <el-alert
              title="只针对活动进行控制不针对产品，如选择“首次开团购买”，则同一个活动下次开团可不必购买，如同一个商品再次设置团购活动，则仍然是“首次开团购买”，则还需要再买一次才能开团。"
              type="info"
              show-icon
              :closable="false"
              style="line-height: 20px; height: 60px; margin-top: -10px"
            >
            </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="参团人员级别限制" prop="joinGroupBuyLevels">
        <el-checkbox-group v-model="addForm.joinGroupBuyLevels">
          <el-checkbox label="v0"></el-checkbox>
          <el-checkbox label="v1"></el-checkbox>
          <el-checkbox label="v2"></el-checkbox>
          <el-checkbox label="v3"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="参团新人数量要求" prop="v0MinNum">
        <el-row class="w800">
          <el-col :span="7">
            <el-input v-model="addForm.v0MinNum" @blur="addForm.v0MinNum = isNaN(parseInt(addForm.v0MinNum)) ? '请输入合法数值' : parseInt(addForm.v0MinNum)"></el-input>
          </el-col>
          <el-col :span="17">
            <el-alert title="新人：指V0。" type="info" show-icon :closable="false" style="line-height: 40px"> </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="参团总人数要求" prop="totalMinNum">
        <el-row class="w800">
          <el-col :span="7">
            <el-input v-model="addForm.totalMinNum" @blur="addForm.totalMinNum = isNaN(parseInt(addForm.totalMinNum)) ? '请输入合法数值' : parseInt(addForm.totalMinNum)"></el-input>
          </el-col>
          <el-col :span="17">
            <el-alert
              title="含新人数，只有新人数和总人数都达到要求时，才能成团；如在成团后发起了售后导致不满足新人和总人数要求，则团长不能获得奖励。"
              type="info"
              show-icon
              :closable="false"
              style="line-height: 20px; height: 40px"
            >
            </el-alert>
          </el-col>
        </el-row>
      </el-form-item>
      <el-row style="width: 940px; display: flex; justify-content: center">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-row>
    </el-form>
    <el-dialog v-model="dialogVisible" width="500px" @close="handleClose" destroy-on-close>
      <my-goods-select textareaShow only-one-product v-model="treeValue" v-model:product-id="productId" v-model:sub-product-ids="subProductIds"></my-goods-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import { ref, reactive, watch, computed, onMounted, nextTick, onBeforeUpdate, onUpdated, onActivated, onDeactivated, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import lodash from 'lodash'
import service from '@/utils/request'
export default {
  props: {
    id: {
      type: Number,
      required: false
    }
  },
  name: 'GroupBuyAdd',
  setup(props) {
    console.log(props)
    const route = useRoute()
    const router = useRouter()
    const addForm = reactive({
      id: null,
      name: '',
      startDate: '',
      endDate: '',
      product: null,
      productItems: [],
      canSingleBuy: '',
      duration: '',
      activityRules: '',
      startGroupBuyRules: '',
      finishGroupByRules: '',
      shareText: '',
      startGroupBuyLevels: [],
      groupBuyRewards: {},
      startGroupBuyRequirement: '',
      joinGroupBuyLevels: [],
      v0MinNum: 0,
      totalMinNum: 0
    })
    // const groupBuyRewards = ref([])
    const addFormRef = ref(null)
    const addFormRules = {
      name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
      startDate: [
        {
          required: true,
          message: '请输入开始日期！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (+new Date(addForm.startDate) >= +new Date(addForm.endDate)) {
              callback(new Error('结束时间必须在开始时间之后！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      endDate: [
        {
          required: true,
          message: '请输入结束日期！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (+new Date(addForm.startDate) >= +new Date(addForm.endDate)) {
              callback(new Error('结束时间必须在开始时间之后！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      canSingleBuy: [
        {
          required: true,
          message: '请选择是否可以单独购买！',
          trigger: ['blur', 'change']
        }
      ],
      duration: [
        {
          required: true,
          message: '请输入拼团时效！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (isNaN(value) || value < 0) {
              callback(new Error('拼团时效必须为正整数！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      activityRules: [
        {
          required: true,
          message: '请输入活动规则概述！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (value.length > 20) {
              callback(new Error('活动规则概述长度不能超过20个字符！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      startGroupBuyRules: [
        {
          required: true,
          message: '请输入开团规则描述！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (value.length > 120) {
              callback(new Error('开团规则描述长度不能超过120个字符！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      finishGroupByRules: [
        {
          required: true,
          message: '请输入成团规则描述！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (value.length > 120) {
              callback(new Error('成团规则描述长度不能超过120个字符！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      shareText: [
        {
          required: true,
          message: '请输入分享文案！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (value.length > 20) {
              callback(new Error('分享文案长度不能超过20个字符！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      startGroupBuyLevels: [
        {
          required: true,
          message: '开团人员级别限制不能为空！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (value.length === 0) {
              callback(new Error('开团人员级别限制不能为空！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      joinGroupBuyLevels: [
        {
          required: true,
          message: '参团人员级别限制不能为空！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (value.length === 0) {
              callback(new Error('参团人员级别限制不能为空！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      startGroupBuyRequirement: [
        {
          required: true,
          message: '请选择开团人购买需求！',
          trigger: ['blur', 'change']
        }
      ],
      v0MinNum: [
        {
          required: true,
          message: '请输入新人数量要求！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (isNaN(value) || value < 0) {
              callback(new Error('新人数量要求必须为正整数！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ],
      totalMinNum: [
        {
          required: true,
          message: '请输入总人数要求！',
          trigger: ['blur', 'change']
        },
        {
          validator: (rule, value, callback) => {
            if (isNaN(value) || value <= 0) {
              callback(new Error('总人数要求必须为正整数！'))
            } else {
              callback()
            }
          },
          trigger: ['blur', 'change']
        }
      ]
    }
    // watch(
    //   () => addForm.endDate,
    //   (newValue) => {
    //     if (
    //       newValue !== '' &&
    //       +new Date(addForm.endDate) <= +new Date(addForm.startDate)
    //     ) {
    //       addForm.startDate = ''
    //     }
    //   }
    // )
    // watch(
    //   () => addForm.startDate,
    //   (newValue) => {
    //     if (
    //       newValue !== '' &&
    //       +new Date(addForm.endDate) <= +new Date(addForm.startDate)
    //     ) {
    //       addForm.endDate = ''
    //     }
    //   }
    // )
    watch(
      () => addForm.startGroupBuyLevels.length,
      (newValue) => {
        console.log(addForm.startGroupBuyLevels, addForm.groupBuyRewards)
        if (addForm.startGroupBuyLevels.length === 0) {
          addForm.startGroupBuyLevels = []
        }
        addForm.groupBuyRewards = {}
        addForm.startGroupBuyLevels.sort()
        addForm.startGroupBuyLevels.forEach((item) => {
          console.log(item)
          addForm.groupBuyRewards[item] = 0
        })
        console.log(addForm.startGroupBuyLevels, addForm.groupBuyRewards)
      }
    )
    const dialogVisible = ref(false)
    const handleClose = () => {
      addForm.product = null
      addForm.productItems = []
    }
    const handleCancel = () => {
      dialogVisible.value = false
    }
    const handleAdd = async () => {
      if (productId.value == null || subProductIds.value.length == 0) {
        return ElMessage.error('请选择商品及规格！')
      }
      if (String(productId.value).indexOf('P') !== -1) {
        productId.value = parseInt(String(productId.value).slice(2))
      }
      subProductIds.value.forEach((item, index) => {
        if (String(item).indexOf('I') !== -1) {
          subProductIds.value[index] = parseInt(String(item).slice(2))
        }
      })
      await getProducts()
      dialogVisible.value = false
    }
    const getProducts = async () => {
      productFlag.value = false
      product.subProducts = []
      const { data: productRes } = await service.get('getproductbyid', {
        params: {
          id: parseInt(productId.value)
        }
      })
      product.name = productRes.name
      for (let index = 0; index < subProductIds.value.length; index++) {
        const item = subProductIds.value[index]
        const { data: productItemRes } = await service.get('getproductitembyid', {
          params: {
            id: item
          }
        })
        product.subProducts.push(productItemRes)
      }
      product.groupPrice = product.subProducts[0].nowPrice
      product.groupPoints = product.subProducts[0].points
      product.eachNum = 1
      productFlag.value = true
    }
    const treeValue = ref([])
    const productId = ref(null)
    const subProductIds = ref([])
    const product = reactive({
      name: '',
      subProducts: [],
      groupPrice: 0,
      groupPoints: 0,
      eachNum: 0
    })
    const productFlag = ref(false)
    const handleSubmit = () => {
      // if (!productFlag.value) {
      //   return ElMessage.error('请先选择团购商品！')
      // }
      // if (isNaN(product.groupPrice) || product.groupPrice <= 0) {
      //   return ElMessage.error('团购价格必须为正数！')
      // }
      // if (isNaN(product.groupPoints) || product.groupPoints <= 0) {
      //   return ElMessage.error('团购积分必须为正整数！')
      // }
      // if (isNaN(product.eachNum) || product.eachNum <= 0) {
      //   return ElMessage.error('每份购买数量必须为正整数！')
      // }
      addFormRef.value.validate(async (valid) => {
        if (valid) {
          if (!productFlag.value) {
            return ElMessage.error('请先选择团购商品！')
          }
          if (isNaN(product.groupPrice) || product.groupPrice <= 0) {
            return ElMessage.error('团购价格必须为正数！')
          }
          if (isNaN(product.groupPoints) || product.groupPoints <= 0) {
            return ElMessage.error('团购积分必须为正整数！')
          }
          if (isNaN(product.eachNum) || product.eachNum <= 0) {
            return ElMessage.error('每份购买数量必须为正整数！')
          }
          for (const key in addForm.groupBuyRewards) {
            const value = addForm.groupBuyRewards[key]
            if (isNaN(value) || value < 0) {
              return ElMessage.error('开团人成团奖励必须为正数！')
            }
          }
          const data = {}
          // --- groupBuy
          const groupBuy = {}
          groupBuy.name = addForm.name
          // 待定
          function dateFormat(dateStr) {
            const date = new Date(dateStr)
            const year = date.getFullYear()
            const month = padZero(date.getMonth() + 1)
            const day = padZero(date.getDate())
            const hour = padZero(date.getHours())
            const minute = padZero(date.getMinutes())
            const second = padZero(date.getSeconds())
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
            function padZero(num) {
              return num < 10 ? '0' + num : num
            }
          }
          const id = props.id
          if (id) {
            groupBuy.id = id
          }
          groupBuy.startDate = dateFormat(addForm.startDate)
          groupBuy.endDate = dateFormat(addForm.endDate)
          groupBuy.groupDesc = addForm.activityRules
          groupBuy.beginDesc = addForm.startGroupBuyRules
          groupBuy.joinDesc = addForm.finishGroupByRules
          groupBuy.shareDesc = addForm.shareText
          groupBuy.leaderRequire = addForm.startGroupBuyRequirement
          groupBuy.groupMinNum = addForm.totalMinNum
          groupBuy.expiryDate = addForm.duration
          groupBuy.newMemberMin = addForm.v0MinNum
          // 。。。
          data.groupBuy = groupBuy
          // --- groupBuyProduct
          const groupBuyProduct = []
          product.subProducts.forEach((item) => {
            const groupBuyProductItem = {}
            groupBuyProductItem.productName = product.name
            groupBuyProductItem.productId = productId.value
            groupBuyProductItem.productItemId = item.id
            groupBuyProductItem.productSalePrice = product.groupPrice
            groupBuyProductItem.productSalePoint = product.groupPoints
            groupBuyProductItem.productNum = product.eachNum
            groupBuyProductItem.buyType = addForm.canSingleBuy
            groupBuyProduct.push(groupBuyProductItem)
          })
          data.groupBuyProduct = groupBuyProduct
          // --- groupBuyLevel
          const groupBuyLevel = []
          addForm.joinGroupBuyLevels.forEach((item) => {
            const groupBuyLevelItem = {}
            const memberLevel = parseInt(item.slice(1))
            groupBuyLevelItem.memberLevel = memberLevel
            groupBuyLevelItem.type = 1
            groupBuyLevel.push(groupBuyLevelItem)
          })
          for (const key in addForm.groupBuyRewards) {
            const groupBuyLevelItem = {}
            const memberLevel = parseInt(key.slice(1))
            groupBuyLevelItem.memberLevel = memberLevel
            groupBuyLevelItem.type = 0
            groupBuyLevelItem.rebateMoney = addForm.groupBuyRewards[key]
            groupBuyLevel.push(groupBuyLevelItem)
          }
          data.groupBuyLevel = groupBuyLevel
          console.log(data)
          const res = await service.post('addgroupbuy', data)
          if (res.status == 0) {
            if (id) {
              ElMessage.success('修改成功！')
            } else {
              ElMessage.success('添加成功！')
            }
          }
          router.push('/groupBuyManage')
        } else {
          ElMessage.error('保存失败！请检查标红的表单项！')
          return false
        }
      })
    }
    // 编辑
    const loading = ref(false)
    const getCurrentGroupBuy = async () => {
      // debugger
      loading.value = true
      const id = props.id
      console.log(id)
      if (!id) return
      const { data: res } = await service.get('groupbuydetail', {
        params: {
          id
        }
      })
      const groupBuy = res.groupBuy
      addForm.id = groupBuy.id
      addForm.name = groupBuy.name
      addForm.startDate = groupBuy.startDate
      addForm.endDate = groupBuy.endDate
      addForm.activityRules = groupBuy.groupDesc
      addForm.startGroupBuyRules = groupBuy.beginDesc
      addForm.finishGroupByRules = groupBuy.joinDesc
      addForm.shareText = groupBuy.shareDesc
      addForm.startGroupBuyRequirement = groupBuy.leaderRequire
      addForm.totalMinNum = groupBuy.groupMinNum
      addForm.duration = groupBuy.expiryDate
      addForm.v0MinNum = groupBuy.newMemberMin

      const groupBuyProduct = res.groupBuyProduct
      productId.value = null
      subProductIds.value = []
      groupBuyProduct.forEach((item) => {
        subProductIds.value.push(item.productItemId)
      })
      productId.value = groupBuyProduct[0].productId
      await getProducts()
      product.groupPrice = groupBuyProduct[0].productSalePrice
      product.groupPoints = groupBuyProduct[0].productSalePoint
      product.eachNum = groupBuyProduct[0].productNum
      addForm.canSingleBuy = groupBuyProduct[0].buyType

      const groupBuyLevel = res.groupBuyLevel
      groupBuyLevel.forEach(async (item) => {
        if (item.type == 0) {
          addForm.startGroupBuyLevels.push('v' + item.memberLevel)
          await nextTick()
          addForm.groupBuyRewards['v' + item.memberLevel] = item.rebateMoney
        } else {
          addForm.joinGroupBuyLevels.push('v' + item.memberLevel)
        }
      })
      loading.value = false
    }
    getCurrentGroupBuy()
    onBeforeUpdate(() => {
      console.log(product)
      console.log(addForm)
      // debugger
    })
    // onUpdated(() => {
    //   console.log(addForm.name, product)
    //   debugger
    // })
    // onActivated(() => {
    //   console.log(addForm.name, product)
    //   debugger
    // })
    // onDeactivated(() => {
    //   console.log(addForm.name, product)
    //   debugger
    // })
    // onMounted(() => {
    //   console.log(addForm.name, product)
    //   debugger
    // })
    // onUnmounted(() => {
    //   console.log(addForm.name, product)
    //   debugger
    // })
    return {
      addForm,
      addFormRef,
      addFormRules,
      dialogVisible,
      handleClose,
      handleAdd,
      handleCancel,
      treeValue,
      productId,
      subProductIds,
      product,
      productFlag,
      handleSubmit,
      loading
    }
  }
}
</script>

<style scoped lang="scss">
.seperator {
  color: #5f86ff;
  line-height: 36px;
  font-weight: bold;
  border-bottom: 1px solid #5f86ff;
  margin-bottom: 30px;
}
.w500 {
  width: 500px;
}
.w800 {
  width: 800px;
}
.date-row {
  .el-col {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /deep/.el-form-item {
      flex: 1;
    }
    /deep/.el-date-editor {
      width: 100%;
    }
  }
}
.date-row {
  .el-col {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .el-form-item {
      flex: 1;
    }
    .el-date-editor {
      width: 100%;
    }
  }
}
.money-row {
  /deep/.el-form-item__content {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}

.money-row {
  .el-form-item__content {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}

.el-alert {
  background-color: transparent;
  height: 40px;
  line-height: 40px;
}

.el-table {
  /deep/ th {
    padding: 0;
    background-color: #dddddd;
    color: #000;
  }
}

.el-table {
  th {
    background-color: #dddddd;
    color: #000;
  }
}
</style>
