import {defineStore} from "pinia";
import {reactive, ref, toRef} from "vue";

const ArgObj = {
    'name': '',
    'description': '',
    'example': '',
    'isRequired': true,
    'dataType': '',
    'elementName': '',
    'isPath': false,
    'subType':'',
    'isObject':false,
    'isArray':false,
}
export const MainStore = defineStore('store', {
    state: () => ({
        methods: ref([]),
        WebSocket:undefined,
        parameterList:ref([]),
        curSelectMethod: ref({}),
        mainTitle: '等待选择',
        RequestBody: ref(),
        RestFul: ref(),
        ArgLength:ref(1),//普通参数的长度
        ArgLength_body:ref(1),//请求体参数的长度
        Argument_body:ref(Array(1).fill({}).map(() => Object.assign({}, ArgObj))),
        Argument_normal:ref([]),
        mh_summary:ref(''),
        mh_description:ref(''),
        Result:ref([]),
        SchemaList:ref([]),
        Selected:ref(false),
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
        isPathValue(){
            return (arg) =>{
                let bool = false;
                arg.AnnotationList.forEach((item)=>{
                    if(item==="PathVariable") bool = true;

                })
                return bool;
            }
        },
        getArgLength(state){
            return state.ArgLength;
        },
        isSelected(state){
            return state.Selected;
        },
    },
    actions: {
        getMethod(index){
            let method = this.methods[index];
            let isReqBody = false;
            let isResFul = false;
            //LoadArgumentList
            let argList = method.parameterList;
            this.ArgLength = argList.length;
            for (let i = 0; i < argList.length; i++) {
                for (let j = 0; j <argList[i].AnnotationList.length ; j++) {
                    //isReqBody
                    if(argList[i].AnnotationList[j]==="RequestBody"){
                        isReqBody = true;
                        //isRestFul
                    }else if(argList[i].AnnotationList[j]==="PathVariable") isResFul = true;
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
        handelChangeArg(newV,oldV){
            this.ArgLength_body = newV
            if (newV > oldV) {
                for (let i = 0; i < newV - oldV; i++) {
                    this.Argument_body.push(Object.assign({},ArgObj));
                }
            } else {
                for (let i = 0; i < oldV - newV; i++) {
                    this.Argument_body.pop();
                }
            }
        },
        pushResult(obj){
            this.Result.push(Object.assign({},obj))
            return null;
        },
        changeSelected(bool){
            this.Selected = bool;
        },
        ChangeType_body(val,index){
            if(val==='Object'){
                this.Argument_body[index].isObject = true;
                this.Argument_body[index].isArray = false;
            }else if(val==='Array') {
                this.Argument_body[index].isArray = true;
                this.Argument_body[index].isObject = false;
            } else {
                this.Argument_body[index].isObject = false;
                this.Argument_body[index].isArray = false;
            }
        },
        ChangeType_normal(val,index){
            if(val==='Object'){
                this.Argument_normal[index].isObject = true;
                this.Argument_normal[index].isArray = false;
            }else if(val==='Array') {
                this.Argument_normal[index].isArray = true;
                this.Argument_normal[index].isObject = false;
            } else {
                this.Argument_normal[index].isObject = false;
                this.Argument_normal[index].isArray = false;
            }
        },
        getArgumentWithOutBodyOrServlet(){
            let res = this.parameterList.filter(item =>{
                {
                    if(item===undefined) return false;
                    let bool = true;
                    for (let i = 0; i < item.AnnotationList.length; i++) {
                        if(item.AnnotationList[i]==="RequestBody") bool = false;
                    }
                    if(item.Type.includes("Servlet")) bool = false;
                    return bool;
                }
            })
            console.log(res)
            return res;
        },
        isRestFulArgument(arg){
            let bool = false;
            if(!this.RestFul) return false;
            arg.AnnotationList.forEach((item)=>{
                if(item==="PathVariable") bool = true;
            })
            return bool;
        },
    }
})
