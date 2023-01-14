<template>
  <el-collapse v-model="curSelected"
               v-for="(item,index) in store.getModelFields"
               :key="index"
               accordion>
    <el-collapse-item :name="index">
      <template #title>
        <el-tag
            class="mx-1"
            effect="light"
            round
        >
          {{ item.name }}
        </el-tag>
      </template>
      <el-descriptions
          class="margin-top"
          :column="3"
          size="default"
          border
          style="width: 100%"
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Document/>
              </el-icon>
              参数名:
            </div>
          </template>
          <el-input
              v-model="store.FieldList[index].name"
              class="w-50 m-2"
              placeholder="Type something"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Postcard/>
              </el-icon>
              参数描述
            </div>
          </template>
          <el-input
              v-model="store.FieldList[index].description"
              class="w-50 m-2"
              placeholder="Type something"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              例子
            </div>
          </template>
          <el-input
              v-model="store.FieldList[index].example"
              class="w-50 m-2"
              placeholder="Type something"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              是否必需
            </div>
          </template>
          <el-switch
              v-model="store.FieldList[index].isRequired"
              class="ml-2"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              参数类型
            </div>
          </template>
          <el-select v-model="store.FieldList[index].dataType" class="m-2" placeholder="参数类型" size="small"
                     @change="store.changeType_model($event,index)"
          >
            <el-option label="String" value="String"/>
            <el-option label="Object" value="Object"/>
            <el-option label="Array" value="Array"/>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item v-if="store.FieldList[index].isObject">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              ModelVo类型
            </div>
          </template>
          <el-select v-model="store.FieldList[index].elementName"
                     class="m-2" placeholder="结构类型" size="small">
            <el-option v-for="item in store.models_refList" :key="item"
                :label="item" :value="item+'.class'"/>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item v-if="store.FieldList[index].isArray">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              元素类型
            </div>
          </template>
          <el-select v-model="store.FieldList[index].subType"
                     class="m-2" placeholder="结构类型" size="small"
          >
            <el-option v-for="item in store.models_refList" :key="item"
                :label="item" :value="item+'.class'"/>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </el-collapse-item>
  </el-collapse>
  <el-popconfirm
      width="220"
      confirm-button-text="让我保存！"
      cancel-button-text="等会哦"
      :icon="Warning"
      icon-color="#626AEF"
      title="数据都填好了吗?"
      :on-confirm="saveModel"
  >
    <template #reference>
      <el-button type="success" round>保存</el-button>
    </template>
  </el-popconfirm>
</template>

<script setup>
import {Document, Postcard, Reading, Warning} from '@element-plus/icons-vue'
import {MainStore} from "../utils/Store.js";
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";

const store = MainStore()


const curSelected = ref('')
const size = ref('default')



const saveModel = () => {
  store.pushResultModel({'fieldList': store.FieldList, 'modelName': store.curSelectModel.name});
  ElMessage({
    showClose: true,
    message: '保存成功!',
    type: 'success',
  })
}



const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})

</script>

<style scoped>

</style>
