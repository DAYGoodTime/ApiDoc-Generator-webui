<template>
  <el-divider/>
  <el-space direction="vertical" size="default">
    <div v-if="store.RequestBody[props.index]">
      <div v-for="(item,index) in store.Argument_bodyLength[props.index]">
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
            <el-input-number v-model="store.Argument_bodyLength[props.index]" :min="1" @change="(...event) =>{handelChange(event, props.index)}"/>
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
                v-model="store.Argument_body[props.index][index].name"
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
                v-model="store.Argument_body[props.index][index].description"
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
                v-model="store.Argument_body[props.index][index].example"
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
                v-model="store.Argument_body[props.index][index].isRequired"
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
            <el-select v-model="store.Argument_body[props.index][index].dataType" class="m-2" placeholder="参数类型" size="small"
                       @change="store.ChangeType_body($event,props.index,index)"
            >
              <el-option label="String" value="String"/>
              <el-option label="Object" value="Object"/>
              <el-option label="Array" value="Array"/>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item v-if="store.Argument_body[props.index][index].isObject">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Reading/>
                </el-icon>
                ModelVo类型
              </div>
            </template>
            <el-select v-model="store.Argument_body[props.index][index].elementName"
                       class="m-2" placeholder="结构类型" size="small">
              <el-option v-for="item in store.models_refList" :key="item"
                  :label="item" :value="item+'.class'"/>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item v-if="store.Argument_body[props.index][index].isArray">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Reading/>
                </el-icon>
                元素类型
              </div>
            </template>
            <el-select v-model="store.Argument_body[props.index][index].subType"
                       class="m-2" placeholder="结构类型" size="small">
              <el-option v-for="item in store.models_refList" :key="item"
                  :label="item" :value="item+'.class'"/>
            </el-select>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div v-for="(arg,index) in store.getArgumentWithOutBodyOrServlet()" :key="index">
      <el-descriptions
          class="margin-top"
          :column="3"
          :size="size"
          border
          style="width: 100%"
      >
        <template #title>
          <span>{{ arg.parameterName }}
                <el-tag v-if="store.isRestFulArgument(arg,props.index,index)"
                        type="success"

                        class="mx-1"
                        effect="dark"
                        round>
                  路径变量</el-tag>
          </span>
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
              v-model="store.Argument_normal[props.index][index].name"
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
              v-model="store.Argument_normal[props.index][index].description"
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
              v-model="store.Argument_normal[props.index][index].example"
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
              v-model="store.Argument_normal[props.index][index].isRequired"
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
          <el-select v-model="store.Argument_normal[props.index][index].dataType" class="m-2" placeholder="参数类型" size="small"
                     @change="store.ChangeType_normal($event,props.index,index)"
          >
            <el-option label="String" value="String"/>
            <el-option label="Object" value="Object"/>
            <el-option label="Array" value="Array"/>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item v-if="store.Argument_normal[props.index][index].isObject">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              ModelVo类型
            </div>
          </template>
          <el-select v-model="store.Argument_normal[props.index][index].elementName"
                     class="m-2" placeholder="结构类型" size="small">
            <el-option
                v-for="item in store.models_refList" :key="item"
                :label="item" :value="item+'.class'"/>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item v-if="store.Argument_normal[props.index][index].isArray">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              元素类型
            </div>
          </template>
          <el-select v-model="store.Argument_normal[props.index][index].subType"
                     class="m-2" placeholder="结构类型" size="small">
            <el-option  v-for="item in store.models_refList" :key="item"
                :label="item" :value="item+'.class'"/>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-space>
</template>

<script setup>
import {Document, Postcard, Reading, Warning} from '@element-plus/icons-vue'
import {computed, ref} from "vue";
import {MainStore} from "../utils/Store.js";
import {ElMessage} from "element-plus";

const store = MainStore()
const size = ref('default')
const argNumber = 1
const props = defineProps(['index'])

const TemplateResult = {
  'isRequestBody':false,
  'methodName': '',
  'RequestBody': [],
  'normalArgument': [],
  'methodSummary': '',
  'methodDescription': '',
}

const saveThisMethod = () => {
  TemplateResult.methodName = store.curSelectMethod.methodName
  TemplateResult.RequestBody = store.Argument_body
  TemplateResult.methodSummary = store.mh_summary
  TemplateResult.methodDescription = store.mh_description
  TemplateResult.normalArgument = store.Argument_normal
  TemplateResult.isRequestBody = store.RequestBody
  store.pushResult(TemplateResult);
  ElMessage({
    showClose: true,
    message: '保存成功!',
    type: 'success',
  })
}

const handelChange = (evt,index) => {
  let currentValue = evt[0];
  let oldValue = evt[1];
  if (isNaN(currentValue)) return;
  store.handelChangeArg(currentValue, oldValue,index);
}
const log = (obj) => { //debug use
  console.log(obj)
  return "ARG";
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
