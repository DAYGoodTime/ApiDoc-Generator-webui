<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location/></el-icon>
        <span>接口列表</span>
      </template>
      <el-menu-item-group title="接口名字">
         <template v-for="(method,index) in store.getMethods" :key="method.methodName">
           <el-sub-menu :index="'1-'+index">
             <template #title>{{method.methodName}}</template>
             <el-menu-item :index="'1-'+index+'1'" @click="selectArg(index)">接口参数</el-menu-item>
           </el-sub-menu>
         </template>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {Location} from '@element-plus/icons-vue'
import { MainStore } from '../utils/Store'


const store = MainStore()
const selectArg = (index)=>{
  store.changeSelected(false)
  store.$patch({
    curSelectMethod:store.getMethod(index),
  })
  store.changeSelected(true)
}



</script>

<style scoped>

</style>
