<template>
    <div class="recordList-page">
        <div class="header-list">
            <div>送检机构选择 <sup>*</sup></div>
            <div :class="{active:organization=='1'}" @click="ruiangChange()">
                <img src="@/assets/img/jinxiang/ruiang-icon.png" alt="" srcset="">
                睿昂
            </div>
            <div>
                <img src="@/assets/img/jinxiang/jinxiang-icon.png" alt="" srcset="">
                金橡
                <span>指定医院</span>
            </div>
        </div>
        <jinxiangList class="jinxiangList" ref="PickerSelect"></jinxiangList>    
            
    </div>

</template>
<script>
import jinxiangList from '@/components/jinxiang';
import ruiangList from '@/view/addDetail';
import Vue from 'vue'
import { Dialog } from 'vant';
Vue.use(Dialog);
export default {
    data(){
        return{
            openid:null,
            id:null,
            organization:null,
            ruiangClick:true,
        }
    },
    components:{
      'jinxiangList':jinxiangList,
      'ruiangList':ruiangList
    },
    mounted(){
        var query=this.$route.query;
        if(query.id){
            this.id = query.id;
            this.organization = query.organization;
        };
        if(query.openid){
            this.openid = query.openid;
            this.getuserInfoChange();
        };
        
        console.log(this.joinType)
    },

    methods:{
         //获取用户信息
        getuserInfoChange(){
            let that = this;
            that.axios.get('/api/NHL/GetUserInfo',{
            params: {
                openid:that.openid,
            }
            }).then(function (res) {
                console.log(res.data);
                if(res.data.s){
                    if(res.data.data && res.data.data !=''){
                        console.log(res.data.data.organization)
                        if(res.data.data.organization == '1'){
                            that.ruiangClick = false;
                        }else{
                            that.ruiangClick = true;
                        }
                    }
                }
            })
        },
        ruiangChange(){
            if(this.ruiangClick){
                if(this.openid && this.id){
                    Dialog.alert({
                        title: '提示',
                        message: '您不能填写此项检测',
                        }).then(() => {
                        // on close

                    });
                }else if(this.openid){
                    this.$router.replace({ path: "/addDetail",query: {openid:this.openid}});
                }
            }else{
                Dialog.alert({
                    title: '提示',
                    message: '您不能填写此项检测',
                    }).then(() => {
                    // on close

                });
            }
        }
    }

}
</script>
<style scoped>
.header-list{
    width: 100%;
    height:403px;
    background: #3bc4c9;
    background-size: 100% 100%;
    display: grid;
    grid-gap: 12px;
    grid-template-columns: 240px 199px 302px;
    padding-top: 23px;
    box-sizing: border-box;

}
.jinxiangList{
    width: 100%;
    overflow: hidden;
}
.header-list div:nth-of-type(1){
    line-height: 40px;
}
.header-list div{
    font-size: 32px;
    font-family: PingFang, PingFang-SC-Bold;
    font-weight: normal;
    text-align: center;
    color: #ffffff;
    line-height: 72px;
    letter-spacing: -0.64px;
}
.header-list .active{
    opacity: 0.7;
}
.header-list div img{
    width: 46px;
    margin-right: 10px;
    vertical-align: middle;
}
.header-list div:nth-of-type(2){
    width: 199px;
    height: 72px;
    background: #69d2d5;
    border-radius: 16px 16px 0px 0px;
}
.header-list div:nth-of-type(3){
    width: 259px;
    height: 72px;
    background: #ffffff;
    border-radius: 16px 16px 0px 0px;
    font-size: 30px;
    font-family: PingFang, PingFang-SC-Bold;
    font-weight: normal;
    text-align: left;
    color: #333333;
    letter-spacing: -0.6px;
}
.header-list div:nth-of-type(3) img{
    margin-left: 10px;
}
.header-list div:nth-of-type(3) span{
    font-size: 24px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: normal;
    text-align: left;
    color: #fd9f17;
    line-height: 18px;
    letter-spacing: -0.48px;
}
</style>