import {defineStore} from "pinia";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const ArgObj = {
    'name': '',
    'description': '',
    'example': '',
    'isRequired': true,
    'dataType': '',
    'elementName': '',
    'subType': '',
    'isObject': false,
    'isArray': false,
    'isPath': false,
}
export const MainStore = defineStore('store', {
    state: () => ({
        CurSelectIndex: ref(0),
        CurSelectIndex_model: ref(0),
        methods: ref([]),
        WebSocket: undefined,
        parameterList: ref([]),
        curSelectMethod: ref({}),
        curSelectModel: ref({}),
        mainTitle: '等待选择',
        RequestBody: ref([]),
        RestFul: ref(),
        Argument_body: ref([]),
        Argument_normal: ref([]),
        Argument_bodyLength: ref([]),
        methodNames:ref([]),
        mh_summary: ref([]),
        mh_description: ref([]),
        ArgSelected: ref(false),
        modelSelected: ref(false),
        RespSelected: ref(false),
        models: ref([]),
        FieldList: ref([]),
        models_refList: ref([]),
        Response:ref([]),
        Response_length:ref([]),
    }),
    getters: {
        getMethods(state) {
            return state.methods;
        },
        getCurrentMethod(state) {
            return state.curSelectMethod;
        },
        getMainTitle(state) {
            return state.mainTitle;
        },
        getMethodArgument(state) {
            return state.parameterList;
        },
        isArgSelected(state) {
            return state.ArgSelected;
        },
        isModelSelected(state) {
            return state.modelSelected;
        },
        isRespSelected(state) {
            return state.RespSelected;
        },
        getModelFields(state) {
            return state.curSelectModel.fieldList;
        },
        getMethodsLength(state) {
            return state.methods.length;
        },
        getCurSelectIndex(state) {
            return state.CurSelectIndex;
        },
        getCurSelectIndex_model(state) {
            return state.CurSelectIndex_model;
        },
    },
    actions: {
        handelChangeArg(newV, oldV, index) {
            if (newV > oldV) {
                for (let i = 0; i < newV - oldV; i++) {
                    this.Argument_body[index].push(Object.assign({}, ArgObj));
                }
            } else {
                for (let i = 0; i < oldV - newV; i++) {
                    this.Argument_body[index].pop();
                }
            }
            this.Argument_bodyLength[index] = newV;
        },
        handelChangeResp(newV, oldV, index) {
            if (newV > oldV) {
                for (let i = 0; i < newV - oldV; i++) {
                    this.Response[index].push(Object.assign({}, ArgObj));
                }
            } else {
                for (let i = 0; i < oldV - newV; i++) {
                    this.Response[index].pop();
                }
            }
            this.Response_length[index] = newV;
        },
        pushResult(obj) {
            this.Result.push(Object.assign({}, obj))
            return null;
        },
        ChangeType_body(val, pIndex, index) {
            if (val === 'Object') {
                this.Argument_body[pIndex][index].isObject = true;
                this.Argument_body[pIndex][index].isArray = false;
            } else if (val === 'Array') {
                this.Argument_body[pIndex][index].isArray = true;
                this.Argument_body[pIndex][index].isObject = false;
            } else {
                this.Argument_body[pIndex][index].isObject = false;
                this.Argument_body[pIndex][index].isArray = false;
            }
        },
        ChangeType_normal(val, pIndex, index) {
            if (val === 'Object') {
                this.Argument_normal[pIndex][index].isObject = true;
                this.Argument_normal[pIndex][index].isArray = false;
            } else if (val === 'Array') {
                this.Argument_normal[pIndex][index].isArray = true;
                this.Argument_normal[pIndex][index].isObject = false;
            } else {
                this.Argument_normal[pIndex][index].isObject = false;
                this.Argument_normal[pIndex][index].isArray = false;
            }
        },
        ChangeType_resp(val, pIndex, index) {
            if (val === 'Object') {
                this.Response[pIndex][index].isObject = true;
                this.Response[pIndex][index].isArray = false;
            } else if (val === 'Array') {
                this.Response[pIndex][index].isArray = true;
                this.Response[pIndex][index].isObject = false;
            } else {
                this.Response[pIndex][index].isObject = false;
                this.Response[pIndex][index].isArray = false;
            }
        },
        getArgumentWithOutBodyOrServlet() {
            let res = this.parameterList.filter(item => {
                {
                    if (item === undefined) return false;
                    let bool = true;
                    for (let i = 0; i < item.AnnotationList.length; i++) {
                        if (item.AnnotationList[i].includes("RequestBody")) bool = false;
                    }
                    if (item.Type.includes("Servlet")) bool = false;
                    return bool;
                }
            })
            return res;
        },
        isRestFulArgument(arg, pIndex, index) {
            let bool = false;
            if (!this.RestFul) return false;
            arg.AnnotationList.forEach((item) => {
                if (item.includes("PathVariable")) bool = true;
            })
            this.Argument_normal[pIndex][index].isPath = bool;
            return bool;
        },
        InitLoad(methods, models) {
            this.methods = methods;
            this.models = models;
            this.models.forEach((item) => {
                this.models_refList.push(item.name)
            })
            this.Argument_body = ref(Array(methods.length))
            this.Argument_normal = ref(Array(methods.length))
            this.Response_length = ref(Array(methods.length).fill(1))
            this.Argument_bodyLength = ref(Array(methods.length).fill(1))
            this.FieldList=ref(Array(models.length))
            this.Response = ref(Array(methods.length))
            for (let i = 0; i < methods.length; i++) {
                this.methodNames.push(methods[i].methodName);
                this.Response[i] = Array(1).fill({}).map(() => Object.assign({}, ArgObj))
                this.Argument_body[i] = Array(1).fill({}).map(() => Object.assign({}, ArgObj))
                //normal
                let count = 0;
                methods[i].parameterList.forEach((item) => {
                    let bool = true;
                    item.AnnotationList.forEach((ann) => {
                        if (ann.includes("Servlet") || ann.includes("RequestBody")) bool = false;
                    })
                    if (bool) count++;
                })
                this.Argument_normal[i] = Array(count).fill({}).map(() => Object.assign({}, ArgObj))
            }
            for (let i = 0; i < models.length; i++) {
                this.FieldList[i] = Array(this.models[i].fieldList.length).fill({}).map(() => Object.assign({}, ArgObj))
            }
            this.models_refList.push('String')
            this.models_refList.push('Number(String)')
        },
        selectMod(index) {
            this.CurSelectIndex_model = index;
            this.mainTitle = "模型参数";
            this.modelSelected = true;
            this.ArgSelected = false;
            this.RespSelected = false;
            this.curSelectModel = this.models[index]
        },
        selectMethod(index) {
            this.CurSelectIndex = index;
            this.modelSelected = false;
            this.ArgSelected = true;
            this.RespSelected = false;
            this.curSelectMethod = this.methods[index];
            this.parameterList = this.curSelectMethod.parameterList;
            let isReqBody = false;
            let isResFul = false;
            for (let i = 0; i < this.parameterList.length; i++) {
                for (let j = 0; j < this.parameterList[i].AnnotationList.length; j++) {
                    //isReqBody
                    if (this.parameterList[i].AnnotationList[j].includes("RequestBody")) {
                        isReqBody = true;
                        //isRestFul
                    } else if (this.parameterList[i].AnnotationList[j].includes("PathVariable")) isResFul = true;
                }
            }
            this.RequestBody[index] = isReqBody;
            this.RestFul = isResFul;
            this.mainTitle = "接口参数";
        },
        selectMethodResp(index){
            this.CurSelectIndex = index;
            this.modelSelected = false;
            this.ArgSelected = false;
            this.RespSelected = true;
        },
        changeType_model(val,pIndex ,index) {
            if (val === 'Object') {
                this.FieldList[pIndex][index].isObject = true;
                this.FieldList[pIndex][index].isArray = false;
            } else if (val === 'Array') {
                this.FieldList[pIndex][index].isObject = false;
                this.FieldList[pIndex][index].isArray = true;
            } else {
                this.FieldList[pIndex][index].isObject = false;
                this.FieldList[pIndex][index].isArray = false;
            }
        },
        UploadData() {
            ElMessageBox.confirm(
                '即将将所有数据上传回IDEA，是否继续',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(() => {
                    let methods = [];
                    let modelList = [];
                    for (let i = 0; i < this.methodNames.length; i++) {
                        let method = {'methodName':this.methodNames[i],'requestBody':this.Argument_body[i],'normalArgument':this.Argument_normal[i],
                            'isRequestBody':this.RequestBody[i],'methodSummary':this.mh_summary[i],'methodDescription':this.mh_description[i],
                            'Response':this.Response
                        }
                        methods.push(method)
                    }
                    for (let i = 0; i < this.models.length; i++) {
                        let obj = {'modelName':this.models[i].name,'fieldList':this.FieldList[i]}
                        modelList.push(obj);
                    }
                    let obj = {'methods': methods, 'models':modelList}
                    console.log(JSON.stringify(obj))
                    if (this.WebSocket === undefined) return;
                    this.WebSocket.send(JSON.stringify(obj))
                    ElMessage({
                        type: 'success',
                        message: '操作成功',
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '操作取消',
                    })
                })
        },
        debug() {
            console.log(this.Argument_body)
            console.log(this.Argument_normal)
            console.log(this.FieldList)
            console.log(this.Response)
        },
    }
})
