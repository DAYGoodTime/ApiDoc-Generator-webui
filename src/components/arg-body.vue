<template v-for="index in argNumber" :key="index">
  <el-space direction="vertical" style="width: 100%" size="default"
  >
    <el-descriptions
        class="margin-top"
        :column="3"
        :size="size"
        border
        style="width: 100%"
    >
      <template #title v-if="index===1">
        <span>Body请求体变量</span>
      </template>
      <template #extra v-if="index===1">
        <el-input-number v-model="argNumber" :min="1" @change="handelChange"/>
      </template>
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
            v-model="Arguments[0].name"
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
            v-model="Arguments[0].description"
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
            v-model="Arguments[0].example"
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
            v-model="Arguments[0].isRequired"
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
        <el-select v-model="Arguments[0].dataType" class="m-2" placeholder="参数类型" size="small">
          <el-option label="String" value="string"/>
          <el-option label="Object" value="object"/>
          <el-option label="Array" value="array"/>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item v-if="isObject(Arguments[0].dataType)">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Reading/>
            </el-icon>
            ModelVo类型
          </div>
        </template>
        <el-select v-model="Arguments[0].elementName" class="m-2" placeholder="结构类型" size="small">
          <el-option label="String" value="String"/>
          <el-option label="Object" value="Object"/>
          <el-option label="Array" value="Array"/>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item v-if="isArray(Arguments[0].dataType)">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Reading/>
            </el-icon>
            元素类型
          </div>
        </template>
        <el-select v-model="Arguments[0].elementName" class="m-2" placeholder="结构类型" size="small">
          <el-option label="String" value="String"/>
          <el-option label="Object" value="Object"/>
          <el-option label="Array" value="Array"/>
        </el-select>
      </el-descriptions-item>
    </el-descriptions>
  </el-space>
</template>

<script setup>
import {Document, Postcard, Reading,} from '@element-plus/icons-vue'
import {computed, ref} from "vue";
import {MainStore} from "../utils/Store.js";
const size = ref('large')

const name = ref('')
const des = ref('')
const example = ref('')
const isRe = ref(false)
const index = ref(0)


const props = defineProps(['index'])
const store = MainStore()
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
