<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> {{ store.getMainTitle }} </span>
    </template>
  </el-page-header>
  <el-divider/>
  <el-descriptions
      v-if="store.mainTitle==='接口参数'"
      class="margin-top"
      :column="3"
      :size="size"
      border
  >
    <template #title>
      <el-space wrap>
        <span>接口信息   </span>
        <el-check-tag type="success" :checked="store.RequestBody" @change="ReqBodyTagChange">RequestBody</el-check-tag>
        <el-check-tag type="success" :checked="store.RestFul" @change="RestFulTagChange">RestFul风格</el-check-tag>
      </el-space>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Document/>
          </el-icon>
          接口标题
        </div>
      </template>
      <el-input
          v-model="store.mh_summary"
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
          接口描述
        </div>
      </template>
      <el-input
          v-model="store.mh_description"
          class="w-50 m-2"
          placeholder="Type something"
      />
    </el-descriptions-item>
  </el-descriptions>
  <el-divider/>
  <argument v-if="store.isSelected"/>


</template>
<script setup>
import {MainStore} from "../utils/Store.js";
import Argument from "./Argument.vue";
import {computed, onMounted, ref} from "vue";
import {Document, Postcard} from "@element-plus/icons-vue";

const store = MainStore()
const size = ref('default')
const ReqBodyTagChange = (status) => {
  store.$patch({
    RequestBody: status
  })
}
const RestFulTagChange = (status) => {
  store.$patch({
    RestFul: status
  })
}
const log = () => {
  console.log("MAIN")
  return "1111"
}
const goBack = () => {

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
