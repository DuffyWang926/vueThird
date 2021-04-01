<template>
  <el-card @click="categoryShowFlag = false">
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
    <el-form ref="step1FormRef" v-show="activeIndex === 0" :model="step1Form" :rules="step1FormRules" label-width="120px" label-position="left">
      <el-form-item label="分类" prop="categoryId">
        <div style="width: 400px">
          <my-category-select
            v-model="step1Form.categoryIds"
            v-model:show-flag="categoryShowFlag"
            v-model:single-value="step1Form.categoryId"
            is-three-category
            style="width: 400px"
          ></my-category-select>
        </div>
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-input placeholder="产品名称" size="large" v-model="step1Form.name"></el-input>
      </el-form-item>
      <el-form-item label="产品编码" prop="skuCode">
        <el-input placeholder="产品编码" size="large" v-model="step1Form.skuCode"></el-input>
      </el-form-item>
      <el-form-item label="仓库" prop="warehouse">
        <el-select placeholder="----请选择----" v-model="step1Form.warehouse" @click="step1FormRef.validateField('warehouse')">
          <el-option label="----请选择----" value="" disabled v-show="false"></el-option>
          <el-option v-for="item in warehouses" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="税率种类" prop="taxe">
        <el-select placeholder="----请选择----" v-model="step1Form.taxe" @click="step1FormRef.validateField('taxe')">
          <el-option label="----请选择----" value="" disabled v-show="false"></el-option>
          <el-option v-for="item in taxes" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="是否自营" prop="isSelf">
            <el-switch v-model="step1Form.isSelf"> </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否上架" prop="isOnSale">
            <el-switch v-model="step1Form.isOnSale"> </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否预售" prop="isAdvSale">
            <el-switch v-model="step1Form.isAdvSale"> </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否支持七天无理由退换" label-width="218px" prop="is7dReturn">
            <el-switch v-model="step1Form.is7dReturn"> </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="step1Form.isAdvSale">
        <el-form-item label="预售开始时间" prop="advStartTime">
          <el-date-picker v-model="step1Form.advStartTime" align="right" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="预售结束时间" prop="advEndTime">
          <el-date-picker v-model="step1Form.advEndTime" align="right" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="预售描述" prop="advSaleDes">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="step1Form.advSaleDes" resize="none"> </el-input>
        </el-form-item>
      </div>
    </el-form>
    <el-form ref="step2FormRef" v-show="activeIndex === 1" :model="step2Form" :rules="step2FormRules" label-width="120px" label-position="left">
      <el-form-item label="产品主图" prop="masterImgList">
        <my-upload v-model:image-list="step2Form.masterImgList">
          <div style="font-size: 16px; color: red">注：图片上传不得超过10M。</div>
        </my-upload>
      </el-form-item>
      <el-form-item label="九宫图" prop="nineImgList">
        <my-upload v-model:image-list="step2Form.nineImgList" multiple :limit="9">
          <div style="font-size: 16px">
            <span>按住Ctrl键可以多选，九宫图最多只能添加9张。</span>
            <span style="color: red">图片上传不得超过10M。</span>
          </div></my-upload
        >
      </el-form-item>
      <el-form-item label="分享图片" prop="shareImgList">
        <my-upload v-model:image-list="step2Form.shareImgList" multiple :limit="9">
          <div style="font-size: 16px">
            <span>按住Ctrl键可以多选，分享图片最多只能添加9张。</span>
            <span style="color: red">图片上传不得超过10M。</span>
          </div>
        </my-upload>
      </el-form-item>
      <el-form-item label="产品视频" prop="videoList">
        <div style="width: 400px">
          <my-upload v-model:image-list="step2Form.videoList" isVideo> <div style="font-size: 16px; color: red">注：视频上传不得超过30M。</div></my-upload>
        </div>
      </el-form-item>
    </el-form>
    <el-form ref="step3FormRef" v-show="activeIndex === 2" :model="step3Form" label-width="80px" label-position="left">
      <el-form-item label="是否组合" prop="isCombination">
        <el-switch v-model="step3Form.isCombination"> </el-switch>
      </el-form-item>
      <el-form-item label="商品规格">
        <div style="margin-bottom: 20px">
          <el-form-item label="颜色" prop="colour" label-width="40px">
            <el-input placeholder="规格值" size="large" v-model.trim="step3Form.colour" style="width: 200px; margin-right: 20px"></el-input>
            <el-button type="primary" size="large" @click="addColour">添加</el-button>
          </el-form-item>
          <div class="tags">
            <el-tag v-for="item in step3Form.colours" :key="item" closable @close="removeColour(item)">{{ item }}</el-tag>
          </div>
        </div>
        <div>
          <el-form-item label="尺寸" prop="size" label-width="40px">
            <el-input placeholder="规格值" size="large" v-model.trim="step3Form.size" style="width: 200px; margin-right: 20px"></el-input>
            <el-button type="primary" size="large" @click="addSize">添加</el-button>
          </el-form-item>
          <div class="tags">
            <el-tag v-for="item in step3Form.sizes" :key="item" closable @close="removeSize(item)">{{ item }}</el-tag>
          </div>
        </div>
      </el-form-item>
      <div v-if="step3Form.colours.length > 0 && step3Form.sizes.length > 0" style="margin-left: -100px">
        <el-row>子产品列表</el-row>
        <el-table v-show="!step3Form.isCombination" :data="table" style="width: 100%">
          <el-table-column label="颜色" prop="colour"></el-table-column>
          <el-table-column label="尺寸" prop="size"></el-table-column>
          <el-table-column label="产品编码" width="100">
            <template #default="scope">
              <el-input v-model="scope.row.item_sku_code"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品图片" width="110">
            <template #default="scope">
              <my-upload v-model:image-list="scope.row.item_img"></my-upload>
            </template>
          </el-table-column>
          <el-table-column label="产品原价（￥）" width="100">
            <template #default="scope">
              <el-input v-model="scope.row.item_oldPrice" @blur="changeOldPrice(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品现价（￥）" width="100">
            <template #default="scope">
              <el-input v-model="scope.row.item_nowPrice" @blur="changeNowPrice(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品重量（kg）" width="100">
            <template #default="scope">
              <el-input v-model="scope.row.item_weight" @blur="changeWeight(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品积分" width="80">
            <template #default="scope">
              <el-input v-model="scope.row.item_points" @blur="changePoints(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="显示顺序（倒序）" width="80">
            <template #default="scope">
              <el-input v-model="scope.row.item_indexkey" @blur="changeIndexKey(scope)"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="step3Form.isCombination" :data="combinedTable" style="width: 100%" @row-click="expandChange" ref="combinedTableRef" row-key="key" :expand-row-keys="expandRowKeys">
          <el-table-column type="expand" label="展开">
            <template #default="props">
              <el-table :data="props.row.productsInfos" style="width: 90%; margin: 0 auto" class="product-infos">
                <el-table-column label="商品图片">
                  <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover"></el-image>
                  </template>
                </el-table-column>
                <el-table-column label="SKUCODE" prop="skuCode"></el-table-column>
                <el-table-column label="商品名称">
                  <template #default="scope"> {{ scope.row.productName }} [{{ scope.row.colour }} {{ scope.row.size }}] </template>
                </el-table-column>
                <el-table-column label="现价" width="120">
                  <template #default="scope">
                    <el-input v-model="scope.row.item_nowPrice" @blur="changeNowPrice(scope)"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="积分" width="120">
                  <template #default="scope">
                    <el-input v-model="scope.row.item_points" @blur="changePoints(scope)"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="120">
                  <template #default="scope">
                    <el-input v-model="scope.row.item_nums" @blur="changeNums(scope)"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-button type="danger" @click="deleteCombinedItem(props, scope)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="颜色" prop="colour"></el-table-column>
          <el-table-column label="尺寸" prop="size"></el-table-column>
          <el-table-column label="产品编码" width="100">
            <template #default="scope">
              <el-input v-model="scope.row.item_sku_code"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品图片" width="110">
            <template #default="scope">
              <my-upload v-model:image-list="scope.row.item_img"></my-upload>
            </template>
          </el-table-column>
          <el-table-column label="产品原价（￥）" width="100">
            <template #default="scope">
              <el-input disabled :value="calculateOldPrice(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品现价（￥）" width="100">
            <template #default="scope">
              <el-input disabled :value="calculatenNowPrice(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品重量（kg）" width="100">
            <template #default="scope">
              <el-input v-model="scope.row.item_weight" @blur="changeWeight(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品积分" width="80">
            <template #default="scope">
              <el-input disabled :value="calculatePoints(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="显示顺序（倒序）" width="80">
            <template #default="scope">
              <el-input v-model="scope.row.item_indexkey" @blur="changeIndexKey(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="组合产品规格" fixed="right" width="100">
            <template #default="scope">
              <el-button @click.stop="selectCombinedProduct(scope.row)" type="success">选择组合<br />产品规格</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <el-form ref="step4FormRef" v-show="activeIndex === 3" :model="step4Form" :rules="step4FormRules" label-width="120px" label-position="left">
      <el-form-item label="商品描述" prop="description">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="step4Form.description" resize="none" class="w600"> </el-input>
      </el-form-item>
      <el-form-item label="商品详情" prop="specification">
        <div ref="editor" style="width: 600px" class="editor" @click="step4FormRef.validateField('specification')"></div>
        <!-- <quill-editor
          v-model="step4Form.specification"
          ref="myQuillEditor"
          :options="editorOption"
          class="ql-editor"
        >
        </quill-editor> -->
      </el-form-item>
    </el-form>
    <div style="display: flex; justify-content: center">
      <el-button type="primary" @click="prevStep" size="large" v-if="activeIndex > 0">上一步</el-button>
      <el-button :type="activeIndex === 3 ? 'success' : 'primary'" @click="nextStep" size="large">{{ activeIndex === 3 ? '提交' : '下一步' }}</el-button>
    </div>
  </el-card>
  <el-dialog v-model="dialogVisible" width="500px" @close="handleClose" destroy-on-close>
    <div v-loading="dialogLoading">
      <my-goods-select textareaShow v-model:leaf-value="currentRow.products" v-model="currentRow.allSelection"></my-goods-select>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import lodash from 'lodash'
import service from '@/utils/request'

import WangEditor from 'wangeditor'
export default {
  name: 'addGoods',
  // components: {
  //   'quill-editor': quillEditor
  // },
  setup() {
    const activeIndex = ref(3)
    const step1FormRef = ref(null)
    const step2FormRef = ref(null)
    const step3FormRef = ref(null)
    const step4FormRef = ref(null)
    const step1Form = reactive({
      categoryIds: [],
      categoryId: '',
      name: '',
      skuCode: '',
      warehouse: '',
      taxe: '',
      isSelf: false,
      isOnSale: false,
      is7dReturn: false,
      isAdvSale: false,
      advEndTime: '',
      advStartTime: '',
      advSaleDes: ''
    })
    const step1FormRules = {
      categoryId: [
        {
          required: true,
          message: '请选择三级分类！',
          trigger: ['blur', 'change', 'click']
        }
      ],
      name: [{ required: true, message: '请输入产品名称！', trigger: 'blur' }],
      skuCode: [{ required: true, message: '请输入产品编码！', trigger: 'blur' }],
      warehouse: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value == '') {
              callback(new Error('请选择仓库！'))
            } else {
              callback()
            }
          },
          message: '请选择仓库！',
          trigger: ['blur', 'change', 'click']
        }
      ],
      taxe: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value == '') {
              callback(new Error('请选择税率种类！'))
            } else {
              callback()
            }
          },
          message: '请选择税率种类！',
          trigger: ['blur', 'change', 'click']
        }
      ],
      advStartTime: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (step1Form.isAdvSale) {
              if (value == '') {
                callback(new Error('请选择预售开始时间！'))
              }
            } else {
              callback()
            }
          },
          message: '请选择预售开始时间',
          trigger: 'blur'
        }
      ],
      advEndTime: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (step1Form.isAdvSale) {
              if (value == '') {
                callback(new Error('请选择预售结束时间！'))
              }
            } else {
              callback()
            }
          },
          message: '请选择预售结束时间！',
          trigger: 'blur'
        }
      ],
      advSaleDes: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (step1Form.isAdvSale) {
              if (value == '') {
                callback(new Error('请输入预售描述！'))
              }
            } else {
              callback()
            }
          },
          message: '请输入预售描述！',
          trigger: 'blur'
        }
      ]
    }
    watch(
      () => step1Form.advEndTime,
      (newValue) => {
        if (newValue !== '' && +new Date(step1Form.advEndTime) <= +new Date(step1Form.advStartTime)) {
          step1Form.advStartTime = ''
        }
      }
    )
    watch(
      () => step1Form.advStartTime,
      (newValue) => {
        if (newValue !== '' && +new Date(step1Form.advEndTime) <= +new Date(step1Form.advStartTime)) {
          step1Form.advEndTime = ''
        }
      }
    )
    const categoryShowFlag = ref(false)
    const step2Form = reactive({
      masterImgList: [],
      nineImgList: [],
      shareImgList: [],
      videoList: []
    })
    const step2FormRules = {
      masterImgList: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value.length !== 1) {
              console.log('商品主图未选择')
              callback(new Error('请选择商品主图！'))
            } else {
              callback()
            }
          },
          message: '请选择商品主图！',
          trigger: ['blur', 'change', 'click']
        }
      ]
    }
    const step3Form = reactive({
      isCombination: false,
      colour: '',
      colours: [],
      size: '',
      sizes: []
    })
    console.log('step3', step3Form, step3Form.colours)
    const addColour = () => {
      if (step3Form.colour.length == 0) {
        return ElMessage.error('不能添加空的规格值！')
      }
      const flag = step3Form.colours.indexOf(step3Form.colour) !== -1
      if (flag) {
        ElMessage.error('不能添加相同的颜色规格值！')
      } else {
        step3Form.colours.push(step3Form.colour)
        step3Form.colour = ''
      }
    }
    const removeColour = (toRemove) => {
      step3Form.colours = step3Form.colours.filter((item) => item != toRemove)
    }
    const addSize = () => {
      if (step3Form.size.length == 0) {
        return ElMessage.error('不能添加空的规格值！')
      }
      const flag = step3Form.sizes.indexOf(step3Form.size) !== -1
      if (flag) {
        ElMessage.error('不能添加相同的尺寸规格值！')
      } else {
        step3Form.sizes.push(step3Form.size)
        step3Form.size = ''
      }
    }
    const removeSize = (toRemove) => {
      step3Form.sizes = step3Form.sizes.filter((item) => item != toRemove)
    }
    watch(
      () => step3Form.sizes.length,
      (newSize) => {
        console.log('refreshTable')
        refreshTable()
        refreshCombinedTable()
      }
    )
    watch(
      () => step3Form.colours.length,
      (newSize) => {
        console.log('refreshTable')
        refreshTable()
        refreshCombinedTable()
      }
    )
    const table = ref([])
    const refreshTable = () => {
      for (let colourIndex = 0; colourIndex < step3Form.colours.length; colourIndex++) {
        const colour = step3Form.colours[colourIndex]
        for (let sizeIndex = 0; sizeIndex < step3Form.sizes.length; sizeIndex++) {
          const size = step3Form.sizes[sizeIndex]
          const item = table.value.find((item) => item.size == size && item.colour == colour)
          console.log(item)
          if (item) {
            item.colourIndex = colourIndex
            item.sizeIndex = sizeIndex
            continue
          }
          table.value.push({
            colourIndex,
            sizeIndex,
            colour,
            size,
            item_sku_code: '',
            item_img: [],
            item_oldPrice: 0,
            item_nowPrice: 0,
            item_weight: 0,
            item_points: 0,
            item_indexkey: 0
          })
        }
      }
      table.value = table.value.filter((item) => step3Form.colours.indexOf(item.colour) !== -1 && step3Form.sizes.indexOf(item.size) !== -1)
      table.value.sort((a, b) => {
        if (a.colourIndex === b.colourIndex) {
          return a.sizeIndex - b.sizeIndex
        } else {
          return a.colourIndex - b.colourIndex
        }
      })
    }
    const combinedTable = ref([])
    const combinedTableRef = ref(null)
    const refreshCombinedTable = () => {
      for (let colourIndex = 0; colourIndex < step3Form.colours.length; colourIndex++) {
        const colour = step3Form.colours[colourIndex]
        for (let sizeIndex = 0; sizeIndex < step3Form.sizes.length; sizeIndex++) {
          const size = step3Form.sizes[sizeIndex]
          const item = combinedTable.value.find((item) => item.size == size && item.colour == colour)
          console.log(item)
          if (item) {
            item.colourIndex = colourIndex
            item.sizeIndex = sizeIndex
            item.key = colourIndex * step3Form.sizes.length + sizeIndex
            continue
          }
          combinedTable.value.push({
            colourIndex,
            sizeIndex,
            colour,
            size,
            key: colourIndex * step3Form.sizes.length + sizeIndex,
            item_sku_code: '',
            item_img: [],
            item_weight: 0,
            item_indexkey: 0,
            products: [],
            productsInfos: [],
            allSelection: []
          })
        }
      }
      combinedTable.value = combinedTable.value.filter((item) => step3Form.colours.indexOf(item.colour) !== -1 && step3Form.sizes.indexOf(item.size) !== -1)
      combinedTable.value.sort((a, b) => {
        if (a.colourIndex === b.colourIndex) {
          return a.sizeIndex - b.sizeIndex
        } else {
          return a.colourIndex - b.colourIndex
        }
      })
    }
    const selectCombinedProduct = (row) => {
      currentRowCopy.value = lodash.cloneDeep(row)
      currentRow.value = row
      currentRow.value.allSelection = []
      currentRow.value.productsInfos = []
      currentRow.value.products = []
      dialogVisible.value = true
    }

    const currentRow = ref(null)
    const currentRowCopy = ref(null)
    const dialogVisible = ref(false)
    const dialogLoading = ref(false)
    const handleClose = () => {
      // currentRow.value = null
    }
    const handleAdd = async () => {
      expandChange(currentRow.value)
      currentRow.value.productsInfos = []
      for (let index = 0; index < currentRow.value.products.length; index++) {
        dialogLoading.value = true
        const item = currentRow.value.products[index]
        const { data: res } = await service.get('getProductItemById', {
          params: {
            id: item
          }
        })
        console.log(res)
        res.productItem.item_nums = 1
        currentRow.value.productsInfos.push(res.productItem)
        dialogLoading.value = false
      }
      dialogVisible.value = false
    }
    const handleCancel = () => {
      currentRow.value.allSelection = currentRowCopy.value.allSelection
      currentRow.value.productsInfos = currentRowCopy.value.productsInfos
      currentRow.value.products = currentRowCopy.value.products
      // const tableRow = combinedTable.value.find(item => item.colour === currentRow.value.colour && item.size === currentRow.value.size)
      // tableRow
      dialogVisible.value = false
    }

    const changeOldPrice = (scope) => {
      // console.log(scope)
      scope.row.item_oldPrice = parseFloat((+scope.row.item_oldPrice).toFixed(2))
    }
    const changeNowPrice = (scope) => {
      // console.log(scope)
      scope.row.item_nowPrice = parseFloat((+scope.row.item_nowPrice).toFixed(2))
    }
    const changeWeight = (scope) => {
      // console.log(scope)
      scope.row.item_weight = parseFloat((+scope.row.item_weight).toFixed(3))
    }
    const changePoints = (scope) => {
      // console.log(scope)
      scope.row.item_points = parseInt(scope.row.item_points)
    }
    const changeIndexKey = (scope) => {
      // console.log(scope)
      scope.row.item_indexkey = parseInt(scope.row.item_indexkey)
    }
    const changeNums = (scope) => {
      scope.row.item_nums = parseInt(scope.row.item_nums)
    }

    const calculateOldPrice = computed(() => {
      return (scope) => {
        const productsInfos = scope.row.productsInfos
        return productsInfos.reduce((total, item) => total + item.item_oldPrice * item.item_nums, 0)
      }
    })

    const calculatenNowPrice = computed(() => {
      return (scope) => {
        const productsInfos = scope.row.productsInfos
        return productsInfos.reduce((total, item) => total + item.item_nowPrice * item.item_nums, 0)
      }
    })

    const calculatePoints = computed(() => {
      return (scope) => {
        const productsInfos = scope.row.productsInfos
        return productsInfos.reduce((total, item) => total + item.item_points * item.item_nums, 0)
      }
    })

    const deleteCombinedItem = (props, scope) => {
      console.log(props, scope)
      const productsInfos = props.row.productsInfos
      const id = scope.row.id
      const index = productsInfos.findIndex((item) => item.id === id)
      productsInfos.splice(index, 1)
      // TODO：删除后已选列表的更新。
    }

    const expandRowKeys = ref([])
    const expandChange = (row, index, e) => {
      console.log(combinedTableRef.value)
      console.log(row, index, e)
      // combinedTableRef.value.toggleRowExpansion(row)
      expandRowKeys.value = [row.key]
    }

    const step4Form = reactive({
      description: '',
      specification: ''
    })
    const step4FormRules = {
      description: [{ required: true, message: '请填写商品描述', trigger: 'blur' }],
      specification: [
        {
          required: true,
          message: '请填写商品详情',
          trigger: ['blur', 'change', 'click']
        }
      ]
    }
    watch(
      () => step4Form.specification,
      (newValue) => {
        step4FormRef.value.validateField('specification')
      }
    )
    const editor = ref()
    const content = reactive({
      html: '',
      text: ''
    })
    let instance
    onMounted(() => {
      instance = new WangEditor(editor.value)
      Object.assign(instance.config, {
        onchange(e) {
          // console.log(e)
          step4Form.specification = e
        }
      })
      instance.create()
    })

    const nextStep = () => {
      const currentFormRef = eval('step' + (activeIndex.value + 1) + 'FormRef')
      console.log(currentFormRef)
      currentFormRef.value.validate((valid) => {
        if (valid) {
          if (activeIndex.value < 3) {
            if (activeIndex.value === 2) {
              if (step3Form.colours.length === 0) {
                ElMessage.error('颜色规格至少一个！')
                return false
              }
              if (step3Form.sizes.length === 0) {
                ElMessage.error('尺寸规格至少一个！')
                return false
              }
              if (!step3Form.isCombination) {
                for (let index = 0; index < table.value.length; index++) {
                  const item = table.value[index]
                  if (item.item_sku_code.length == 0 || !/^\w+$/.test(item.item_sku_code)) {
                    ElMessage.error('商品子项编码不合法！')
                    return false
                  }
                  if (item.item_img.length === 0) {
                    ElMessage.error('商品子项需要有图片！')
                    return false
                  }
                  if (isNaN(item.item_oldPrice) || item.item_oldPrice < 0) {
                    ElMessage.error('商品子项原价格不合法！')
                    return false
                  }
                  if (isNaN(item.item_nowPrice) || item.item_nowPrice < 0) {
                    ElMessage.error('商品子项现价格不合法！')
                    return false
                  }
                  if (isNaN(item.item_weight) || item.item_weight <= 0) {
                    console.log(item.item_weight)
                    ElMessage.error('商品子项重量不合法！')
                    return false
                  }
                  if (isNaN(item.item_points) || item.item_points < 0) {
                    ElMessage.error('商品子项积分不合法！')
                    return false
                  }
                  if (isNaN(item.item_indexkey) || item.item_indexkey <= 0) {
                    ElMessage.error('商品子项显示顺序不合法！')
                    return false
                  }
                }
              } else {
                for (let index = 0; index < combinedTable.value.length; index++) {
                  const item = combinedTable.value[index]
                  if (item.item_sku_code.length == 0 || !/^\w+$/.test(item.item_sku_code)) {
                    ElMessage.error('商品子项编码不合法！')
                    return false
                  }
                  if (item.item_img.length === 0) {
                    ElMessage.error('商品子项需要有图片！')
                    return false
                  }
                  if (isNaN(item.item_weight) || item.item_weight <= 0) {
                    ElMessage.error('商品子项重量不合法！')
                    return false
                  }
                  if (isNaN(item.item_indexkey) || item.item_indexkey <= 0) {
                    ElMessage.error('商品子项显示顺序不合法！')
                    return false
                  }
                  if (item.productsInfos.length === 0) {
                    ElMessage.error('未添加组合商品项！')
                    return false
                  }
                  for (let subIndex = 0; subIndex < item.productsInfos.length; subIndex++) {
                    const subItem = item.productsInfos[subIndex]
                    if (isNaN(subItem.item_nowPrice) || subItem.item_nowPrice < 0) {
                      ElMessage.error('商品组合子项现价不合法！')
                      return false
                    }
                    if (isNaN(subItem.item_points) || subItem.item_points < 0) {
                      ElMessage.error('商品组合子项积分不合法！')
                      return false
                    }
                    if (isNaN(subItem.item_nums) || subItem.item_nums <= 0) {
                      ElMessage.error('商品组合子项数量不合法！')
                      return false
                    }
                  }
                }
              }
            }
            activeIndex.value++
          } else {
            console.log('提交')
          }
        } else {
          if (activeIndex.value === 1) {
            if (step2Form.masterImgList.length !== 1) {
              ElMessage.error('请选择商品主图！')
              return false
            }
          }
          // console.log('请检查标红的表单项！')
          ElMessage.error('请检查标红的表单项！')
          return false
        }
      })
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
    const log = (scope) => {
      console.log(scope)
      return ''
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
      step1FormRules,
      step2FormRules,
      step4FormRules,
      nextStep,
      prevStep,
      categoryShowFlag,
      warehouses,
      taxes,
      addColour,
      removeColour,
      addSize,
      removeSize,
      table,
      refreshTable,
      combinedTable,
      combinedTableRef,
      selectCombinedProduct,
      refreshCombinedTable,
      changeOldPrice,
      changeNowPrice,
      changeWeight,
      changePoints,
      changeIndexKey,
      changeNums,
      currentRow,
      currentRowCopy,
      dialogVisible,
      dialogLoading,
      handleClose,
      handleAdd,
      handleCancel,
      calculateOldPrice,
      calculatenNowPrice,
      calculatePoints,
      deleteCombinedItem,
      expandChange,
      expandRowKeys,
      // myQuillEditor,
      // editorOption
      editor,
      content,
      log
    }
  }
}
</script>

<style scoped lang="scss">
.el-steps {
  margin-bottom: 20px;
}
.el-input,
.el-select,
.el-textarea {
  width: 400px;
}
/deep/.el-date-editor {
  width: 400px !important;
}
.el-date-editor {
  width: 400px !important;
}

.el-form {
  margin-left: 100px;
}

.el-textarea.w600 {
  width: 600px;
}

.tags {
  padding-left: 40px;
  margin-top: 5px;
  .el-tag {
    margin-right: 10px;
  }
}

.el-table {
  /deep/.el-upload {
    position: relative;
    width: 100px;
    height: 40px;
    border: none;
    // transform: translateY(12px);
    // margin-bottom: 12px;
    background-color: transparent;
    .el-button {
      position: absolute;
      height: 40px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  /deep/.el-upload-list__item {
    width: 100px;
    height: 100px;
  }
  /deep/.el-input {
    width: 90%;
  }
}

.el-table {
  .el-upload {
    position: relative;
    width: 100px;
    height: 40px;
    border: none;
    // transform: translateY(12px);
    // margin-bottom: 12px;
    background-color: transparent;
    .el-button {
      position: absolute;
      height: 40px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
  .el-input {
    width: 90%;
  }
}

.editor {
  /deep/ div {
    z-index: 10 !important;
  }
}
.editor {
  div {
    z-index: 10 !important;
  }
}
</style>