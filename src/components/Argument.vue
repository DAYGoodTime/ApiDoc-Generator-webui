<template>
  <el-space direction="vertical" size="default">
    <div v-if="store.RequestBody">
      <div v-for="(item,index) in store.ArgLength_body">
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
            <el-select v-model="store.Argument_body[index].dataType" class="m-2" placeholder="参数类型" size="small"
                       @change="store.ChangeType_body($event,index)"
            >
              <el-option label="String" value="String"/>
              <el-option label="Object" value="Object"/>
              <el-option label="Array" value="Array"/>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item v-if="store.Argument_body[index].isObject">
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
          <el-descriptions-item v-if="store.Argument_body[index].isArray">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Reading/>
                </el-icon>
                元素类型
              </div>
            </template>
            <el-select v-model="store.Argument_body[index].subType" class="m-2" placeholder="结构类型" size="small">
              <el-option label="String" value="String"/>
              <el-option label="Object" value="Object"/>
              <el-option label="Array" value="Array"/>
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
                <el-tag v-if="store.isRestFulArgument(arg)"
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
          <el-select v-model="store.Argument_normal[index].dataType" class="m-2" placeholder="参数类型" size="small"
                     @change="store.ChangeType_normal($event,index)"
          >
            <el-option label="String" value="String"/>
            <el-option label="Object" value="Object"/>
            <el-option label="Array" value="Array"/>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item v-if="store.Argument_normal[index].isObject">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              ModelVo类型
            </div>
          </template>
          <el-select v-model="store.Argument_normal[index].elementName" class="m-2" placeholder="结构类型" size="small">
            <el-option label="String" value="String"/>
            <el-option label="Object" value="Object"/>
            <el-option label="Array" value="Array"/>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item v-if="store.Argument_normal[index].isArray">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Reading/>
              </el-icon>
              元素类型
            </div>
          </template>
          <el-select v-model="store.Argument_normal[index].subType" class="m-2" placeholder="结构类型" size="small">
            <el-option label="String" value="String"/>
            <el-option label="Object" value="Object"/>
            <el-option label="Array" value="Array"/>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-popconfirm
        width="220"
        confirm-button-text="让我保存！"
        cancel-button-text="等会哦"
        :icon="Warning"
        icon-color="#626AEF"
        title="数据都填好了吗?"
        :on-confirm="saveThisMethod"
    >
      <template #reference>
        <el-button type="success" round>保存</el-button>
      </template>
    </el-popconfirm>
  </el-space>
</template>

<script setup>
import {Document, Postcard, Reading, Warning} from '@element-plus/icons-vue'
import {computed, ref} from "vue";
import {MainStore} from "../utils/Store.js";
import {ElMessage} from "element-plus";
import index from "vuex";

const store = MainStore()
const size = ref('default')
const argNumber = ref(1)

const TemplateResult = {
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
  store.pushResult(TemplateResult);
  ElMessage({
    showClose: true,
    message: '保存成功!',
    type: 'success',
  })
}

const handelChange = (currentValue, oldValue) => {
  if (isNaN(currentValue)) return;
  store.handelChangeArg(currentValue, oldValue);
  argNumber.value = currentValue;
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
