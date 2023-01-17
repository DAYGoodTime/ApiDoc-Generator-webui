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
    <el-col :span="6" :offset="0">
      <el-button type="success" @click="store.UploadData" plain>上传数据</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {MainStore} from "../utils/Store.js";

const store = MainStore()
const host_ip = ref("localhost:9984");
const host = ref("")
const getAndLoadMethods = (jsonStr) =>{
  let json = JSON.parse(jsonStr);
  store.InitLoad(json.methods,json.models)
  ElMessage({
    message: '连接成功!.',
    type: 'success',
  });
}
const addsocket = () =>{
  // getAndLoadMethods(responseJson)
  if(host_ip===''){
    ElMessage.error('请填写WebSocket服务器地址');
  }
  host.value = "ws://".concat(host_ip.value)
  StartWebSocket(host);
}
const closeConnect = () =>{
    store.WebSocket.close();
    ElMessage({
      message: '连接已断开',
      type: 'warning',
    });
}
import.meta.hot.on('vite:beforeUpdate',closeConnect)
const onOpen = (evt) =>{
  ElMessage({
    message: '连接成功!.',
    type: 'success',
  });
}
const onClose = (evt) =>{
  if(store.WebSocket===undefined) return null;
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
  store.WebSocket = new WebSocket(host.value);

  store.WebSocket.onopen = function(evt) {
    onOpen(evt)
  };
  store.WebSocket.onclose = function(evt) {
    onClose(evt)
  };
  store.WebSocket.onmessage = function(evt) {
    onMessage(evt)
  };
  store.WebSocket.onerror = function(evt) {
    onError(evt)
  };
}

const responseJson =`
{
  "methods": [{
    "methodName": "createSubPost",
    "modifier": "@Operation(summary = \\"创建评论接口\\",description = \\"传入指定参数创建对该贴的评论\\",\\n            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(\\n                    required = true,\\n                    content = @Content(\\n                            mediaType = \\"application/json\\",\\n                            schema = @Schema(implementation = createSubPost.class)\\n                    )\\n\\n            ),\\n            responses = {\\n                    @ApiResponse(responseCode = \\"200\\",description = \\"操作成功,并返回数据(如果有)\\",content = @Content(mediaType = \\"application/json\\",schema = @Schema(implementation = R.class))),\\n                    @ApiResponse(responseCode = \\"100\\",description = \\"操作失败\\",content = @Content(mediaType = \\"application/json\\",schema = @Schema(implementation = R.class)))\\n            }\\n    )\\n    @PostMapping(\\"/createSubPost\\")\\n    public",
    "parameterList": [{
      "parameterName": "request",
      "AnnotationList": ["Parameter", "RequestBody"],
      "Type": "JSONObject"
    }],
    "returnType": "R"
  }, {
    "methodName": "getPost",
    "modifier": "@Operation(summary = \\"查看帖子详情\\",\\n            description = \\"查看帖子详情\\",\\n            responses = {\\n                    @ApiResponse(responseCode = \\"200\\",description = \\"操作成功,并返回数据\\",\\n                            content = @Content(mediaType = \\"application/json\\",schema = @Schema(implementation = getPostResp.class))),\\n                    @ApiResponse(responseCode = \\"100\\",description = \\"操作失败\\",\\n                            content = @Content(mediaType = \\"application/json\\",schema = @Schema(implementation = R_Fail.class)))\\n            }\\n    )\\n    @GetMapping(path = \\"/getPost/{pid}\\")\\n    public",
    "parameterList": [{
      "parameterName": "post_id",
      "AnnotationList": ["Parameter", "PathVariable"],
      "Type": "String"
    }, {
      "parameterName": "user_id",
      "AnnotationList": ["Parameter"],
      "Type": "String"
    }],
    "returnType": "R"
  }, {
    "methodName": "getLocation",
    "modifier": "@Operation(summary = \\"地区获取接口\\",description = \\"访问该接口，返回当前访问用户的地区信息\\")\\n    @GetMapping(\\"/toGetIpLocation\\")\\n    public",
    "parameterList": [{
      "parameterName": "request",
      "AnnotationList": [],
      "Type": "HttpServletRequest"
    }],
    "returnType": "R"
  }, {
    "methodName": "createAnPost",
    "modifier": "@Operation(summary = \\"上传帖子\\",\\n            description = \\"创建帖子,注意,你需要传递一个表单数据\\",\\n            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = \\"表单数据\\",content = @Content(mediaType = \\"multipart/form-data\\",\\n                    schema = @Schema(implementation = createAnPostReq.class)))\\n            ,\\n            responses = {\\n                    @ApiResponse(responseCode = \\"200\\",description = \\"操作成功\\",content = @Content(mediaType = \\"application/json\\",schema = @Schema(implementation = R_Success.class))),\\n                    @ApiResponse(responseCode = \\"100\\",description = \\"操作失败\\",content = @Content(mediaType = \\"application/json\\",schema = @Schema(implementation = R_Fail.class)))\\n            }\\n    )\\n    @PostMapping(path = \\"/createPost\\",produces = \\"application/json\\")\\n    public",
    "parameterList": [{
      "parameterName": "pictures",
      "AnnotationList": ["Parameter"],
      "Type": "MultipartFile[]"
    }, {
      "parameterName": "title",
      "AnnotationList": ["Parameter"],
      "Type": "String"
    }, {
      "parameterName": "context",
      "AnnotationList": ["Parameter"],
      "Type": "String"
    }, {
      "parameterName": "uid",
      "AnnotationList": ["Parameter"],
      "Type": "String"
    }],
    "returnType": "R"
  }, {
    "methodName": "getAllPost",
    "modifier": "@Operation(summary = \\"查询所有帖子\\",\\n            description = \\"查询所有帖子(TODO:未来可能会做成分页，目前只会显示前5个)\\",\\n            parameters = {\\n                    @Parameter(name = \\"uid\\", description = \\"用户id\\", required = true,in = ParameterIn.PATH)\\n            },\\n            responses = {\\n                    @ApiResponse(responseCode = \\"200\\",description = \\"操作成功\\",content = @Content(mediaType = \\"application/json\\",schema = @Schema(implementation = getAllPostResp.class))),\\n                    @ApiResponse(responseCode = \\"100\\",description = \\"操作失败\\",content = @Content(mediaType = \\"application/json\\",schema = @Schema(implementation = R_Fail.class)))\\n            }\\n    )\\n    @GetMapping(path = \\"/getAllPost/{uid}\\")\\n    public",
    "parameterList": [{
      "parameterName": "uid",
      "AnnotationList": ["PathVariable"],
      "Type": "String"
    }],
    "returnType": "R"
  }],
  "models": [{
    "name": "R",
    "fieldList": [{
      "name": "code",
      "dataType": "String"
    }, {
      "name": "msg",
      "dataType": "String"
    }, {
      "name": "data",
      "dataType": "Object"
    }]
  }, {
    "name": "Post",
    "fieldList": [{
      "name": "postId",
      "dataType": "String"
    }, {
      "name": "postTile",
      "dataType": "String"
    }, {
      "name": "userId",
      "dataType": "String"
    }, {
      "name": "context",
      "dataType": "String"
    }, {
      "name": "createTime",
      "dataType": "Timestamp"
    }]
  }, {
    "name": "User",
    "fieldList": [{
      "name": "userId",
      "dataType": "String"
    }, {
      "name": "userName",
      "dataType": "String"
    }, {
      "name": "userImg",
      "dataType": "String"
    }]
  }, {
    "name": "SubPost",
    "fieldList": [{
      "name": "subId",
      "dataType": "String"
    }, {
      "name": "linkId",
      "dataType": "String"
    }, {
      "name": "context",
      "dataType": "String"
    }, {
      "name": "userId",
      "dataType": "String"
    }, {
      "name": "createTime",
      "dataType": "Timestamp"
    }, {
      "name": "location",
      "dataType": "String"
    }, {
      "name": "subPostList",
      "dataType": "List<SubPost>"
    }]
  }, {
    "name": "PostVo",
    "fieldList": [{
      "name": "postId",
      "dataType": "String"
    }, {
      "name": "postTile",
      "dataType": "String"
    }, {
      "name": "context",
      "dataType": "String"
    }, {
      "name": "userId",
      "dataType": "String"
    }, {
      "name": "userName",
      "dataType": "String"
    }, {
      "name": "userImg",
      "dataType": "String"
    }, {
      "name": "pictureUrls",
      "dataType": "List<String>"
    }, {
      "name": "isSubscribe",
      "dataType": "boolean"
    }, {
      "name": "createTime",
      "dataType": "Timestamp"
    }]
  }, {
    "name": "SubPostVo",
    "fieldList": [{
      "name": "subId",
      "dataType": "String"
    }, {
      "name": "linkId",
      "dataType": "String"
    }, {
      "name": "context",
      "dataType": "String"
    }, {
      "name": "userId",
      "dataType": "String"
    }, {
      "name": "userName",
      "dataType": "String"
    }, {
      "name": "userImg",
      "dataType": "String"
    }, {
      "name": "createTime",
      "dataType": "Timestamp"
    }, {
      "name": "location",
      "dataType": "String"
    }, {
      "name": "subPostList",
      "dataType": "List<SubPostVo>"
    }]
  }]
}
`


</script>

<style scoped>

</style>
