import {defineStore} from "pinia";
import {ref} from "vue";

const ArgObj = {
    'name': '',
    'description': '',
    'example': '',
    'isRequired': true,
    'dataType': '',
    'elementName': '',
    'isPath': false,
    'subType':'',
}
export const MainStore = defineStore('store', {
    state: () => ({
        methods: ref([]),
        parameterList:ref([]),
        curSelectMethod: ref({}),
        mainTitle: '等待选择',
        RequestBody: ref(),
        RestFul: ref(),
        ArgLength:ref(1),
        ArgLength_body:ref(1),
        Argument_body:ref([ArgObj]),
        Argument_normal:ref([ArgObj]),
    })
        ,
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
            //LoadArgModel
            if (argList.length>this.Argument_normal.length){
                for (let i = 0; i <= argList.length-this.Argument_normal.length; i++) {
                    this.Argument_normal.push(ArgObj)
                }
            }else if(argList.length<this.Argument_normal.length){
                for (let i = 0; i < this.Argument_normal.length-argList.length; i++) {
                    this.Argument_normal.pop()
                }
            }
            console.log(this.Argument_normal)

            return method;
        },
        isNotRequestBodyOrServlet(arg){
            if(arg===undefined) return ;
            let bool = true;
            for (let i = 0; i < arg.AnnotationList.length; i++) {
                if(arg.AnnotationList[i]==="RequestBody") bool = false;
            }
            if(arg.Type.includes("Servlet")) bool = false;
            return bool;
        },
        handelChangeArg(newV,oldV){
            this.ArgLength_body = newV
            if (newV > oldV) {
                for (let i = 0; i < newV - oldV; i++) {
                    this.Argument_body.push(ArgObj);
                }
            } else {
                for (let i = 0; i < oldV - newV; i++) {
                    this.Argument_body.pop();
                }
            }
        },
    }
})
