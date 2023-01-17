<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px"><Silder/></el-aside>
        <el-main>
          <Main/>
<!--          <Demo v-if="argStore.isSelected" :index="argStore.getCurSelected" />-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Main from "./Main.vue";
import Silder from "./Silder.vue";
import Header from "./Header.vue";
import Demo from "./demo.vue";
import {ArgStore} from "../utils/ArgStore.js";


const argStore = ArgStore()
</script>

<style scoped>

</style>
