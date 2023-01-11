<template>
  <el-row :gutter="20">
    <el-col :span="8" :offset="0">
      <el-row>
        <el-col :span="10">
          <div>
            <span style="float:left;text-align: left" class="ml-3 w-35 text-gray-600 inline-flex items-cente">idea-webSocket地址:&nbsp&nbsp</span>
          </div>
        </el-col>
        <el-col :span="14">
          <div>
            <el-input v-model="host_ip" placeholder="Please input">
              <template #prepend>ws://</template>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" :offset="0">
      <el-button @click="addsocket">连接</el-button>
      <el-button type="danger" @click="closeConnect">断开</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {MainStore} from "../utils/Store.js";

const store = MainStore()
const host_ip = ref("localhost:9984");
let websocket = ref();
const host = ref("")
const getAndLoadMethods = (jsonStr) =>{
  let json = JSON.parse(jsonStr);
  store.$patch((state)=>{
    state.methods = json.methods;
  })
}
const addsocket = () =>{
  if(host_ip===''){
    ElMessage.error('请填写WebSocket服务器地址');
  }
  host.value = "ws://".concat(host_ip.value)
  StartWebSocket(host);
}
const closeConnect = () =>{
  if(websocket!==undefined){
    websocket.close();
    ElMessage({
      message: '连接已断开',
      type: 'warning',
    });
  }
}
import.meta.hot.on('vite:beforeUpdate',closeConnect)
const onOpen = (evt) =>{
  ElMessage({
    message: '连接成功!.',
    type: 'success',
  });
}
const onClose = (evt) =>{
  closeConnect();
}
const onMessage = (evt) =>{
  ElMessage({
    message: '获取成功!.',
    type: 'success',
  });
  getAndLoadMethods(evt.data)
}
const onError = (evt) =>{
  ElMessage.error('发生错误');
}
const StartWebSocket = () =>{
  websocket = new WebSocket(host.value);
  websocket.onopen = function(evt) {
    onOpen(evt)
  };
  websocket.onclose = function(evt) {
    onClose(evt)
  };
  websocket.onmessage = function(evt) {
    onMessage(evt)
  };
  websocket.onerror = function(evt) {
    onError(evt)
  };
}
</script>

<style scoped>

</style>
