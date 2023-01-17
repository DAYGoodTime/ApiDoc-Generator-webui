<template>
  <div v-for="(item,index) in store.getRespLength(props.index)">
    <el-descriptions
        class="margin-top"
        :column="3"
        :size="size"
        border
        style="width: 100%"
    >
      <template #title v-if="index===0">
        <span>返回信息设置</span>
      </template>
      <template #extra v-if="index===0">
        <el-input-number v-model="argNumber" :min="1" @change="(...event) =>{handelChange(event, index)}"/>
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
            v-model="store.Response[props.index][index].name"
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
            v-model="store.Response[props.index][index].description"
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
            v-model="store.Response[props.index][index].example"
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
            v-model="store.Response[props.index][index].isRequired"
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
        <el-select v-model="store.Response[props.index][index].dataType" class="m-2" placeholder="参数类型" size="small"
                   @change="store.ChangeType_resp($event,props.index,index)"
        >
          <el-option label="String" value="String"/>
          <el-option label="Object" value="Object"/>
          <el-option label="Array" value="Array"/>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item v-if="store.Response[props.index][index].isObject">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Reading/>
            </el-icon>
            ModelVo类型
          </div>
        </template>
        <el-select v-model="store.Response[props.index][index].elementName"
                   class="m-2" placeholder="结构类型" size="small">
          <el-option v-for="item in store.models_refList" :key="item"
                     :label="item" :value="item+'.class'"/>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item v-if="store.Response[props.index][index].isArray">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Reading/>
            </el-icon>
            元素类型
          </div>
        </template>
        <el-select v-model="store.Response[props.index][index].subType"
                   class="m-2" placeholder="结构类型" size="small">
          <el-option v-for="item in store.models_refList" :key="item"
                     :label="item" :value="item+'.class'"/>
        </el-select>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import {Document, Postcard, Reading, Warning} from '@element-plus/icons-vue'
import {computed, ref} from "vue";
import {MainStore} from "../utils/Store.js";

const props = defineProps(['index'])
const store = MainStore()
const size = ref('default')
const argNumber = 1

const handelChange = (evt,index) => {
  let currentValue = evt[0];
  let oldValue = evt[1];
  if (isNaN(currentValue)) return;
  store.handelChangeResp(currentValue, oldValue,index);
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
