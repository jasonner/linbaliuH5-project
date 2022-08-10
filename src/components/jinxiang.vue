<template>
    <div class="addDetail-Page">
        <div class="header-box">
            <div class="content-list">
                <div class="header-number">
                    <div class="number-text">
                        送检编号
                    </div>
                    <div class="detectcode-list">
                        <span>JX0{{month}}</span>
                        <input maxlength="10"  v-model="adduser.detectcode" @blur="checkCodeChange()" style="margin-left:2vw" type="text" placeholder-class="placeholder-input" placeholder="请输入送检编号后四位" />
                    </div>
                </div>
                <div class="content-name-date">
                    <div class="left"> 
                        填报人：{{userInfoList.nickname}}
                    </div>
                    <div class="right">
                        填表日期：{{yearDate}}
                    </div>
                </div>
            </div>

            <div class="content-list">
                <!-- 姓    名 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span class="user-name">姓    名</span>
                    </div>
                    <div class="right">
                        <input maxlength="15" v-model="adduser.username"  placeholder-class="placeholder-input" type="text" placeholder="请输入患者姓名"/>
                    </div>
                </div>
                
                <!-- 性    别 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span class="user-name">性    别</span>
                    </div>
                    <div class="right">
                            <van-radio-group class="content-user-sex" v-model="adduser.sex">
                            <van-radio name="1">男</van-radio>
                            <van-radio name="2">女</van-radio>
                        </van-radio-group>
                    </div>
                </div>   

                <!-- 年    龄 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span class="user-name">年    龄</span>
                    </div>
                    <div class="right">
                        <input maxlength="3" v-model="adduser.age" type="number" placeholder-class="placeholder-input" placeholder="请输入患者年龄"/>
                    </div>
                </div>

                <!-- 临床诊断 -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>临床诊断</span>
                    </div>
                    <div class="right">
                        <div class="section">
                            <input style="width:50vw;margin-left:-5vw" disabled="true" v-model="adduser.zhenduan" placeholder="DLBCL"  type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                        
                    </div>
                </div>

                <!-- 送检单位 -->
                <div class="content-info-user-name">
                    <div class="left number-span">
                        <span>送检医院</span>
                    </div>
                    <div class="right">
                        <div class="section">
                            <input class="select-input" @change="searchCompany(adduser.unit)" v-model="adduser.unit"  placeholder-class="placeholder-input"  placeholder="模糊查找单位"  type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>

                <!-- 送检日期 -->
                <div class="content-info-user-name">
                    <div class="left number-text">
                        <span>送检日期</span>
                    </div>
                    <div class="right" @click="SubmissionDateChange()">
                        <div class="section">
                            <input disabled="true" v-model="adduser.submissiondate" placeholder="请选择送检日期" class="select-input" type="text"/>
                            <img class="rili" src="@/assets/img/addDetail/icon-rili.png"/>
                        </div>
                    </div>
                </div>
                
                <!-- 切片部位 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span >切片部位</span>
                    </div>
                    <div class="right">
                        <input maxlength="15" v-model="adduser.slice_parts"  placeholder-class="placeholder-input" type="text" placeholder="请输入切片部位"/>
                    </div>
                </div>
                
                <!--切片张数 -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>切片张数</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="slice_countChange()">
                            <input disabled="true"  v-model="adduser.slice_count" placeholder="请选择切片张数（10-15张）" style="width:50vw;margin-left:-5vw" class="select-input" type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>

                 <!--取样阶段 -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>取样阶段</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="quyangjieduanChange()">
                            <input disabled="true"  v-model="adduser.quyangjieduan" placeholder="请选择取样阶段" style="width:50vw;margin-left:-5vw" class="select-input" type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>
                <div class="content-info-user-name" style="grid-template-columns: 80% 20%;padding: 0;" v-show="adduser.quyangjieduan=='其他_'">
                    <div class="left number-span">
                        <span>其他</span> <span style="color:#999999;margin-left: 10px;">（请在下方输入）</span>
                    </div>
                    <div class="right">
                        
                    </div>
                </div>
                <div class="treatment-plan" v-show="adduser.quyangjieduan=='其他_'">
                    <textarea value=""  required="required" v-model="adduser.quyangjieduanqita" placeholder-class="input-placeholder" placeholder="请输入取样阶段" name="" id="" cols="49" rows="10"></textarea>
                </div>
                <!--免疫组化结果  -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span>免疫组化结果</span>
                    </div>
                    <div class="right">
                        <div class="section">
                            <span class="sheet-limit">可上传1-5张</span>
                            <button  class="upLoad" @click="imgUploadChange('A')">+上传</button>  
                            <input
                                type="file"
                                accept="image/*"
                                style="display:none"
                                @change="changeImg('A')"
                                name="upload_file"
                                ref="inputA"
                            />
                        </div>
                    </div>
                </div>
                
                <!-- 图片展示 -->
                <div class="img-show-box">
                    <div class="content">
                        <div v-for="(item,index) in showImgList" :key="index">
                            <img :src="item.imgSrc" alt="" srcset="">
                            <span @click="closeImgChange(item)">X</span>
                        </div>
                    </div>
                    
                </div>
            </div>

            <!-- 送检前治疗方案 -->
            <div class="content-list">
                <div class="content-info-user-name" style="grid-template-columns: 80% 20%;padding: 0;">
                    <div class="left number-span">
                        <span>送检前治疗方案</span> <span style="color:#999999;margin-left: 10px;">(选填)</span>
                    </div>
                    <div class="right">
                        
                    </div>
                </div>
                <div class="treatment-plan">
                    <textarea value=""  required="required" v-model="adduser.songjianqianzhiliaofangan" placeholder-class="input-placeholder" placeholder="请输入送检前的治疗方案" name="" id="" cols="49" rows="10"></textarea>
                </div>
                
                <!-- 报告接收邮箱 -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>报告接收邮箱</span>
                    </div>
                    <div class="right">
                        <input  placeholder="请输入接收邮件的邮箱" v-model="adduser.receiveemail" style="width:50vw;margin-left:-5vw" class="select-input" type="text" />
                    </div>
                </div>

                <!--知情同意书  -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span>知情同意书</span>
                    </div>
                    <div class="right">
                        <div class="section">
                            <img class="agree_img" v-show="adduser.agree_img !='' && adduser.agree_img" :src="adduser.agree_img" alt="" srcset="">
                            <button style="margin-left:36vw" class="upLoad" @click="imgUploadChange('B')">+上传</button>  
                            <input
                                type="file"
                                accept="image/*"
                                style="display:none"
                                @change="changeImg('B')"
                                name="upload_file"
                                ref="inputB"
                            />
                        </div>
                    </div>
                </div>
            
                <!-- 物流公司 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span>物流公司</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="emsChange()">
                            <div class="picker">
                                <input class="select-input" v-model="adduser.ems" disabled="true" type="text" />
                                <img src="@/assets/img/addDetail/select.png"/>
                            </div>
                        </div>
                    </div>
                </div>

                <!--物流单号 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span>物流单号</span>
                    </div>
                    <div class="right">
                        <input class="select-input"  v-model="adduser.ems_code" type="text"  placeholder-class="placeholder-input" placeholder="请输入物流单号" />
                    </div>
                </div>

                <!-- 寄件日期 -->
                <div class="content-info-user-name">
                    <div class="left number-text">
                        <span>寄件日期</span>
                    </div>
                    <div class="right" @click="MailChange()">
                        <div class="section">
                            <input disabled="true" v-model="adduser.ems_date" placeholder="请选择寄件日期" class="select-input" type="text"/>
                            <img class="rili" src="@/assets/img/addDetail/icon-rili.png"/>
                        </div>
                    </div>
                </div>

                <!-- 样本返回 -->
                <div class="content-info-user-name">
                    <div class="left number-text">
                        <span>样本返回</span>
                    </div>
                    <div class="right" >
                        <div class="section" >
                            <van-switch active-color="#2FC0C5" inactive-color="#fff" size="28px"  style="margin-left:38vw" @change="needChange()" v-model="adduser.sample_need_return" />
                        </div>
                    </div>
                </div>
                   
                  <!-- 收件人 -->
                <div class="content-info-user-name"  v-if="adduser.sample_need_return">
                    <div class="left number-text">
                        <span>收件人</span>
                    </div>
                    <div class="right">
                        <div class="section">
                            <input  v-model="adduser.sample_return_name" placeholder="请输入收件人姓名" class="select-input" type="text"/>
                        </div>
                    </div>
                </div>
                
                
                <!-- 收件地址 -->
                <div class="content-info-user-name" v-if="adduser.sample_need_return">
                    <div class="left number-text">
                        <span>收件地址</span>
                    </div>
                    <div class="right">
                        <div class="section">
                            <input  v-model="adduser.sample_return_addressee" placeholder="请输入收件地址" class="select-input" type="text"/>
                        </div>
                    </div>
                </div>

                <!-- 联系方式 -->
                <div class="content-info-user-name"  v-if="adduser.sample_need_return">
                    <div class="left number-text">
                        <span>联系方式</span>
                    </div>
                    <div class="right">
                        <div class="section">
                            <input v-model="adduser.sample_return_phone" placeholder="请输入联系方式" class="select-input" type="text"/>
                        </div>
                    </div>
                </div>
            </div>

            <!-- submit -->
            <div class="submit-content">
                <div class="left">
                    <button @click="addSubmit()"  :disabled='isDisabled'>提交</button>
                </div>
                <div class="right">
                    <button  @click="saveSubmit()"  :disabled='isDisabled'>保存草稿</button>
                </div>
            </div>
          
        </div>
        <loading v-show="loadingShow"></loading>
        <vanPickerSelect  ref="PickerSelect" @onPickerConfirm="onPickerConfirm"  @func="getMsgFormSon"></vanPickerSelect>
        <vanDatePickerSelect ref="datePickerSelect" @onDatePickerConfirm="onDatePickerConfirm"  @DateFunc="getDateMsgFormSon"></vanDatePickerSelect>
    </div>
</template>
<script>
import vanPickerSelect from '@/components/van-picker-select'
import vanDatePickerSelect from '@/components/van-date-picker-select'
import loading from '@/components/loading'
import OSS from 'ali-oss';
import Vue from 'vue'
import { Dialog } from 'vant';
import { Switch } from 'vant';
import wx from "weixin-js-sdk";
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Switch);
Vue.use(Dialog);

export default {
    name:'',
    data(){
        return{
            userInfoList:{
                nickname:''
            },
            logisticsCompanySelect:['顺丰快递','京东快递'],
            hospitalSelect:[],
            slice_countSelect:['10','11','12','13','14','15'],
            quyangjieduanSelect:['初诊','治疗后','复发','移植后','其他_'],
            datePickerIndex:null,
            adduser:{
                detectcode:'',//送检编码
                username:'',//填表人
                sex:'1',//性别
                age:'',//年龄
                zhenduan:'DLBCL',//临床诊断
                unit:'',//送检医院
                submissiondate:'',//送检日期
                slice_parts:'',//切片部位
                slice_count:'',//切片张数
                quyangjieduan:'初诊',
                quyangjieduanqita:'',
                mianyizuhuajiegou:'',//免疫组化结果
                songjianqianzhiliaofangan:'',//送检前治疗方案
                receiveemail:'',//报告接收邮箱
                ems:'顺丰快递',//物流公司
                ems_code:'',//物流单号
                ems_date:'',//寄件日期
                agree_img:'',//知情同意书
                status:'',//状态 0：草稿 1：提交
                sample_need_return:true,//样本返回
                sample_return_name:'',//收件人
                sample_return_addressee:'',//收件地址
                sample_return_phone:''//收件人联系方式
            },
            id:null,
            organization:null,
            checkDetectcode:true,
            yearDate:null,
            openid:'',
            fileurlA:'',
            client:null,
            isDisabled:false,
            isUpdata:false,
            loadingShow:false,
            showImgList:[],
            ruiangClick:false,
            selectIndex:'1',
            month:'',
           
        }
    },
    components:{
      'vanPickerSelect':vanPickerSelect,
      'vanDatePickerSelect':vanDatePickerSelect,
      'loading':loading
    },
    mounted(){
        var query=this.$route.query;
        if(query.id){
            this.id = query.id;
            this.organization = query.organization;
            this.GetDeceteInfoById(query.id);
        }else{
            this.id = null;
            this.organization = null;
            this.getjinxiangCode();
        };
        if(query.openid){
            this.openid = query.openid;
            this.getuserInfoChange();
        };
        
        const date=new Date;
        const month=date.getMonth()+1;
        this.month =(month<10 ? "0"+month:month); 
        this.yearDate=this.timeStrChange(new Date().getTime());
    },
    methods:{
        //获取金象送检编号
        getjinxiangCode(){
            let that = this;
            that.axios.get('/api/NHL/GetJinXiangDetectCode').then(function (res){
                console.log(res.data);
                if(res.data.data.code && res.data.data.code !=''){
                    //that.adduser.detectcode = res.data.data.code;
                }
            })
        },
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
                        if(that.isUpdata){
                            return
                        }else{
                            that.userInfoList = res.data.data;
                            if(res.data.data.email){
                                that.adduser.receiveemail=res.data.data.email; //报告接收邮箱  
                            }
                        }
                        console.log(that.userInfoList)
                    }
                }
            })
        },
        
        //根据ID查询单条消息
        GetDeceteInfoById(id){
            let that = this;
            //TODO
            that.axios.get('/api/NHL/GetInfoDetailsByIdV3',{
            params: {
                id:id,
                organization:'1'
            }
            }).then(function (res) {
                console.log(res.data);
                if(res.data.s){
                    console.log(111)
                    if(res.data.data && res.data.data !=''){
                        console.log(res.data.data)
                        if(res.data.data.username.sex == "男"){
                            that.adduser.sex = '1'
                        }else if(res.data.data.username.sex == "女"){
                            that.adduser.sex = '2'
                        }
                        that.isUpdata = true;
                        that.adduser.detectcode=res.data.data.detectcode;
                        that.adduser.username=res.data.data.patient;
                        that.userInfoList.nickname = res.data.data.username;
                        that.adduser.age=res.data.data.age;
                        that.adduser.zhenduan=res.data.data.zhenduan;
                        that.adduser.unit=res.data.data.unit;
                        that.adduser.submissiondate = res.data.data.submissiondate.replace("00:00:00","");//送检日期
                        that.adduser.slice_parts = res.data.data.slice_parts;//切片部位
                        that.adduser.slice_count = res.data.data.slice_count;//切片张数
                        that.showImgList = JSON.parse(res.data.data.mianyizuhuajiegou);//切片张数
                        that.adduser.songjianqianzhiliaofangan = res.data.data.songjianqianzhiliaofangan;//送检前的治疗方案
                        if(res.data.data.receiveemail){
                            that.adduser.receiveemail=res.data.data.receiveemail; //报告接收邮箱  
                        }
                        that.adduser.agree_img = res.data.data.agree_img;//知情同意书
                        that.adduser.ems_date=res.data.data.ems_date.replace("00:00:00","");//寄件日期
                        that.adduser.ems_code=res.data.data.ems_code;//物流单号
                        that.adduser.ems = res.data.data.ems//物流公司
                        that.adduser.sample_need_return = res.data.data.sample_need_return;//样本返回
                        that.adduser.sample_return_name= res.data.data.sample_return_name;//收件人
                        that.adduser.sample_return_addressee=res.data.data.sample_return_addressee;//收件地址
                        that.adduser.sample_return_phone=res.data.data.sample_return_phone;//收件人联系方式
                        console.log( that.adduser);
                    }else{
                        that.isUpdata =false;
                    }
                }
            })
        },

        //检查送检编码是否有效
        checkCodeChange(){
            let that = this;
            that.axios.get('/api/NHL/CheckCode',{
            params: {
                code:'JX0'+that.month+that.adduser.detectcode,
                type:'1'//0：睿昂（G-02,B+）；1:金橡（B+），2:天晴
            }
            }).then(function (res) {
                console.log(res.data);
                if(res.data.s){
                   that.checkDetectcode = true;
                }else{
                    that.checkDetectcode = false;
                    Dialog.alert({
                        title: '提示',
                            message: res.data.msg,
                        }).then(() => {
                        // on close
                    });
                }
            })
        },

        //模糊查找送检单位
        searchCompany(val){
            console.log(val)
            this.initSearch(val);
        },

        //初始化查询单位
        initSearch(hospitalVal){
            let that = this;
            that.axios.get('/api/NHL/GetUnit',{
            params: {
                hospital:hospitalVal,
            }
            }).then(function (res) {
                console.log(res.data);
                if(res.data.s){
                    that.hospitalSelect = [];
                    if(res.data.data && res.data.data !=''){
                        res.data.data.forEach(element => {
                            that.hospitalSelect.push(element.hospital);
                        });
                        that.$refs.PickerSelect.onPickerConfirm(that.hospitalSelect);
                        that.selectIndex = '9'
                    }else{
                        that.hospitalSelect = [];
                    }
                }
            })
        },

        //切片张数选择
        slice_countChange(){
           this.$refs.PickerSelect.onPickerConfirm(this.slice_countSelect);
           this.selectIndex = '3' 
        },

        //取样阶段
        quyangjieduanChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.quyangjieduanSelect);
            this.selectIndex = '4' 
        },

        //删除图片
        closeImgChange(tem){
            console.log(tem)
            this.showImgList.splice(this.showImgList.findIndex(item => item.imgSrc === tem.imgSrc), 1)
        },

        //物流公司选择
        emsChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.logisticsCompanySelect);
            this.selectIndex = '2'
        },

        //传值
        onPickerConfirm(res){
            tihs.$emit(res);
        },

        //取值
        getMsgFormSon(data){
            console.log(data);
            let that  = this;
            console.log(that.selectIndex);
            switch (that.selectIndex) {
                case '2':
                    that.adduser.ems = data;
                    break;
                case '3':
                    that.adduser.slice_count = data;
                    break;
                case '4':
                    that.adduser.quyangjieduan = data;
                    break;
                case '9':
                    that.adduser.unit = data;
                    break;      
                default:
                    break;
            }

        },
        
        //送检日期选择
        SubmissionDateChange(){
            this.$refs.datePickerSelect.onDatePickerConfirm();
            this.datePickerIndex = '1';
        },

        //寄件日期选择
        MailChange(){
            this.$refs.datePickerSelect.onDatePickerConfirm();
            this.datePickerIndex = '2';
        },

        //日期选择传值
        onDatePickerConfirm(){
          tihs.$emit();
        },

        //日期选择取值
        getDateMsgFormSon(data){
          console.log(data);
          switch (this.datePickerIndex) {
            case '1':
                  this.adduser.submissiondate  = data;   
                break;
            case '2':
                  this.adduser.ems_date  = data;   
                break;
            default:
                break;
          }
         
        },
        
        //上传知情同意书
        imgUploadChange(type){
            console.log(type)
            if(type == 'A'){
                this.$refs.inputA.dispatchEvent(new MouseEvent('click'));
            }else if(type == 'B'){
                this.$refs.inputB.dispatchEvent(new MouseEvent('click'));
            }
        },

        //上传图片
        changeImg (type) {
            if(type =='A'){
                var files = this.$refs.inputA.files;
                this.Upload(files[0],type);
            }else{
                var files = this.$refs.inputB.files;
                this.Upload(files[0],type);
            }
           
        },

        //自定义上传方法..
        Upload(file,type) {
            this.loadingShow = true;
            var name = 'linbaliu'
            let fileName = name+'/'+file.lastModified + file.name;
            const _this = this;
            _this.axios.get('https://commapi.forhoo.cn/forhoo/GetOSSSTS?dir=linbaliu').then((result) => {
                _this.client =  new OSS({
                    region: result.data.region,
                    accessKeyId: result.data.data.accessKeyId,
                    accessKeySecret: result.data.data.accessKeySecret,
                    stsToken: result.data.data.securityToken,
                    bucket: result.data.bucketName
                });
                this.getBase64(file).then(resBase64 => {
                    const base64 = resBase64.split(",").pop();
                    const fileType = resBase64.split(";").shift().split(":").pop();
                    // base64转blob
                    const blob = _this.dataURLtoBlob(base64, fileType);
                    // blob转arrayBuffer
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(blob);
                    reader.onload = event => {
                        //arrayBuffer转Buffer
                        const buffer = OSS.Buffer(event.target.result);
                        // 上传
                        _this.client.put(fileName, buffer)
                        .then( result=> {
                            console.log(result);
                            let httpUrl = 'https://merckoss.wfbweb.com/';
                            if(type == 'A'){
                              const obj = {
                                imgSrc:httpUrl+fileName
                              }
                              _this.showImgList.push(obj);
                              console.log(_this.showImgList)
                            }else{
                                _this.adduser.agree_img =  httpUrl+fileName;
                            }
                            _this.loadingShow = false;
                        })
                        .catch( err=> {
                            console.log("错误", err);
                        });
                    };
                })
            })
        },

        //file文件转base64
        getBase64(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                let fileResult = "";
                reader.readAsDataURL(file);
        　　　　//开始转
                reader.onload = function() {
                    fileResult = reader.result;
                };
        　　　　//转 失败
                reader.onerror = function(error) {
                reject(error);
                };
        　　　　　//转 结束 
                reader.onloadend = function() {
                resolve(fileResult);
                };
            });
        },
        
        //base64转blob
        dataURLtoBlob(urlData, fileType) {
            let bytes = window.atob(urlData);
            let n = bytes.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bytes.charCodeAt(n);
            }
            return new Blob([u8arr], {
                type: fileType
            });
        },

        //提交
        addSubmit(){
            console.log(111)
            if(!this.checkDetectcode){
                Dialog.alert({
                    title: '提示',
                    message: '送检编号无效，请您重新输入',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.detectcode ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入送检编号',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.username ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入患者姓名',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.age ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入年龄',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.zhenduan ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入临床诊断',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.unit ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请搜索选择送检医院',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.submissiondate ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请选择送检日期',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.slice_parts ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入切片部位',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.slice_count ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请选择切片张数',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.quyangjieduan =='其他_' && this.adduser.quyangjieduanqita ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入取样阶段',
                    }).then(() => {
                    // on close

                });
            }else if(this.showImgList.length<1){
                Dialog.alert({
                    title: '提示',
                    message: '请上传免疫组化结果图片',
                    }).then(() => {
                    // on close

                });
            }else if(this.showImgList.length>5){
                Dialog.alert({
                    title: '提示',
                    message: '请上传免疫组化结果图片最多可上传5张',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.receiveemail ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入接收邮件的邮箱',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.agree_img == ''){
                Dialog.alert({
                    title: '提示',
                    message: '请上传知情同意书',
                    }).then(() => {
                    // on close
                });
            }else if(this.adduser.ems_code == ''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入物流单号',
                    }).then(() => {
                    // on close
                });
            }else if(this.adduser.ems_date == ''){
                Dialog.alert({
                    title: '提示',
                    message: '请选择寄件日期',
                    }).then(() => {
                    // on close
                });
            }else if(this.adduser.sample_need_return){
                if(this.adduser.sample_return_name ==''){
                    Dialog.alert({
                        title: '提示',
                        message: '请输入收件人姓名',
                    }).then(() => {
                    // on close
                    });
                }else if(this.adduser.sample_return_addressee ==''){
                    Dialog.alert({
                        title: '提示',
                        message: '请输入收件地址',
                    }).then(() => {
                    // on close
                    });
                }else if(this.adduser.sample_return_phone ==''){
                    Dialog.alert({
                        title: '提示',
                        message: '请输入联系人方式',
                    }).then(() => {
                    // on close
                    });
                }else{
                    this.addSubmitChange();
                }
            }else{
                this.addSubmitChange();
            }
        },

        //确认提交
        addSubmitChange(){
            let that = this;
            that.loadingShow = true;
            if(that.id){
                that.editAddSubmit();
            }else{
                if(that.adduser.sex == '1'){
                    var sex = '男'
                }else{
                    var sex = '女'
                }
                let promise = { 
                    'openid':that.openid,//openid
                    'username':that.userInfoList.nickname,//填报人
                    'detectcode':'JX0'+that.month+that.adduser.detectcode,//送检编号
                    'patient':that.adduser.username,//患者
                    'sex':sex,//性别
                    'age':that.adduser.age*1,//年龄
                    'zhenduan':that.adduser.zhenduan,//临床诊断
                    'unit':that.adduser.unit,//送检单位
                    'submissiondate':that.adduser.submissiondate,//送检日期
                    'slice_parts':that.adduser.slice_parts,//切片部位
                    'slice_count':that.adduser.slice_count,//切片张数
                    'quyangjieduan':that.adduser.quyangjieduan,//取样阶段
                    'quyangjieduanqita':that.adduser.quyangjieduanqita,
                    'mianyizuhuajiegou':JSON.stringify(that.showImgList),//免疫组化结果
                    'songjianqianzhiliaofangan':that.adduser.songjianqianzhiliaofangan,//送检前治疗方案
                    'receiveemail':that.adduser.receiveemail,//报告接收邮箱
                    'ems':that.adduser.ems,//物流公司
                    'ems_code':that.adduser.ems_code,//物流单号
                    'ems_date':that.adduser.ems_date,//寄件日期
                    'agree_img':that.adduser.agree_img,//知情同意书
                    'status':'1',//状态 0：草稿 1：提交
                    'sample_need_return':that.adduser.sample_need_return,//样本返回
                    'sample_return_name':that.adduser.sample_return_name,//收件人
                    'sample_return_addressee':that.adduser.sample_return_addressee,//收件地址
                    'sample_return_phone':that.adduser.sample_return_phone//收件人联系方式
                };
                that.axios.post('/api/NHL/JinXiangInfo', promise)
                .then(function (res) {
                    console.log(res);
                    if(res.status && res.status == 200){
                         if(res.data.s){
                            that.loadingShow = false;
                            Dialog.alert({
                                title: '提示',
                                message: '提交成功',
                                }).then(() => {
                                wx.miniProgram.switchTab({
                            　　　　url: '/pages/branchIndex/index',
                            　　});
                            });
                        }else{
                            that.loadingShow = false;
                            Dialog.alert({
                                title: '提示',
                                    message: res.data.msg,
                                }).then(() => {
                                // on close
                            });
                        }
                    }else{
                        Dialog.alert({
                            title: '提示',
                                message: '服务异常，请稍后重试！',
                            }).then(() => {
                            // on close
                        });
                    }
                   
                });
            }
            
        },

        //修改提交
        editAddSubmit(){
            let that = this;
            that.loadingShow = true;
            if(that.adduser.age ==''){
                that.adduser.age = 0;
            }
            if(that.adduser.sex == '1'){
                var sex = '男'
            }else{
                var sex = '女'
            }
            let promise = { 
                'id':that.id,//openid
                'openid':that.openid,//openid,
                'username':that.userInfoList.nickname,//填报人
                'detectcode':'JX0'+that.month+that.adduser.detectcode,//送检编号
                'patient':that.adduser.username,//患者
                'sex':sex,//性别
                'age':that.adduser.age*1,//年龄
                'zhenduan':that.adduser.zhenduan,//临床诊断
                'unit':that.adduser.unit,//送检单位
                'submissiondate':that.adduser.submissiondate,//送检日期
                'slice_parts':that.adduser.slice_parts,//切片部位
                'slice_count':that.adduser.slice_count,//切片张数
                'quyangjieduan':that.adduser.quyangjieduan,//取样阶段
                'quyangjieduanqita':that.adduser.quyangjieduanqita,
                'mianyizuhuajiegou':JSON.stringify(that.showImgList),//免疫组化结果
                'songjianqianzhiliaofangan':that.adduser.songjianqianzhiliaofangan,//送检前治疗方案
                'receiveemail':that.adduser.receiveemail,//报告接收邮箱
                'ems':that.adduser.ems,//物流公司
                'ems_code':that.adduser.ems_code,//物流单号
                'ems_date':that.adduser.ems_date,//寄件日期
                'agree_img':that.adduser.agree_img,//知情同意书
                'status':'1',//状态 0：草稿 1：提交
                'sample_need_return':that.adduser.sample_need_return,//样本返回
                'sample_return_name':that.adduser.sample_return_name,//收件人
                'sample_return_addressee':that.adduser.sample_return_addressee,//收件地址
                'sample_return_phone':that.adduser.sample_return_phone//收件人联系方式
            };
            that.isDisabled = true;
            setTimeout(() => {
                that.isDisabled = false;
            },5000);
            that.axios.post('/api/NHL/JinXiangInfo', promise)
            .then(function (res) {
                console.log(res);
                if(res.status && res.status ==200){
                    if(res.data.s){
                        that.loadingShow = false;
                        Dialog.alert({
                            title: '提示',
                                message: '提交成功',
                            }).then(() => {
                            // on close
                            wx.miniProgram.switchTab({
                        　　　　url: '/pages/branchIndex/index',
                        　　});
                        });
                    }else{
                        that.loadingShow = false;
                        Dialog.alert({
                            title: '提示',
                            message: res.data.msg,
                            }).then(() => {
                            console.log(111)
                        });
                    }
                }else{
                    Dialog.alert({
                        title: '提示',
                        message: '服务异常，请稍后重试！',
                        }).then(() => {
                        console.log(111)
                    });
                }
                
            });
        },

        //保存到草稿箱
        saveSubmit(){
            let that = this;
            if(this.adduser.age ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入年龄',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.ems_code == ''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入物流单号',
                    }).then(() => {
                    // on close
                });
            }else if(this.adduser.ems_date == ''){
                Dialog.alert({
                    title: '提示',
                    message: '请选择寄件日期',
                    }).then(() => {
                    // on close
                });
            }else{
                that.loadingShow = true;
                if(that.id){
                    that.editSaveSubmit();
                }else{
                    if(that.adduser.age ==''){
                        that.adduser.age = 0;
                    }
                    if(that.adduser.sex == '1'){
                        var sex = '男'
                    }else{
                        var sex = '女'
                    };
                    let promise = { 
                        'openid':that.openid,//openid,
                        'username':that.userInfoList.nickname,//填报人
                        'detectcode':'JX0'+that.month+that.adduser.detectcode,//送检编号
                        'patient':that.adduser.username,//患者
                        'sex':sex,//性别
                        'age':that.adduser.age*1,//年龄
                        'zhenduan':that.adduser.zhenduan,//临床诊断
                        'unit':that.adduser.unit,//送检单位
                        'submissiondate':that.adduser.submissiondate,//送检日期
                        'slice_parts':that.adduser.slice_parts,//切片部位
                        'slice_count':that.adduser.slice_count,//切片张数
                        'quyangjieduan':that.adduser.quyangjieduan,//取样阶段
                        'quyangjieduanqita':that.adduser.quyangjieduanqita,
                        'mianyizuhuajiegou':JSON.stringify(that.showImgList),//免疫组化结果
                        'songjianqianzhiliaofangan':that.adduser.songjianqianzhiliaofangan,//送检前治疗方案
                        'receiveemail':that.adduser.receiveemail,//报告接收邮箱
                        'ems':that.adduser.ems,//物流公司
                        'ems_code':that.adduser.ems_code,//物流单号
                        'ems_date':that.adduser.ems_date,//寄件日期
                        'agree_img':that.adduser.agree_img,//知情同意书
                        'status':'0',//状态 0：草稿 1：提交
                        'sample_need_return':that.adduser.sample_need_return,//样本返回
                        'sample_return_name':that.adduser.sample_return_name,//收件人
                        'sample_return_addressee':that.adduser.sample_return_addressee,//收件地址
                        'sample_return_phone':that.adduser.sample_return_phone//收件人联系方式
                    };
                    that.isDisabled = true;
                    setTimeout(() => {
                        that.isDisabled = false;
                    }, 5000);
                    that.axios.post('/api/NHL/JinXiangInfo', promise)
                    .then(function (res) {
                        console.log(res);
                        if(res.status && res.status == 200){
                            if(res.data.s){
                                that.loadingShow = false;
                                Dialog.alert({
                                    title: '提示',
                                    message: '保存成功',
                                    }).then(() => {
                                    console.log(111);
                                    wx.miniProgram.switchTab({
                                　　　　url: '/pages/branchIndex/index',
                                　　});
                                });
                            }else{
                                that.loadingShow = false;
                                Dialog.alert({
                                    title: '提示',
                                        message: res.data.msg,
                                    }).then(() => {
                                    // on close
                                });
                            }
                        }else{
                            Dialog.alert({
                                title: '提示',
                                    message: '服务异常，请稍后重试！',
                                }).then(() => {
                                // on close
                            });
                        }
                        
                    });
                }

            }
           
        },

        //修改保存到草稿箱
        editSaveSubmit(){
            let that = this;
            if(that.adduser.age ==''){
                that.adduser.age = 0;
            }
            if(that.adduser.sex == '1'){
                var sex = '男'
            }else{
                var sex = '女'
            }
            let promise = { 
                'id':that.id,//openid
                'openid':that.openid,//openid,
                'username':that.userInfoList.nickname,//填报人
                'detectcode':'JX0'+that.month+that.adduser.detectcode,//送检编号
                'patient':that.adduser.username,//患者
                'sex':sex,//性别
                'age':that.adduser.age*1,//年龄
                'zhenduan':that.adduser.zhenduan,//临床诊断
                'unit':that.adduser.unit,//送检单位
                'submissiondate':that.adduser.submissiondate,//送检日期
                'slice_parts':that.adduser.slice_parts,//切片部位
                'slice_count':that.adduser.slice_count,//切片张数
                'quyangjieduan':that.adduser.quyangjieduan,//取样阶段
                'quyangjieduanqita':that.adduser.quyangjieduanqita,
                'mianyizuhuajiegou':JSON.stringify(that.showImgList),//免疫组化结果
                'songjianqianzhiliaofangan':that.adduser.songjianqianzhiliaofangan,//送检前治疗方案
                'receiveemail':that.adduser.receiveemail,//报告接收邮箱
                'ems':that.adduser.ems,//物流公司
                'ems_code':that.adduser.ems_code,//物流单号
                'ems_date':that.adduser.ems_date,//寄件日期
                'agree_img':that.adduser.agree_img,//知情同意书
                'status':'0',//状态 0：草稿 1：提交
                'sample_need_return':that.adduser.sample_need_return,//样本返回
                'sample_return_name':that.adduser.sample_return_name,//收件人
                'sample_return_addressee':that.adduser.sample_return_addressee,//收件地址
                'sample_return_phone':that.adduser.sample_return_phone//收件人联系方式
            };
            that.isDisabled = true;
            setTimeout(() => {
                that.isDisabled = false;
            }, 5000);
            that.axios.post('/api/NHL/JinXiangInfo', promise)
            .then(function (res) {
                console.log(res);
                if(res.status && res.status == 200){
                    if(res.data.s){
                        that.loadingShow = false;
                        Dialog.alert({
                            title: '提示',
                            message: '保存成功',
                            }).then(() => {
                            wx.miniProgram.switchTab({
                        　　　　url: '/pages/branchIndex/index',
                        　　});
                        });
                    }else{
                        that.loadingShow = false;
                        Dialog.alert({
                            title: '提示',
                                message: res.data.msg,
                            }).then(() => {
                            // on close
                        });
                    }
                }else{
                    Dialog.alert({
                        title: '提示',
                            message: '服务异常，请稍后重试！',
                        }).then(() => {
                        // on close
                    });
                }
                
            });
        },

        //时间戳转日期
        timeStrChange(data){
            var date = new Date(data)
            var Y = date.getFullYear() + '-'
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
            return Y + M + D
        },

        //样本返回
        needChange(){
            console.log(this.adduser.sample_need_return);
        },
    }
}
</script>
<style scoped>
.content-list{
    width: 93.6%;
    background: #ffffff;
    border-radius: 10px;
    margin: 0 auto;
    margin-bottom: 25px;
    padding: 24px 0;
    box-sizing: border-box;
}
.addDetail-Page{
    width: 100%;
    height: 100%;
    background: #fbfafb;
    margin-top:-41.5vw;
}
.header-box{
    width: 100%;
    height: auto;
    position: relative;
}
.header-box img{
    width: 100%;
}
.header-box .tempFilePath-img{
    width: 200px;
    height: 68px;
    float: left;
}
.header-title{
    position: absolute;
    top: 100px;
    left: 23px;
    font-size: 36px;
    font-family: PingFang, PingFang-SC-Bold;
    font-weight: SC-Bold;
    text-align: left;
    color: #ffffff;
}
.header-title img{
    width: 18px;
    height: 30px;
    margin-right: 30px;
    z-index: 9;
}
.header-number{
    width: 702px;
    height: 90px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 10px 10px 0px 0px; 
    font-size: 32px;
    font-family: PingFang, PingFang-SC-Bold;
    text-align: left;
    color: #333333;
    letter-spacing: -0.64px;
    padding-left: 31px;
    padding-top: 15px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 35% 65%;
}
.header-number input{
    width: 400px;
    height: 66px;
    border: 0.1em solid #eeeeee;
    border-radius: 6px;
    font-size: 24px;
    color: #333;
    padding-left: 24px;
    margin-left: 60px;
    box-sizing: border-box;
}
.header-number .number-text{
    line-height:2;
    font-weight: 700;
    font-size: 28px;
}
.content-name-date{
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    background: #fff;
    margin-top:35px;
}
.content-name-date div{
    font-size: 26px;
    font-family: PingFang, PingFang-SC-Regular;
    font-weight: SC-Regular;
    text-align: left;
    padding-left: 30px;
    box-sizing: border-box;
    color: #666666;
    letter-spacing: -0.52px;
}

.content-info-user-name{
    width: 100%;
    background: #fff;
    display: grid;
    grid-template-columns: 35% 65%;
    padding-top: 25px;
    box-sizing: border-box;
}
.content-info-user-name .left{
    font-size: 28px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: SC-Medium;
    text-align: left;
    color: #333333;
    padding-left: 30px;
    box-sizing: border-box;
    line-height: 1;
}
.content-info-user-name .left span{
    font-size: 28px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: SC-Medium;
    color: #333333;
    margin-top: 20px;
    float: left;
}
.content-info-user-name .left .user-name,.content-user-sex .left .user-name{
    letter-spacing:27px
}
.content-info-user-name .right input{
    width: 380px;
    height: 66px;
    border: 0.1em solid #adadad;
    border-radius: 6px;
    font-size: 24px;
    color: #333;
    padding-left: 24px;
    outline-color: #2fc0c5;
    background: transparent;
}
.content-info-user-name .right  input[disabled]{
    background:transparent;
    opacity:1;
    color:black;
}
.content-user-sex{
    width: 100%;
    height: 66px;
    background: #fff;
    display: grid;
    grid-template-columns: 40% 60%;
    margin-left: 40px;
}
.content-user-sex .left{
    font-size: 28px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: SC-Medium;
    text-align: left;
    color: #333333;
    padding-left: 60px;
    box-sizing: border-box;
}
.content-user-sex .right{
    font-size: 28px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: SC-Medium;
    text-align: left;
    color: #333333;
    letter-spacing: -0.56px;
    padding-top: 3vw;
    box-sizing: border-box;
}
.content-user-sex .right .radio{
    width: 20px;
    height: 20px; 
    display: block;  
    float: left;
    margin-top: 25px;
    margin-right: 25px;
    border-radius: 100%;
    border: 5px solid #999999;
}
.content-user-sex .right .active{
    border: 5px solid #2FC0C5;
    background: #2FC0C5;
    position: relative;
}
.content-user-sex .right .active::after{
    content: '';
    width: 12px;
    height: 12px; 
    border:5px solid #fff;
    position: absolute;
    left: 1%;
    top: 1%;
    border-radius: 100%;
}
.content-info-user-name .right .upLoad{
    padding: 21px 28px;
    box-sizing: border-box;
    width: 140px;
    height: 66px;
    background: #2fc0c5;
    border: 1px solid #2fc0c5;
    border-radius: 6px;
    font-size: 26px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: 300;
    text-align:center;
    color: #ffffff;
    margin-left: 0vw;
    line-height: 1;
}
.content-info-user-name .right .section .rili{
  width: 4vw;
  height: 4vw;
  position: absolute;
  right:73px;
  top:20px;
}
.content-user-sex .right span:nth-of-type(2){
    margin-right: 105px;
}
.content-user-sex .right span{
    float: left;
}
.content-info-user-name .right{
    position: relative;
}
.content-info-user-name .right .section{
    position: relative;
}
.content-info-user-name .right .section img{
    width: 23px;
    height: 13px;
    position: absolute;
    right:73px;
    top:30px;
}

.content-info-user-name .right .section .agree_img{
    width: 20vw;
    height: 5vh;
    position: absolute;
    left: 5vw;
    top: 0;
}

/* submit */
.submit-content{
    width: 100%;
    padding-bottom: 140px;
    box-sizing: border-box;
    display: grid;
    padding-top: 98px;
    grid-template-columns: 50% 50%;
}
.submit-content .left button{
    width: 297px;
    height: 78px;
    line-height: 78px;
    padding: 0;
    margin: 0 auto;
    background: #2fc0c5;
    border-radius: 39px;  
    font-size: 30px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: SC-Medium;
    text-align: center;
    color: #ffffff;
    letter-spacing: -0.6px;
    border: none;
}
.submit-content .right button{
    width: 297px;
    height: 78px;
    padding: 0;
    line-height: 78px;
    border: 1px solid #2fc0c5;
    border-radius: 40px;
    font-size: 30px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: SC-Medium;
    text-align: center;
    color: #2fc0c5;
    letter-spacing: -0.6px;
    background: #fff;
}
.sheet-limit{
    font-size: 24px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: normal;
    text-align: left;
    color: #2fc0c5;
    letter-spacing: -0.48px;
    float: left;
    margin-top: 20px;
    margin-left: 18vw;
} 
.img-show-box{
    height:204px;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    overflow-X:scroll;
    z-index: 1;
}   
.img-show-box .content{
    width: 180%;
    background: #fff;
}
.img-show-box .content div{
    width: 204px;
    margin: 0 auto;
    height: 204px;
    border-radius: 6px;
    float: left;
    margin-left: 30px;
    position: relative;
}
.img-show-box .content div span{
    position: absolute;
    color: #fff;
    display: block;
    border-radius: 100%;
    top: 0vw;
    right: 0vw;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 30px;
    background: #ef586d;
}
.treatment-plan{
    margin-top: 22px;
} 
.treatment-plan textarea{
    width: 647px;
    height: 169px;
    border-radius: 6px;
    border-color: #EEEEEE;
    padding-top:20px;
    padding-left: 20px;
    box-sizing: border-box;
    border-radius: 6px;
    font-size:26px;
    font-family: PingFang, PingFang-SC-Regular;
    font-weight: normal;
    text-align: left;
    color: #333;
    letter-spacing: -0.52px;
}
.input-placeholder{
  padding-top: 5px;
  box-sizing: border-box;
  color: #999;
}
.detectcode-list{
    position: relative;
}
.detectcode-list span{
    position: absolute;
    top: 2.2vw;
    left: 4vw;
    font-size: 24px;
    color: #333;
}
.detectcode-list input{
    padding-left: 11vw;
}
</style>
<style>
.content-user-sex .van-radio__icon{
    font-size: 4vw;
    height: auto;
    line-height: 2;
}
.van-picker-select{
    width: 100%;
    height: 35vh;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
}
.van-picker-model{
    width:100vw;
    height: 100%;
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
.van-dialog{
    width: 70% !important;
}
.van-dialog__header{
    font-size: 4vw;
}
.van-dialog__message{
   line-height: 1.5 !important;
   font-size: 4vw !important;
   margin-top: 3vw;
}
.van-dialog__confirm, .van-dialog__confirm:active{
    color: #2FC0C5 !important;
    height: 6vh !important;
}
.van-dialog__footer{
    margin-top: 3vw;
}
.van-button__text{
     font-size: 4vw !important;
}
.van-radio__label{
    font-size: 28px;
}
</style>