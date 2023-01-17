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
        <el-icon>
          <location/>
        </el-icon>
        <span>接口列表</span>
      </template>
      <el-menu-item-group title="接口名字">
        <template v-for="(method,index) in store.getMethods" :key="method.methodName">
          <el-sub-menu :index="'1-'+index">
            <template #title>{{ method.methodName }}</template>
            <el-menu-item :index="'1-'+index+'1'" @click="store.selectMethod(index)">接口参数</el-menu-item>
            <el-menu-item :index="'1-'+index+'2'" @click="store.selectMethodResp(index)">返回参数</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <icon-menu/>
        </el-icon>
        <span>模型列表</span>
      </template>
      <el-menu-item-group v-for="(model,index) in store.models" :key="index">
        <el-menu-item :index="'2-'+index" @click="store.selectMod(index)" ><template #title>{{ model.name }}</template></el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  Location,
  Menu as IconMenu
} from '@element-plus/icons-vue'
import {MainStore} from '../utils/Store'
import {ArgStore} from "../utils/ArgStore.js";

const store = MainStore()
const argStore = ArgStore()



</script>

<style scoped>

</style>
