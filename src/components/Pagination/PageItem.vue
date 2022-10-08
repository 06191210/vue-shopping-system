<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>

        <!-- 中间部分 -->
        <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)"  :class="{active:pageNo==page}">{{page}}</button>

        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
        <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>
  
<script>
export default {
    name: "PageItem",
    props:['pageNo','pageSize','total','continues'],
    computed:{
         //计算多少页
    totalPage(){
        //向上取整
        return Math.ceil(this.total/this.pageSize);
    },
    //计算出连续的页码起始数字和结束数字
    startNumAndEndNum(){
        const {continues,totalPage,pageNo} = this;
        //先定义两个变量存储起始数字与结束数字
        let start = 0 , end = 0;
        //连续页码数字为5,页面数量至少有5页,不正常现象
        if(continues > totalPage){
            start = 1;
            end = totalPage;
        }else{
            //正常现象 总页数大于5
            //起始数字
            start = pageNo - parseInt(continues/2);
            //结束数字
            end = pageNo + parseInt(continues/2);
            //把start出现负数的纠正
            if(start < 1){
                start = 1;
                end = continues;
            }
            //把end不正常的现象矫正
            if(end > totalPage){
                end = totalPage;
                start = totalPage - continues + 1;
            }
        }
        return{start, end};
    },
    },
};
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
.active{
    background: skyblue;
}
</style>
  