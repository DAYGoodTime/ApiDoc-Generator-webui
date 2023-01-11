<template>
  <div v-if="store.isCurMethodHaveReqBody">
    <div v-for="index in argNumber" :key="index">
      <el-descriptions
          class="margin-top"
          title="Body请求体变量"
          :column="3"
          :size="size"
          border
      >
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
              v-model="Arguments[index-1].name"
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
              v-model="Arguments[index-1].description"
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
              v-model="Arguments[index-1].example"
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
              v-model="Arguments[index-1].isRequired"
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
          <el-select v-model="Arguments[index-1].dataType" class="m-2" placeholder="参数类型" size="small">
            <el-option label="String" value="String"/>
            <el-option label="Object" value="Object"/>
            <el-option label="Array" value="Array"/>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import {
  Postcard,
  Document,
  Reading,
} from '@element-plus/icons-vue'
import {computed, ref} from "vue";
import {MainStore} from "../utils/Store.js";

const store = MainStore()
const size = ref('default')
const isRequestBody = ref(false)
const argNumber = ref(1)
const lastNumber = ref(1)
const ArgObj = {'name': '', 'description': '', 'example': '', 'isRequired': true, 'dataType': ''}

const Arguments = ref([ArgObj])
const handelChange = (currentValue,oldValue) =>{
  if(currentValue>oldValue){
    for (let i = 0; i < currentValue-oldValue; i++) {
      Arguments.value.push({'index':currentValue,...ArgObj});
    }
  }else {
    for (let i = 0; i < oldValue-currentValue; i++) {
      Arguments.value.pop();
    }
  }
  if(isNaN(argNumber.value)) argNumber.value = 1;
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
