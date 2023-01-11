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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Main from "./Main.vue";
import Silder from "./Silder.vue";
import Header from "./Header.vue";
</script>

<style scoped>

</style>
