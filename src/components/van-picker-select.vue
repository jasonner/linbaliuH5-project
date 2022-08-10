<template>
    <div>
        <div class="van-picker-model" v-show="pickerShow"></div>
        <div class="van-picker-select" v-show="pickerShow">
            <van-picker show-toolbar  :columns="columns"   @confirm="onConfirm"
                @cancel="onCancel"
              :default-index="2"
            />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            columns:[],
            pickerShow:false
        }
    },
    mounted(){

    },
    methods:{
        onCancel(){
            this.pickerShow =false;
        },
        onConfirm(value,index){
            this.pickerShow =false;
            this.$emit('func',value)
        },

        //取值
        onPickerConfirm(res){
            let that = this;
            this.pickerShow =true;
            that.columns = [];
            if(res.length>0){
                res.forEach(element => {
                    that.columns.push(element);
                });
            }
        },
    }
}
</script>
<style>
.van-picker-select{
    width: 100%;
    height: 30vh;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
}
.van-picker-model{
    width:100vw;
    height: 100%vh;
    background: #000;
    opacity: 0.3;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
}
.van-picker-select .van-picker__cancel, .van-picker-select .van-picker__confirm{
    font-size: 4vw;
}
.van-picker-select .van-picker__confirm{
    color: #2fc0c5;
}
.van-picker-select .van-ellipsis{
    font-size: 4vw;
}
.van-picker-select  .van-picker__toolbar{
    height: 10vw;
}
</style>
