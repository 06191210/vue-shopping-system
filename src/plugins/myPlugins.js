
//Vue 插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue,option){
    Vue.directive(option.name,(element,params)=>{
        console.log(element,params);
        element.innerHTML = params.value.toUpperCase();
    });
    console.log('调用');
}

export default myPlugins;