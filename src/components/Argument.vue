<template>
  <div v-if="store.RequestBody">
    <el-space direction="vertical" v-for="(item,index) in store.ArgLength_body"
              style="width: 100%" size="default"
    >
      <el-descriptions
          class="margin-top"
          :column="3"
          :size="size"
          border
          style="width: 100%"
      >
        <template #title v-if="index===0">
          <span>Body请求体变量</span>
        </template>
        <template #extra v-if="index===0">
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
              v-model="store.Argument_body[index].name"
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
              v-model="store.Argument_body[index].description"
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
              v-model="store.Argument_body[index].example"
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
              v-model="store.Argument_body[index].isRequired"
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
          <el-select v-model="store.Argument_body[index].dataType" class="m-2" placeholder="参数类型" size="small">
            <el-option label="String" value="string"/>
            <el-option label="Object" value="object"/>
            <el-option label="Array" value="array"/>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item v-if="isObject(store.Argument_body[index].dataType)">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              ModelVo类型
            </div>
          </template>
          <el-select v-model="store.Argument_body[index].elementName" class="m-2" placeholder="结构类型" size="small">
            <el-option label="String" value="String"/>
            <el-option label="Object" value="Object"/>
            <el-option label="Array" value="Array"/>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item v-if="isArray(store.Argument_body[index].dataType)">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              元素类型
            </div>
          </template>
          <el-select v-model="store.Argument_body[index].elementName" class="m-2" placeholder="结构类型" size="small">
            <el-option label="String" value="String"/>
            <el-option label="Object" value="Object"/>
            <el-option label="Array" value="Array"/>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </el-space>
  </div>
  <el-space direction="vertical" style="width: 100%" size="default"
            v-for="(arg,index) in store.getMethodArgument" :key="index"
  >
    <div v-if="store.isNotRequestBodyOrServlet(arg)">
      <el-descriptions
          class="margin-top"
          :column="3"
          :size="size"
          border
          style="width: 100%"
      >
        <template #title>
          <el-space wrap>
            <span>{{ arg.parameterName }} </span>
            <el-tag
                v-if="store.isPathValue(arg)"
                type="success"
                class="mx-1"
                effect="dark"
                round
            >
              路径变量
            </el-tag>
          </el-space>
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
              v-model="store.Argument_normal[index].name"
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
              v-model="store.Argument_normal[index].description"
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
              v-model="store.Argument_normal[index].example"
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
              v-model="store.Argument_normal[index].isRequired"
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
          <el-select v-model="store.Argument_normal[index].dataType"
              class="m-2" placeholder="参数类型" size="small">
            <el-option label="String" value="string"/>
            <el-option label="Object" value="object"/>
            <el-option label="Array" value="array"/>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-space>
</template>

<script setup>
import {Document, Postcard, Reading,} from '@element-plus/icons-vue'
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import {MainStore} from "../utils/Store.js";

const store = MainStore()
const size = ref('default')
const argNumber = ref(1)


const handelChange = (currentValue, oldValue) => {
  if (isNaN(currentValue)) return;
  store.handelChangeArg(currentValue,oldValue);
  argNumber.value = currentValue;
}

const isObject = (dataType) => {
  return dataType === "object"
}
const isArray = (dataType) => {
  return dataType === "array"
}
const log = (obj) => {
  console.log(obj)
  return "ARG";
}

const load = () => {

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
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})
</script>

<style scoped>

</style>
