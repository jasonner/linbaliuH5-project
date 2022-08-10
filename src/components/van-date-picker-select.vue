<template>
    <div>
        <div class="van-picker-model" v-show="pickerShow"></div>
        <div class="van-picker-select" v-show="pickerShow">
           <van-datetime-picker
                v-model="currentDate"
                show-toolbar  
                :columns="columns"   
                @confirm="onConfirm"
                @cancel="onCancel"
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            columns:[],
            pickerShow:false,
            minDate: new Date(1909, 0, 1),
            maxDate: new Date(2325, 10, 1),
            currentDate: new Date(new Date().getFullYear(),(new Date().getMonth() < 10 ? '0' + (new Date().getMonth()) : new Date().getMonth()), (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate())),
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
            this.$emit('DateFunc',this.timeStrChange(value));
            this.currentDate=new Date(new Date().getFullYear(),(new Date().getMonth() < 10 ? '0' + (new Date().getMonth()) : new Date().getMonth()), (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()));
        },

        //日期选择取值
        onDatePickerConfirm(res){
            let that = this;
            this.pickerShow =true;
            that.columns = [];
            if(res && res.length>0){
                res.forEach(element => {
                    that.columns.push(element);
                });
            }
        },

        //时间戳转日期
        timeStrChange(data){
          var date = new Date(data)
          var Y = date.getFullYear() + '-'
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
        //   var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        //   var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        //   var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
          return Y + M + D
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
.van-picker__title{
    line-height: 3.25 !important;
}
</style>
