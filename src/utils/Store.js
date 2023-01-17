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
    'isPath':false,//useless
}
const fieldTemplate = {
    'name': '',
    'description': '',
    'isRequired': true,
    'example': '',
    'dataType': '',
    'elementName': '',
    'subType': '',
    'isPath':false,
    'isObject': false,
    'isArray': false,
}
export const MainStore = defineStore('store', {
    state: () => ({
        methods: ref([]),
        WebSocket: undefined,
        parameterList: ref([]),
        curSelectMethod: ref({}),
        curSelectModel: ref({}),
        mainTitle: '等待选择',
        RequestBody: ref(),
        RestFul: ref(),
        ArgLength: ref(1),//普通参数的长度
        ArgLength_body: ref(1),//请求体参数的长度
        Argument_body: ref(Array(1).fill({}).map(() => Object.assign({}, ArgObj))),
        Argument_normal: ref([]),
        mh_summary: ref(''),
        mh_description: ref(''),
        Result: ref([]),
        SchemaList: ref([]),
        ArgSelected: ref(false),
        modelSelected: ref(false),
        models: ref([]),
        Result_models: ref([]),
        FieldList: ref([]),
        models_refList: ref([]),
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
        getArgLength(state) {
            return state.ArgLength;
        },
        isArgSelected(state) {
            return state.ArgSelected;
        },
        isModelSelected(state) {
            return state.modelSelected;
        },
        getModelFields(state) {
            return state.curSelectModel.fieldList;
        }
    },
    actions: {
        getMethod(index) {
            let method = this.methods[index];
            let isReqBody = false;
            let isResFul = false;
            //LoadArgumentList
            let argList = method.parameterList;
            this.ArgLength = argList.length;
            for (let i = 0; i < argList.length; i++) {
                for (let j = 0; j < argList[i].AnnotationList.length; j++) {
                    //isReqBody
                    if (argList[i].AnnotationList[j].includes("RequestBody")) {
                        isReqBody = true;
                        //isRestFul
                    } else if (argList[i].AnnotationList[j].includes("PathVariable") ) isResFul = true;
                }
            }
            this.parameterList = argList;
            this.mainTitle = "接口参数";
            this.RequestBody = isReqBody;
            this.RestFul = isResFul;
            //Init ArgumentList
            this.Argument_normal = Array(argList.length).fill({}).map(() => Object.assign({}, ArgObj))
            console.log(this.Argument_normal)
            return method;
        },
        handelChangeArg(newV, oldV) {
            this.ArgLength_body = newV
            if (newV > oldV) {
                for (let i = 0; i < newV - oldV; i++) {
                    this.Argument_body.push(Object.assign({}, ArgObj));
                }
            } else {
                for (let i = 0; i < oldV - newV; i++) {
                    this.Argument_body.pop();
                }
            }
        },
        pushResult(obj) {
            this.Result.push(Object.assign({}, obj))
            return null;
        },
        ChangeType_body(val, index) {
            if (val === 'Object') {
                this.Argument_body[index].isObject = true;
                this.Argument_body[index].isArray = false;
            } else if (val === 'Array') {
                this.Argument_body[index].isArray = true;
                this.Argument_body[index].isObject = false;
            } else {
                this.Argument_body[index].isObject = false;
                this.Argument_body[index].isArray = false;
            }
        },
        ChangeType_normal(val, index) {
            if (val === 'Object') {
                this.Argument_normal[index].isObject = true;
                this.Argument_normal[index].isArray = false;
            } else if (val === 'Array') {
                this.Argument_normal[index].isArray = true;
                this.Argument_normal[index].isObject = false;
            } else {
                this.Argument_normal[index].isObject = false;
                this.Argument_normal[index].isArray = false;
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
            console.log(res)
            return res;
        },
        isRestFulArgument(arg,index) {
            let bool = false;
            if (!this.RestFul) return false;
            arg.AnnotationList.forEach((item) => {
                if (item === "PathVariable") bool = true;
            })
            this.Argument_normal[index].isPath = bool;
            return bool;
        },
        InitLoad(methods, models) {
            this.methods = methods;
            this.models = models;
            this.models.forEach((item) => {
                this.models_refList.push(item.name)
            })
            this.models_refList.push('String')
            this.models_refList.push('Number(String)')
        },
        selectMod(index) {
            this.mainTitle = "模型参数";
            this.modelSelected = true;
            this.ArgSelected = false;
            this.curSelectModel = this.models[index]
            this.FieldList = ref(Array(this.curSelectModel.fieldList.length).fill({}).map(() => Object.assign({}, fieldTemplate)));
        },
        selectMethod(index) {
            this.modelSelected = false;
            this.ArgSelected = true;
            this.curSelectMethod = this.getMethod(index)
        },
        pushResultModel(model) {
            this.Result_models.push(model);
        },
        changeType_model(val, index) {
            if (val === 'Object') {
                this.FieldList[index].isObject = true;
                this.FieldList[index].isArray = false;
            } else if (val === 'Array') {
                this.FieldList[index].isObject = false;
                this.FieldList[index].isArray = true;
            } else {
                this.FieldList[index].isObject = false;
                this.FieldList[index].isArray = false;
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
                    let obj = {'methods':this.Result,'models':this.Result_models}
                    console.log(JSON.stringify(obj))
                    if(this.WebSocket===undefined) return;
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
        }
    }
})
