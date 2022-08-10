<template>
    <div class="addDetail-Page">
        <div class="header-list">
            <div>送检机构选择 <sup>*</sup></div>
            <div>
                <img src="@/assets/img/jinxiang/ruiangActive-icon.png" alt="" srcset="">
                睿昂
            </div>
            <div @click="jingxiangChange()">
                <img src="@/assets/img/jinxiang/jinxiang-icon.png" alt="" srcset="">
                金橡
                <span>指定医院</span>
            </div>
        </div>
        <div class="header-box">
            <div class="header-number">
                <div class="number-text">
                    送检编号
                </div>
                <div>
                    <input maxlength="10" v-model="adduser.detectcode" @blur="checkCodeChange()" style="margin-left:2vw" type="text" placeholder-class="placeholder-input" placeholder="请输入送检编号" />
                </div>
            </div>
            <div class="content-box">
                <div class="content-name-date">
                    <div class="left"> 
                        填报人：{{userInfoList.nickname}}
                    </div>
                    <div class="right">
                        填表日期：{{yearDate}}
                    </div>
                </div>

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
                <div class="content-user-sex">
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

                <!-- 联系电话 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span>联系电话</span>
                    </div>
                    <div class="right">
                        <input maxlength="11" v-model="adduser.patientphone" type="tel" placeholder-class="placeholder-input" placeholder="请输入患者联系电话"/>
                    </div>
                </div>

                <!-- 送检医生  -->
                <div class="content-info-user-name">
                    <div class="left number-span">
                        <span>送检医生</span>
                    </div>
                    <div class="right  number-span">
                        <input   v-model="adduser.sendingDoctor"  placeholder-class="placeholder-input" maxlength="15" type="text" placeholder="请输入送检医生"/>
                    </div>
                </div>

                <!-- 送检单位 -->
                <div class="content-info-user-name">
                    <div class="left number-span">
                        <span>送检单位</span>
                    </div>
                    <div class="right">
                        <div class="section">
                            <input class="select-input" @change="searchCompany(adduser.sendingCompany)" v-model="adduser.sendingCompany"  placeholder-class="placeholder-input"  placeholder="模糊查找单位"  type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>

                <!-- 科  室 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span class="user-name">科  室</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="departmentChange()">
                                <div class="picker">
                                    <input class="select-input" v-model="adduser.department" disabled="true" type="text" />
                                    <img src="@/assets/img/addDetail/select.png"/>
                                </div>
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
                                <input class="select-input" v-model="adduser.ems" placeholder="请选择物流公司" disabled="true" type="text" />
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
                    <div class="right" >
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
                    <div class="right" >
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
                    <div class="right" >
                        <div class="section">
                            <input v-model="adduser.sample_return_phone" placeholder="请输入联系方式" class="select-input" type="text"/>
                        </div>
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
                            <button class="upLoad" @click="imgUploadChange()">+上传</button>  
                            <input
                                type="file"
                                accept="image/*"
                                style="display:none"
                                @change="changeImg()"
                                name="upload_file"
                                ref="inputA"
                            />
                        </div>
                    </div>
                </div>
                
                <!-- 临床/病理诊断 -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>临床/病理诊断</span>
                    </div>
                    <div class="right">
                        <input style="width:50vw;margin-left:-5vw"  v-model="adduser.clinical" placeholder="初治/DLBCL"  type="text" />
                    </div>
                </div>

                <!-- 原发部位 -->
                <div class="content-info-user-name">
                    <div class="left number-span">
                        <span>原发部位</span>
                    </div>
                    <div class="right  number-span">
                        <input  placeholder-class="placeholder-input" v-model="adduser.primarySite" type="text" placeholder="请输入原发部位"/>
                    </div>
                </div>

                <!-- 病  程 -->
                <div class="content-info-user-name">
                    <div class="left">
                        <span class="user-name">病  程</span>
                    </div>
                    <div class="right">
                        <input  placeholder-class="placeholder-input" v-model="adduser.courseDisease" maxlength="15" type="number" placeholder="请输入病程（天数：最大9999）"/>
                    </div>
                </div>
                
                <!--AnnArbor(分期) -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>AnnArbor(分期)</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="AnnArborChange()">
                            <input disabled="true"  v-model="adduser.AnnArbor" placeholder="请选择AnnArbor(分期)" style="width:50vw;margin-left:-5vw" class="select-input" type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>

                <!-- 疾病分期 -->
                <div class="content-info-user-name">
                    <div class="left number-span">
                        <span>疾病分期</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="DiseaseChange()">
                            <input disabled="true" v-model="adduser.diseaseStage" class="select-input" type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                    </div>
                    </div>
                </div>

                <!-- 结外浸润 -->
                <div class="content-info-user-name">
                    <div class="left number-span">
                        <span>结外浸润</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="extranodalInfiltration()">
                            <input disabled="true" v-model="adduser.extranodalInfiltration" class="select-input" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>
                
                <!-- ECOG(体能状态) -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>ECOG(体能状态)</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="ecogChange()">
                            <input disabled="true" placeholder-class="placeholder-input"  v-model="adduser.ECOG" style="width:50vw;margin-left:-5vw" type="text" placeholder="请选择ECOG"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>

                <!-- LDH(乳酸脱氢酶) -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>LDH(乳酸脱氢酶)</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="ldhChange()">
                            <input disabled="true" placeholder-class="placeholder-input"  v-model="adduser.LDH" style="width:50vw;margin-left:-5vw"   type="text" placeholder="请选择LDH"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>
                
                <!-- LDH(联子级) -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                    <div class="left">
                        <span>LDH表达(数值)</span>
                    </div>
                    <div class="right">
                        <input  placeholder="请输入数值" v-model="adduser.ldh_exp" style="width:50vw;margin-left:-5vw" class="select-input" type="number" />
                    </div>
                </div>

                <!-- MYC表达 -->
                <div class="content-info-user-name">
                    <div class="left number-span">
                        <span>MYC表达</span>
                    </div>
                    <div class="right" >
                        <div class="section"  @click="MycChange()">
                            <input  @click="MycChange()" disabled="true" v-model="adduser.MYC" class="select-input" type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>

                <!-- MYC表达(级联子) -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;" >
                    <div class="left">
                        <span>MYC表达(数值)</span>
                    </div>
                    <div class="right">
                        <input maxlength="4"  placeholder="请输入数值" v-model="adduser.MYCCascade" style="width:50vw;margin-left:-5vw" class="select-input" type="number" />
                    </div>
                </div>
                
                <!-- BCL2表达 -->
                <div class="content-info-user-name">
                    <div class="left number-span">
                        <span>BCL2表达</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="BCL2Change()">
                            <input disabled="true" v-model="adduser.BCL2" class="select-input" type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                        </div>
                    </div>
                </div>

                <!-- BCL2表达(级联子) -->
                <div class="content-info-user-name" style="grid-template-columns: 40% 60%;" >
                    <div class="left">
                        <span>BCL2表达(数值)</span>
                    </div>
                    <div class="right">
                        <input placeholder-class="placeholder-input" v-model="adduser.BCL2Cascade" style="width:50vw;margin-left:-5vw"  class="select-input" type="text" placeholder="请输入数值"/>
                    </div>
                </div>

                <!-- 送检样本类型 -->
                <div class="content-info-user-name" style="grid-template-columns: 35% 65%;">
                    <div class="left">
                        <span>送检样本类型</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="SampleChange()">
                            <input disabled="true" style="width:50vw;" v-model="adduser.sampleType" class="select-input" type="text" value=""/>
                            <img src="@/assets/img/addDetail/select.png"/>
                    </div>
                    </div>
                </div>
                
                <!-- 疾病亚型 -->
                <div class="content-info-user-name" style="grid-template-columns: 35% 65%;">
                    <div class="left">
                        <span>疾病亚型</span>
                    </div>
                    <div class="right">
                        <div class="section" @click="DiseaseSubtypeChange()">
                            <input disabled="true" style="width:50vw;" v-model="adduser.diseaseSubtype" class="select-input" type="text" value=""/>
                            <img src="@/assets/img/addDetail/select.png"/>
                    </div>
                    </div>
                </div>

                <!-- submit -->
                <div class="submit-content">
                    <!-- <div class="left">
                        <button @click="addSubmit()"  :disabled='isDisabled'>提交</button>
                    </div> -->
                    <div class="right">
                        <button  @click="saveSubmit()"  :disabled='isDisabled'>保存草稿</button>
                    </div>
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
import wx from "weixin-js-sdk";
Vue.use(Dialog);
export default {
    name:'',
    data(){
        return{
            DepartmentSelect:['血液科','淋巴瘤科','其他'],
            logisticsCompanySelect:['顺丰快递','京东快递'],
            AnnArborSelect:['I','II','III','IV'],
            DiseaseStageSelect:['I期 ','II期','III期','IV期'],
            InfiltrationSelect:['是','否'],
            ldhSelect:['+','-'],
            MycSelelct:['+','-'],
            Bcl2Select:['+','-'],
            SampleSelect:['石蜡组织','石蜡组织DNA','骨髓','新鲜组织','外周血'],
            ecogSelect:['0','1','2','3','4'],
            // DiseaseSubtypeSelect:['B-ALL(急性B淋巴细胞白血病)','T-ALL(急性T淋巴细胞白血病)','AML(急性髓细胞白血病)','APL(急性早幼粒白血病)','MDS(骨髓增生异常综合征)','MPN(骨髓增殖性肿瘤)','CML(慢性粒细胞白血病)','MDS/MPN(MDS伴MPN)','治疗相关AML(tAML)','家族易感髓系肿瘤','AA(再生障碍性贫血)','白血病 其他','白血病 诊断不明','易栓症','DLBCL(弥漫大B细胞淋巴瘤)','FL(滤泡淋巴瘤)','MCL(套细胞淋巴瘤)','CLL/SLL(慢性淋巴细胞白血病/小细胞淋巴瘤)','LPL/WM(淋巴浆细胞淋巴瘤/华氏巨球蛋白血症)','B细胞淋巴瘤 其他','B细胞淋巴瘤 诊断不明','AITL(血管免疫母细胞T细胞淋巴瘤)','ALCL(间变大细胞淋巴瘤)','PTCL-NOS(外周T细胞淋巴瘤非特指)','NK/T细胞淋巴瘤(NK/T-CL)','T细胞淋巴瘤 其他','T细胞淋巴瘤 诊断不明','多发性骨髓瘤(MM)','噬血细胞综合征'],
            DiseaseSubtypeSelect:['DLBCL(弥漫大B细胞淋巴瘤)'],
            hospitalSelect:[],
            userInfoList:{
                nickname:''
            },
            adduser:{
                detectcode:'',
                username:'',
                sex:'1',
                age:'',
                sendingDoctor:'',//送检医生
                sendingCompany:'',//送检单位
                department:'血液科',//科室
                clinical:'初治/DLBCL',//临床/病例诊断
                primarySite:'',//原发部位
                courseDisease:'',//病程
                AnnArbor:'',//AnnArbor(分期)
                diseaseStage:'I期',//疾病分期
                extranodalInfiltration:'是',//结外浸润
                ECOG:'',//ECOG(体能状态)
                LDH:'+',//LDH(乳酸脱氢酶)
                ldh_exp:'',//LDH表达(级联子)
                MYC:'+',//MYC表达
                MYCCascade:'',//MYC表达(级联子)
                BCL2:'+',//BCL2
                BCL2Cascade:'',//BCL2表达(级联子)
                sampleType:'石蜡组织',//送检样本类型
                agree_img:'',
                ems:'顺丰快递',//快递公司
                ems_code:'',//快递编号
                ems_date:'',//寄件日期
                patientphone:'',//患者手机号 
                diseaseSubtype:'DLBCL(弥漫大B细胞淋巴瘤)',//疾病亚型 
                sample_need_return:true,//样本返回
                sample_return_name:'',//收件人
                sample_return_addressee:'',//收件地址
                sample_return_phone:''//收件人联系方式
            },
            id:null,
            checkDetectcode:true,
            yearDate:null,
            selectIndex:'1',
            openid:'',
            fileurlA:'',
            client:null,
            isDisabled:false,
            isUpdata:false,
            loadingShow:false
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
            this.GetDeceteInfoById(query.id);
        }else{
            this.id = null;
        };
        if(query.openid){
            this.openid = query.openid;
            this.getuserInfoChange();
        };
        this.yearDate=this.timeStrChange(new Date().getTime());
    },
    methods:{
        jingxiangChange(){
            if(this.openid && this.id){
                this.$router.replace({ path: "/recordList",query: {openid:this.openid,id:this.id}});
            }else if(this.openid){
                this.$router.replace({ path: "/recordList",query: {openid:this.openid}});
            }
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
                    console.log(111)
                    if(res.data.data && res.data.data !=''){
                        if(that.isUpdata){
                            return
                        }else{
                            that.userInfoList = res.data.data;
                        }
                        console.log(that.userInfoList)
                    }
                }
            })
        },
        
        //根据ID查询单条消息
        GetDeceteInfoById(id){
            let that = this;
            that.axios.get('/api/NHL/GetInfoByDetectCode',{
                params: {
                    code:id,
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
                        if(res.data.data.detectcode){
                            that.adduser.detectcode=res.data.data.detectcode;//送检编号
                        }
                        that.adduser.username=res.data.data.patient;//患者姓名
                        that.userInfoList.nickname = res.data.data.username;//填报人
                        that.adduser.age=res.data.data.age;//患者年龄
                        that.adduser.sendingDoctor=res.data.data.doctor;//送检医生
                        that.adduser.sendingCompany=res.data.data.unit;//送检单位
                        that.adduser.department=res.data.data.keshi;//科室
                        that.adduser.clinical=res.data.data.zhenduan;//临床/病例诊断
                        that.adduser.primarySite=res.data.data.part;//原发部位
                        that.adduser.courseDisease=res.data.data.sick;//病程
                        that.adduser.AnnArbor=res.data.data.ann;//AnnArbor(分期)
                        that.adduser.diseaseStage=res.data.data.disease;//疾病分期
                        that.adduser.extranodalInfiltration=res.data.data.qinrun;//结外浸润
                        that.adduser.ECOG=res.data.data.ecog;//ECOG(体能状态)
                        that.adduser.LDH=res.data.data.ldh;//LDH(乳酸脱氢酶)
                        that.adduser.ldh_exp = res.data.data.ldh_exp;
                        that.adduser.MYC=res.data.data.myc;//MYC表达
                        that.adduser.MYCCascade=res.data.data.myc_exp;//MYC表达(级联子)
                        that.adduser.BCL2=res.data.data.bcl2;//BCL2
                        that.adduser.BCL2Cascade=res.data.data.bcl2_exp;//BCL2表达(级联子)
                        if(res.data.data.ldh == '阳性'){//LDH(乳酸脱氢酶)
                            that.adduser.LDH='+';
                        }else if(res.data.data.ldh == '阴性'){
                            that.adduser.LDH='-';
                        }else{
                            that.adduser.LDH=res.data.data.ldh;
                        };
                        that.adduser.ldh_exp = res.data.data.ldh_exp;//LDH表达(级联子)

                        if(res.data.data.myc == '阳性'){//MYC表达
                            that.adduser.MYC='+';
                        }else if(res.data.data.myc == '阴性'){
                            that.adduser.MYC='-';
                        }else{
                            that.adduser.MYC=res.data.data.myc;//MYC表达
                        };
                        that.adduser.MYCCascade=res.data.data.myc_exp;//MYC表达(级联子)

                        if(res.data.data.bcl2 == '阳性'){//BCL2
                            that.adduser.BCL2='+';
                        }else if(res.data.data.bcl2 == '阴性'){
                            that.adduser.BCL2='-';
                        }else{
                            that.adduser.BCL2=res.data.data.bcl2;//MYC表达
                        };
                        that.adduser.BCL2Cascade=res.data.data.bcl2_exp;//BCL2表达(级联子)

                        if(res.data.data.sample){
                            that.adduser.sampleType=res.data.data.sample;//送检样本类型
                        }
                        that.adduser.sample_need_return = res.data.data.sample_need_return;//样本返回
                        that.adduser.sample_return_name= res.data.data.sample_return_name;//收件人
                        that.adduser.sample_return_addressee=res.data.data.sample_return_addressee;//收件地址
                        that.adduser.sample_return_phone=res.data.data.sample_return_phone;//收件人联系方式
                        that.adduser.patientphone = res.data.data.patientphone//患者手机号
                        that.adduser.agree_img=res.data.data.agree_img;//知情同意书
                        if(res.data.data.ems){
                            that.adduser.ems=res.data.data.ems;//快递公司
                        }
                        that.adduser.ems_code=res.data.data.ems_code;//快递编号
                        if(res.data.data.ems_date){
                            that.adduser.ems_date=res.data.data.ems_date.replace("00:00:00","");//寄件日期
                        }
                        that.adduser.patientphone = res.data.data.patientphone //患者手机号
                        switch (res.data.data.diseaseSubtype) {//疾病亚型
                            case 'H1L01':
                                    that.adduser.diseaseSubtype = 'B-ALL(急性B淋巴细胞白血病)'
                                break;
                            case 'H1L02':
                                    that.adduser.diseaseSubtype = 'T-ALL(急性T淋巴细胞白血病)'
                                break;
                            case 'H1L03':
                                    that.adduser.diseaseSubtype = 'AML(急性髓细胞白血病)'
                                break;
                            case 'H1L04':
                                    that.adduser.diseaseSubtype = 'APL(急性早幼粒白血病)'
                                break;
                            case 'H1L05':
                                    that.adduser.diseaseSubtype = 'MDS(骨髓增生异常综合征)'
                                break;
                            case 'H1L06':
                                    that.adduser.diseaseSubtype = 'MPN(骨髓增殖性肿瘤)'
                                break;
                            case 'H1L07':
                                    that.adduser.diseaseSubtype = 'CML(慢性粒细胞白血病)'
                                break;
                            case 'H1L08':
                                    that.adduser.diseaseSubtype = 'MDS/MPN(MDS伴MPN)'
                                break;
                            case 'H1L09':
                                    that.adduser.diseaseSubtype = '治疗相关AML(tAML)'
                                break;
                            case 'H1L10':
                                    that.adduser.diseaseSubtype = '家族易感髓系肿瘤'
                                break;
                            case 'H1L11':
                                    that.adduser.diseaseSubtype = 'AA(再生障碍性贫血)'
                                break;
                            case 'H1L12':
                                    that.adduser.diseaseSubtype = '白血病 其他'
                                break;
                            case 'H1L13':
                                    that.adduser.diseaseSubtype = '白血病 诊断不明'
                                break;
                            case 'H1S01':
                                    that.adduser.diseaseSubtype = '易栓症'
                                break;
                            case 'H1B01':
                                    that.adduser.diseaseSubtype = 'DLBCL(弥漫大B细胞淋巴瘤)'
                                break;
                            case 'H1B02':
                                    that.adduser.diseaseSubtype = 'FL(滤泡淋巴瘤)'
                                break;
                            case 'H1B03':
                                    that.adduser.diseaseSubtype = 'MCL(套细胞淋巴瘤)'
                                break;
                            case 'H1B04':
                                    that.adduser.diseaseSubtype = 'CLL/SLL(慢性淋巴细胞白血病/小细胞淋巴瘤)'
                                break;
                            case 'H1B05':
                                    that.adduser.diseaseSubtype = 'LPL/WM(淋巴浆细胞淋巴瘤/华氏巨球蛋白血症)'
                                break;
                            case 'H1B06':
                                    that.adduser.diseaseSubtype = 'B细胞淋巴瘤 其他'
                                break;
                            case 'H1B07':
                                    that.adduser.diseaseSubtype = 'B细胞淋巴瘤 诊断不明'
                                break;
                            case 'H1T01':
                                    that.adduser.diseaseSubtype = 'AITL(血管免疫母细胞T细胞淋巴瘤)'
                                break;
                            case 'H1T02':
                                    that.adduser.diseaseSubtype = 'ALCL(间变大细胞淋巴瘤)'
                                break;
                            case 'H1T03':
                                    that.adduser.diseaseSubtype = 'PTCL-NOS(外周T细胞淋巴瘤非特指)'
                                break;
                            case 'H1T04':
                                    that.adduser.diseaseSubtype = 'NK/T细胞淋巴瘤(NK/T-CL)'
                                break;
                            case 'H1T05':
                                    that.adduser.diseaseSubtype = 'T细胞淋巴瘤 其他'
                                break;
                            case 'H1T06':
                                    that.adduser.diseaseSubtype = 'T细胞淋巴瘤 诊断不明'
                                break;
                            case 'H1G01':
                                    that.adduser.diseaseSubtype = '多发性骨髓瘤(MM)'
                                break;
                            case 'H2H01':
                                    that.adduser.diseaseSubtype = '噬血细胞综合征'
                                break;
                            default:
                                that.adduser.diseaseSubtype = res.data.data.diseaseSubtype
                                break;
                        }
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
            that.axios.get('/api/NHL/CheckDetectcode',{
            params: {
                code:that.adduser.detectcode,
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

        //科室选择
        departmentChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.DepartmentSelect);
            this.selectIndex = '1'
        },

        //物流公司选择
        emsChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.logisticsCompanySelect);
            this.selectIndex = '2'
        },
        
         //AnnArbor分期
        AnnArborChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.AnnArborSelect);
            this.selectIndex = '3'
        },
        AnnArborBlurChange(){
            if(this.adduser.AnnArbor !=''){
                if(this.adduser.AnnArbor>4 || this.adduser.AnnArbor<1 || isNaN(this.adduser.AnnArbor)){
                    Dialog.alert({
                        title: '提示',
                        message: '数值格式不正确，请您重新输入',
                        }).then(() => {
                        // on close
                        this.adduser.AnnArbor = '';    
                    });
                }
            }
        }, 

        //疾病分期
        DiseaseChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.DiseaseStageSelect);
            this.selectIndex = '4'
        },

        //结外浸润
        extranodalInfiltration(){
            this.$refs.PickerSelect.onPickerConfirm(this.InfiltrationSelect);
            this.selectIndex = '5'
        },

        //ECOG
        EcogBlur(){
            if(this.adduser.ECOG == ''){
                return
            }else{
                if(this.adduser.ECOG>4 || this.adduser.ECOG<0 || isNaN(this.adduser.ECOG)){
                    Dialog.alert({
                        title: '提示',
                        message: '数值格式不正确，请您重新输入',
                        }).then(() => {
                        // on close
                        this.adduser.ECOG = '';    
                    });
                }
            }
        },

        //MYC表达
        MycChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.MycSelelct);
            this.selectIndex = '6'
        },

        //BCL2表达
        BCL2Change(){
            console.log(this.Bcl2Select);
            this.$refs.PickerSelect.onPickerConfirm(this.Bcl2Select);
            this.selectIndex = '7'
        },

        //送检样本类型
        SampleChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.SampleSelect);
            this.selectIndex = '8'
        },
        //疾病亚型
        DiseaseSubtypeChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.DiseaseSubtypeSelect);
            this.selectIndex = '10'
        },   
        //ECOG评分
        ecogChange(){
           this.$refs.PickerSelect.onPickerConfirm(this.ecogSelect);
           this.selectIndex = '11' 
        },

        //ldh(乳酸脱氢酶)
        ldhChange(){
            this.$refs.PickerSelect.onPickerConfirm(this.ldhSelect);
            this.selectIndex = '12' 
        },

        //传值
        onPickerConfirm(res){
            tihs.$emit(res);
        },

        //取值
        getMsgFormSon(data){
            console.log(data);
            let that  = this;
            switch (that.selectIndex) {
                case '1':
                    that.adduser.department = data;
                    break;
                case '2':
                    that.adduser.ems = data;
                    break;
                case '3':
                    that.adduser.AnnArbor = data;
                    break;
                case '4':
                    that.adduser.diseaseStage = data;
                    break;
                case '5':
                    that.adduser.extranodalInfiltration = data;
                    break;
                case '6':
                    that.adduser.MYC = data;
                    break; 
                case '7':
                    that.adduser.BCL2 = data;
                    break; 
                case '8':
                    if(data == '石蜡组织' || data == '新鲜组织'){
                        that.adduser.sampleType = data;
                    }else{
                        Dialog.alert({
                            title: '提示',
                            message: '即日起至通知时，因疫情原因目前只接受石蜡组织或新鲜组织',
                            }).then(() => {
                            // on close
                            that.adduser.sampleType = '石蜡组织';
                        });
                    }
                    break;      
                case '9':
                    that.adduser.sendingCompany = data;
                    break;
                case '10':
                    that.adduser.diseaseSubtype = data;
                    break;  
                case '11':
                    that.adduser.ECOG = data;
                    break; 
                case '12':
                    that.adduser.LDH = data;
                    break;      
                default:
                    break;
            }

        },
        
        //寄件日期选择
        MailChange(){
            this.$refs.datePickerSelect.onDatePickerConfirm();
        },
        
        //样本返回
        needChange(){
            console.log(this.adduser.sample_need_return);
        },

        //日期选择传值
        onDatePickerConfirm(){
          tihs.$emit();
        },

        //日期选择取值
        getDateMsgFormSon(data){
          console.log(data);
          this.adduser.ems_date  = data;
        },
        
        //上传知情同意书
        imgUploadChange(){
            this.$refs.inputA.dispatchEvent(new MouseEvent('click'));
        },

        //上传图片
        changeImg (type) {
            var files = this.$refs.inputA.files;
            this.Upload(files[0],type);
        },

        //自定义上传方法..
        Upload(file) {
            console.log(file)
            var name = 'linbaliu'
            let fileName = name+'/'+file.lastModified + file.name;
            console.log(fileName);
            const _this = this;
            _this.axios.get('https://commapi.forhoo.cn/forhoo/GetOSSSTS?dir=linbaliu').then((result) => {
                console.log(result.data);
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
                console.log(blob);
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
                        let httpUrl = 'https://merckoss.wfbweb.com/'
                        _this.adduser.agree_img =  httpUrl+fileName;
                    console.log(_this.fileurlA);
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
            }else if(this.adduser.patientphone ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入患者联系电话',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.sendingDoctor ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入送检医生',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.sendingCompany ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请选择送检单位',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.clinical ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入临床/病理诊断',
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
            }
            // else if(this.adduser.sample_need_return){
            //     if(this.adduser.sample_return_name ==''){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请输入收件人姓名',
            //         }).then(() => {
            //         // on close
            //         });
            //     }else if(this.adduser.sample_return_addressee ==''){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请输入收件地址',
            //         }).then(() => {
            //         // on close
            //         });
            //     }else if(this.adduser.sample_return_phone ==''){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请输入联系人方式',
            //         }).then(() => {
            //         // on close
            //         });
            //     }else if(this.adduser.agree_img == ''){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请上传知情同意书',
            //             }).then(() => {
            //             // on close
            //         });
            //     }else if(this.adduser.primarySite ==''){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请输入原发部位',
            //             }).then(() => {
            //             // on close

            //         });
            //     }else if(this.adduser.courseDisease ==''){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请输入病程',
            //             }).then(() => {
            //             // on close

            //         });
            //     }else if(this.adduser.ECOG ==''){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请选择ECOG',
            //             }).then(() => {
            //             // on close

            //         });
            //     }else if(this.adduser.LDH ==''){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请选择LDH',
            //             }).then(() => {
            //             // on close

            //         });
            //     }else{
            //         this.addSubmitChange();
            //     }
            // }
            else if(this.adduser.agree_img == ''){
                Dialog.alert({
                    title: '提示',
                    message: '请上传知情同意书',
                    }).then(() => {
                    // on close
                });
            }else if(this.adduser.primarySite ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入原发部位',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.courseDisease ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请输入病程',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.ECOG ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请选择ECOG',
                    }).then(() => {
                    // on close

                });
            }else if(this.adduser.LDH ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请选择LDH',
                    }).then(() => {
                    // on close

                });
            }else{
                this.addSubmitChange();
            }
        },

        //确认提交
        addSubmitChange(){
            console.log('提交')
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
                switch (that.adduser.diseaseSubtype) {
                    case 'B-ALL(急性B淋巴细胞白血病)':
                            that.adduser.diseaseSubtype = 'H1L01'
                        break;
                    case 'T-ALL(急性T淋巴细胞白血病)':
                            that.adduser.diseaseSubtype = 'H1L02'
                        break;
                    case 'AML(急性髓细胞白血病)':
                            that.adduser.diseaseSubtype = 'H1L03'
                        break;
                    case 'APL(急性早幼粒白血病)':
                            that.adduser.diseaseSubtype = 'H1L04'
                        break;
                    case 'MDS(骨髓增生异常综合征)':
                            that.adduser.diseaseSubtype = 'H1L05'
                        break;
                    case 'MPN(骨髓增殖性肿瘤)':
                            that.adduser.diseaseSubtype = 'H1L06'
                        break;
                    case 'CML(慢性粒细胞白血病)':
                            that.adduser.diseaseSubtype = 'H1L07'
                        break;
                    case 'MDS/MPN(MDS伴MPN)':
                            that.adduser.diseaseSubtype = 'H1L08'
                        break;
                    case '治疗相关AML(tAML)':
                            that.adduser.diseaseSubtype = 'H1L09'
                        break;
                    case '家族易感髓系肿瘤':
                            that.adduser.diseaseSubtype = 'H1L10'
                        break;
                    case 'AA(再生障碍性贫血)':
                            that.adduser.diseaseSubtype = 'H1L11'
                        break;
                    case '白血病 其他':
                            that.adduser.diseaseSubtype = 'H1L12'
                        break;
                    case '白血病 诊断不明':
                            that.adduser.diseaseSubtype = 'H1L13'
                        break;
                    case '易栓症':
                            that.adduser.diseaseSubtype = 'H1S01'
                        break;
                    case 'DLBCL(弥漫大B细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1B01'
                        break;
                    case 'FL(滤泡淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1B02'
                        break;
                    case 'MCL(套细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1B03'
                        break;
                    case 'CLL/SLL(慢性淋巴细胞白血病/小细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1B04'
                        break;
                    case 'LPL/WM(淋巴浆细胞淋巴瘤/华氏巨球蛋白血症)':
                            that.adduser.diseaseSubtype = 'H1B05'
                        break;
                    case 'B细胞淋巴瘤 其他':
                            that.adduser.diseaseSubtype = 'H1B06'
                        break;
                    case 'B细胞淋巴瘤 诊断不明':
                            that.adduser.diseaseSubtype = 'H1B07'
                        break;
                    case 'AITL(血管免疫母细胞T细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1T01'
                        break;
                    case 'ALCL(间变大细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1T02'
                        break;
                    case 'PTCL-NOS(外周T细胞淋巴瘤非特指)':
                            that.adduser.diseaseSubtype = 'H1T03'
                        break;
                    case 'NK/T细胞淋巴瘤(NK/T-CL)':
                            that.adduser.diseaseSubtype = 'H1T04'
                        break;
                    case 'T细胞淋巴瘤 其他':
                            that.adduser.diseaseSubtype = 'H1T05'
                        break;
                    case 'T细胞淋巴瘤 诊断不明':
                            that.adduser.diseaseSubtype = 'H1T06'
                        break;
                    case '多发性骨髓瘤(MM)':
                            that.adduser.diseaseSubtype = 'H1G01'
                        break;
                    case '噬血细胞综合征':
                            that.adduser.diseaseSubtype = 'H2H01'
                        break;
                    default:
                        break;
                };
                if(that.adduser.LDH == '+'){
                    var ldhVal = '阳性'
                }else{
                    var ldhVal = '阴性'
                };
                if(that.adduser.MYC == '+'){
                    var mycVal = '阳性'
                }else{
                    var mycVal = '阴性'
                };
                if(that.adduser.BCL2 == '+'){
                    var bcl2Val = '阳性'
                }else{
                    var bcl2Val = '阴性'
                };
                let promise = { 
                    'openid':that.openid,//openid
                    'username':that.userInfoList.nickname,//填报人
                    'detectcode':that.adduser.detectcode,//送检编号
                    'patient':that.adduser.username,//患者
                    'sex':sex,//性别
                    'age':that.adduser.age*1,//年龄
                    'doctor':that.adduser.sendingDoctor,//送检医生
                    'unit':that.adduser.sendingCompany,//送检单位
                    'keshi':that.adduser.department,//科室
                    'zhenduan':that.adduser.clinical,//诊断
                    'part':that.adduser.primarySite,//部位
                    'sick':that.adduser.courseDisease,//病程
                    'ann':that.adduser.AnnArbor,//AnnArbor分期
                    'disease':that.adduser.diseaseStage,//疾病分期
                    'qinrun':that.adduser.extranodalInfiltration,//结外侵润
                    'ecog':that.adduser.ECOG,//体能状态
                    'ldh':ldhVal,//乳酸脱氢酶
                    'ldh_exp':that.adduser.ldh_exp,//LDH表达级联子
                    'myc':mycVal,//MYC表达
                    'myc_exp':that.adduser.MYCCascade,//MYC表达级联子
                    'bcl2':bcl2Val,//BCL2表达
                    'bcl2_exp':that.adduser.BCL2Cascade,//BCL2表达级联子
                    'sample':that.adduser.sampleType,//样本
                    'status':1,//0 默认未确认；1：已确认数据
                    'agree_img':that.adduser.agree_img,//知情同意书
                    'ems':that.adduser.ems,//快递公司
                    'ems_code':that.adduser.ems_code,//快递单号
                    'ems_date':that.adduser.ems_date,//寄件日期
                    'patientphone':that.adduser.patientphone,//患者手机号 
                    'diseaseSubtype':that.adduser.diseaseSubtype,//疾病亚型
                    'sample_need_return':that.adduser.sample_need_return,//样本返回
                    'sample_return_name':that.adduser.sample_return_name,//收件人
                    'sample_return_addressee':that.adduser.sample_return_addressee,//收件地址
                    'sample_return_phone':that.adduser.sample_return_phone//收件人联系方式
                };
                that.isDisabled = true;
                setTimeout(() => {
                    that.isDisabled = false;
                }, 5000);
                
                that.axios.post('/api/NHL/CreateInfo', promise)
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
            switch (that.adduser.diseaseSubtype) {
                case 'B-ALL(急性B淋巴细胞白血病)':
                        that.adduser.diseaseSubtype = 'H1L01'
                    break;
                case 'T-ALL(急性T淋巴细胞白血病)':
                        that.adduser.diseaseSubtype = 'H1L02'
                    break;
                case 'AML(急性髓细胞白血病)':
                        that.adduser.diseaseSubtype = 'H1L03'
                    break;
                case 'APL(急性早幼粒白血病)':
                        that.adduser.diseaseSubtype = 'H1L04'
                    break;
                case 'MDS(骨髓增生异常综合征)':
                        that.adduser.diseaseSubtype = 'H1L05'
                    break;
                case 'MPN(骨髓增殖性肿瘤)':
                        that.adduser.diseaseSubtype = 'H1L06'
                    break;
                case 'CML(慢性粒细胞白血病)':
                        that.adduser.diseaseSubtype = 'H1L07'
                    break;
                case 'MDS/MPN(MDS伴MPN)':
                        that.adduser.diseaseSubtype = 'H1L08'
                    break;
                case '治疗相关AML(tAML)':
                        that.adduser.diseaseSubtype = 'H1L09'
                    break;
                case '家族易感髓系肿瘤':
                        that.adduser.diseaseSubtype = 'H1L10'
                    break;
                case 'AA(再生障碍性贫血)':
                        that.adduser.diseaseSubtype = 'H1L11'
                    break;
                case '白血病 其他':
                        that.adduser.diseaseSubtype = 'H1L12'
                    break;
                case '白血病 诊断不明':
                        that.adduser.diseaseSubtype = 'H1L13'
                    break;
                case '易栓症':
                        that.adduser.diseaseSubtype = 'H1S01'
                    break;
                case 'DLBCL(弥漫大B细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1B01'
                    break;
                case 'FL(滤泡淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1B02'
                    break;
                case 'MCL(套细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1B03'
                    break;
                case 'CLL/SLL(慢性淋巴细胞白血病/小细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1B04'
                    break;
                case 'LPL/WM(淋巴浆细胞淋巴瘤/华氏巨球蛋白血症)':
                        that.adduser.diseaseSubtype = 'H1B05'
                    break;
                case 'B细胞淋巴瘤 其他':
                        that.adduser.diseaseSubtype = 'H1B06'
                    break;
                case 'B细胞淋巴瘤 诊断不明':
                        that.adduser.diseaseSubtype = 'H1B07'
                    break;
                case 'AITL(血管免疫母细胞T细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1T01'
                    break;
                case 'ALCL(间变大细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1T02'
                    break;
                case 'PTCL-NOS(外周T细胞淋巴瘤非特指)':
                        that.adduser.diseaseSubtype = 'H1T03'
                    break;
                case 'NK/T细胞淋巴瘤(NK/T-CL)':
                        that.adduser.diseaseSubtype = 'H1T04'
                    break;
                case 'T细胞淋巴瘤 其他':
                        that.adduser.diseaseSubtype = 'H1T05'
                    break;
                case 'T细胞淋巴瘤 诊断不明':
                        that.adduser.diseaseSubtype = 'H1T06'
                    break;
                case '多发性骨髓瘤(MM)':
                        that.adduser.diseaseSubtype = 'H1G01'
                    break;
                case '噬血细胞综合征':
                        that.adduser.diseaseSubtype = 'H2H01'
                    break;
                default:
                    break;
            };
            if(that.adduser.LDH == '+'){
                var ldhVal = '阳性'
            }else{
                var ldhVal = '阴性'
            };
            if(that.adduser.MYC == '+'){
                var mycVal = '阳性'
            }else{
                var mycVal = '阴性'
            };
            if(that.adduser.BCL2 == '+'){
                var bcl2Val = '阳性'
            }else{
                var bcl2Val = '阴性'
            };
            let promise = { 
                'id':that.id,//openid
                'username':that.userInfoList.nickname,//填报人
                'detectcode':that.adduser.detectcode,//送检编号
                'patient':that.adduser.username,//患者
                'sex':sex,//性别
                'age':that.adduser.age*1,//年龄
                'doctor':that.adduser.sendingDoctor,//送检医生
                'unit':that.adduser.sendingCompany,//送检单位
                'keshi':that.adduser.department,//科室
                'zhenduan':that.adduser.clinical,//诊断
                'part':that.adduser.primarySite,//部位
                'sick':that.adduser.courseDisease,//病程
                'ann':that.adduser.AnnArbor,//AnnArbor分期
                'disease':that.adduser.diseaseStage,//疾病分期
                'qinrun':that.adduser.extranodalInfiltration,//结外侵润
                'ecog':that.adduser.ECOG,//体能状态
                'ldh':ldhVal,//乳酸脱氢酶
                'ldh_exp':that.adduser.ldh_exp,//LDH表达级联子
                'myc':mycVal,//MYC表达
                'myc_exp':that.adduser.MYCCascade,//MYC表达级联子
                'bcl2':bcl2Val,//BCL2表达
                'bcl2_exp':that.adduser.BCL2Cascade,//BCL2表达级联子
                'sample':that.adduser.sampleType,//样本
                'status':1,//0 默认未确认；1：已确认数据
                'agree_img':that.adduser.agree_img,//知情同意书
                'ems':that.adduser.ems,//快递公司
                'ems_code':that.adduser.ems_code,//快递单号
                'ems_date':that.adduser.ems_date,//寄件日期
                'patientphone':that.adduser.patientphone,//患者手机号
                'diseaseSubtype':that.adduser.diseaseSubtype,//疾病亚型  
                'sample_need_return':that.adduser.sample_need_return,//样本返回
                'sample_return_name':that.adduser.sample_return_name,//收件人
                'sample_return_addressee':that.adduser.sample_return_addressee,//收件地址
                'sample_return_phone':that.adduser.sample_return_phone//收件人联系方式
            };
            that.isDisabled = true;
            setTimeout(() => {
                that.isDisabled = false;
            },5000);
            that.axios.post('/api/NHL/UpdateInfo', promise)
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
                if(that.adduser.age ==''){
                    that.adduser.age = 0;
                }
                if(that.adduser.sex == '1'){
                    var sex = '男'
                }else{
                    var sex = '女'
                }
                switch (that.adduser.diseaseSubtype) {
                    case 'B-ALL(急性B淋巴细胞白血病)':
                            that.adduser.diseaseSubtype = 'H1L01'
                        break;
                    case 'T-ALL(急性T淋巴细胞白血病)':
                            that.adduser.diseaseSubtype = 'H1L02'
                        break;
                    case 'AML(急性髓细胞白血病)':
                            that.adduser.diseaseSubtype = 'H1L03'
                        break;
                    case 'APL(急性早幼粒白血病)':
                            that.adduser.diseaseSubtype = 'H1L04'
                        break;
                    case 'MDS(骨髓增生异常综合征)':
                            that.adduser.diseaseSubtype = 'H1L05'
                        break;
                    case 'MPN(骨髓增殖性肿瘤)':
                            that.adduser.diseaseSubtype = 'H1L06'
                        break;
                    case 'CML(慢性粒细胞白血病)':
                            that.adduser.diseaseSubtype = 'H1L07'
                        break;
                    case 'MDS/MPN(MDS伴MPN)':
                            that.adduser.diseaseSubtype = 'H1L08'
                        break;
                    case '治疗相关AML(tAML)':
                            that.adduser.diseaseSubtype = 'H1L09'
                        break;
                    case '家族易感髓系肿瘤':
                            that.adduser.diseaseSubtype = 'H1L10'
                        break;
                    case 'AA(再生障碍性贫血)':
                            that.adduser.diseaseSubtype = 'H1L11'
                        break;
                    case '白血病 其他':
                            that.adduser.diseaseSubtype = 'H1L12'
                        break;
                    case '白血病 诊断不明':
                            that.adduser.diseaseSubtype = 'H1L13'
                        break;
                    case '易栓症':
                            that.adduser.diseaseSubtype = 'H1S01'
                        break;
                    case 'DLBCL(弥漫大B细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1B01'
                        break;
                    case 'FL(滤泡淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1B02'
                        break;
                    case 'MCL(套细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1B03'
                        break;
                    case 'CLL/SLL(慢性淋巴细胞白血病/小细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1B04'
                        break;
                    case 'LPL/WM(淋巴浆细胞淋巴瘤/华氏巨球蛋白血症)':
                            that.adduser.diseaseSubtype = 'H1B05'
                        break;
                    case 'B细胞淋巴瘤 其他':
                            that.adduser.diseaseSubtype = 'H1B06'
                        break;
                    case 'B细胞淋巴瘤 诊断不明':
                            that.adduser.diseaseSubtype = 'H1B07'
                        break;
                    case 'AITL(血管免疫母细胞T细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1T01'
                        break;
                    case 'ALCL(间变大细胞淋巴瘤)':
                            that.adduser.diseaseSubtype = 'H1T02'
                        break;
                    case 'PTCL-NOS(外周T细胞淋巴瘤非特指)':
                            that.adduser.diseaseSubtype = 'H1T03'
                        break;
                    case 'NK/T细胞淋巴瘤(NK/T-CL)':
                            that.adduser.diseaseSubtype = 'H1T04'
                        break;
                    case 'T细胞淋巴瘤 其他':
                            that.adduser.diseaseSubtype = 'H1T05'
                        break;
                    case 'T细胞淋巴瘤 诊断不明':
                            that.adduser.diseaseSubtype = 'H1T06'
                        break;
                    case '多发性骨髓瘤(MM)':
                            that.adduser.diseaseSubtype = 'H1G01'
                        break;
                    case '噬血细胞综合征':
                            that.adduser.diseaseSubtype = 'H2H01'
                        break;
                    default:
                        break;
                };
                if(that.adduser.LDH == '+'){
                    var ldhVal = '阳性'
                }else{
                    var ldhVal = '阴性'
                };
                if(that.adduser.MYC == '+'){
                    var mycVal = '阳性'
                }else{
                    var mycVal = '阴性'
                };
                if(that.adduser.BCL2 == '+'){
                    var bcl2Val = '阳性'
                }else{
                    var bcl2Val = '阴性'
                };
                let promise = { 
                    'openid':that.openid,//openid
                    'username':that.userInfoList.nickname,//填报人
                    'detectcode':that.adduser.detectcode,//送检编号
                    'patient':that.adduser.username,//患者
                    'sex':sex,//性别
                    'age':that.adduser.age*1,//年龄
                    'doctor':that.adduser.sendingDoctor,//送检医生
                    'unit':that.adduser.sendingCompany,//送检单位
                    'keshi':that.adduser.department,//科室
                    'zhenduan':that.adduser.clinical,//诊断
                    'part':that.adduser.primarySite,//部位
                    'sick':that.adduser.courseDisease,//病程
                    'ann':that.adduser.AnnArbor,//AnnArbor分期
                    'disease':that.adduser.diseaseStage,//疾病分期
                    'qinrun':that.adduser.extranodalInfiltration,//结外侵润
                    'ecog':that.adduser.ECOG,//体能状态
                    'ldh':ldhVal,//乳酸脱氢酶
                    'ldh_exp':that.adduser.ldh_exp,//LDH表达级联子
                    'myc':mycVal,//MYC表达
                    'myc_exp':that.adduser.MYCCascade,//MYC表达级联子
                    'bcl2':bcl2Val,//BCL2表达
                    'bcl2_exp':that.adduser.BCL2Cascade,//BCL2表达级联子
                    'sample':that.adduser.sampleType,//样本
                    'status':0,//0 默认未确认；1：已确认数据
                    'agree_img':that.adduser.agree_img,//知情同意书
                    'ems':that.adduser.ems,//快递公司
                    'ems_code':that.adduser.ems_code,//快递单号
                    'ems_date':that.adduser.ems_date,//寄件日期
                    'patientphone':that.adduser.patientphone,//患者手机号 
                    'diseaseSubtype':that.adduser.diseaseSubtype,//疾病亚型
                    'sample_need_return':that.adduser.sample_need_return,//样本返回
                    'sample_return_name':that.adduser.sample_return_name,//收件人
                    'sample_return_addressee':that.adduser.sample_return_addressee,//收件地址
                    'sample_return_phone':that.adduser.sample_return_phone//收件人联系方式
                };
                that.isDisabled = true;
                setTimeout(() => {
                    that.isDisabled = false;
                }, 5000);
                that.axios.post('/api/NHL/CreateInfo', promise)
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
            switch (that.adduser.diseaseSubtype) {
                case 'B-ALL(急性B淋巴细胞白血病)':
                        that.adduser.diseaseSubtype = 'H1L01'
                    break;
                case 'T-ALL(急性T淋巴细胞白血病)':
                        that.adduser.diseaseSubtype = 'H1L02'
                    break;
                case 'AML(急性髓细胞白血病)':
                        that.adduser.diseaseSubtype = 'H1L03'
                    break;
                case 'APL(急性早幼粒白血病)':
                        that.adduser.diseaseSubtype = 'H1L04'
                    break;
                case 'MDS(骨髓增生异常综合征)':
                        that.adduser.diseaseSubtype = 'H1L05'
                    break;
                case 'MPN(骨髓增殖性肿瘤)':
                        that.adduser.diseaseSubtype = 'H1L06'
                    break;
                case 'CML(慢性粒细胞白血病)':
                        that.adduser.diseaseSubtype = 'H1L07'
                    break;
                case 'MDS/MPN(MDS伴MPN)':
                        that.adduser.diseaseSubtype = 'H1L08'
                    break;
                case '治疗相关AML(tAML)':
                        that.adduser.diseaseSubtype = 'H1L09'
                    break;
                case '家族易感髓系肿瘤':
                        that.adduser.diseaseSubtype = 'H1L10'
                    break;
                case 'AA(再生障碍性贫血)':
                        that.adduser.diseaseSubtype = 'H1L11'
                    break;
                case '白血病 其他':
                        that.adduser.diseaseSubtype = 'H1L12'
                    break;
                case '白血病 诊断不明':
                        that.adduser.diseaseSubtype = 'H1L13'
                    break;
                case '易栓症':
                        that.adduser.diseaseSubtype = 'H1S01'
                    break;
                case 'DLBCL(弥漫大B细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1B01'
                    break;
                case 'FL(滤泡淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1B02'
                    break;
                case 'MCL(套细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1B03'
                    break;
                case 'CLL/SLL(慢性淋巴细胞白血病/小细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1B04'
                    break;
                case 'LPL/WM(淋巴浆细胞淋巴瘤/华氏巨球蛋白血症)':
                        that.adduser.diseaseSubtype = 'H1B05'
                    break;
                case 'B细胞淋巴瘤 其他':
                        that.adduser.diseaseSubtype = 'H1B06'
                    break;
                case 'B细胞淋巴瘤 诊断不明':
                        that.adduser.diseaseSubtype = 'H1B07'
                    break;
                case 'AITL(血管免疫母细胞T细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1T01'
                    break;
                case 'ALCL(间变大细胞淋巴瘤)':
                        that.adduser.diseaseSubtype = 'H1T02'
                    break;
                case 'PTCL-NOS(外周T细胞淋巴瘤非特指)':
                        that.adduser.diseaseSubtype = 'H1T03'
                    break;
                case 'NK/T细胞淋巴瘤(NK/T-CL)':
                        that.adduser.diseaseSubtype = 'H1T04'
                    break;
                case 'T细胞淋巴瘤 其他':
                        that.adduser.diseaseSubtype = 'H1T05'
                    break;
                case 'T细胞淋巴瘤 诊断不明':
                        that.adduser.diseaseSubtype = 'H1T06'
                    break;
                case '多发性骨髓瘤(MM)':
                        that.adduser.diseaseSubtype = 'H1G01'
                    break;
                case '噬血细胞综合征':
                        that.adduser.diseaseSubtype = 'H2H01'
                    break;
                default:
                    break;
            };
            if(that.adduser.LDH == '+'){
                var ldhVal = '阳性'
            }else{
                var ldhVal = '阴性'
            };
            if(that.adduser.MYC == '+'){
                var mycVal = '阳性'
            }else{
                var mycVal = '阴性'
            };
            if(that.adduser.BCL2 == '+'){
                var bcl2Val = '阳性'
            }else{
                var bcl2Val = '阴性'
            };
            let promise = { 
                'id':that.id,//openid
                'username':that.userInfoList.nickname,//填报人
                'detectcode':that.adduser.detectcode,//送检编号
                'patient':that.adduser.username,//患者
                'sex':sex,//性别
                'age':that.adduser.age*1,//年龄
                'doctor':that.adduser.sendingDoctor,//送检医生
                'unit':that.adduser.sendingCompany,//送检单位
                'keshi':that.adduser.department,//科室
                'zhenduan':that.adduser.clinical,//诊断
                'part':that.adduser.primarySite,//部位
                'sick':that.adduser.courseDisease,//病程
                'ann':that.adduser.AnnArbor,//AnnArbor分期
                'disease':that.adduser.diseaseStage,//疾病分期
                'qinrun':that.adduser.extranodalInfiltration,//结外侵润
                'ecog':that.adduser.ECOG,//体能状态
                'ldh':ldhVal,//乳酸脱氢酶
                'ldh_exp':that.adduser.ldh_exp,//LDH表达级联子
                'myc':mycVal,//MYC表达
                'myc_exp':that.adduser.MYCCascade,//MYC表达级联子
                'bcl2':bcl2Val,//BCL2表达
                'bcl2_exp':that.adduser.BCL2Cascade,//BCL2表达级联子
                'sample':that.adduser.sampleType,//样本
                'status':0,//0 默认未确认；1：已确认数据
                'agree_img':that.adduser.agree_img,//知情同意书
                'ems':that.adduser.ems,//快递公司
                'ems_code':that.adduser.ems_code,//快递单号
                'ems_date':that.adduser.ems_date,//寄件日期
                'patientphone':that.adduser.patientphone,//患者手机号
                'diseaseSubtype':that.adduser.diseaseSubtype,//疾病亚型
                'sample_need_return':that.adduser.sample_need_return,//样本返回
                'sample_return_name':that.adduser.sample_return_name,//收件人
                'sample_return_addressee':that.adduser.sample_return_addressee,//收件地址
                'sample_return_phone':that.adduser.sample_return_phone//收件人联系方式
            };
            that.isDisabled = true;
            setTimeout(() => {
                that.isDisabled = false;
            }, 5000);
            that.axios.post('/api/NHL/UpdateInfo', promise)
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
.header-list div img{
    width: 46px;
    margin-right: 10px;
    vertical-align: middle;
}
.header-list div:nth-of-type(2){
    width: 199px;
    height: 72px;
    background: #fff;
    border-radius: 16px 16px 0px 0px;
    font-family: PingFang, PingFang-SC-Bold;
    font-weight: normal;
    color: #333;
    letter-spacing: -0.6px;
}
.header-list div:nth-of-type(3){
    width: 259px;
    height: 72px;
    background: #75d6d9;
    border: 3px solid #75d6d9;
    border-radius: 16px 16px 0px 0px;
    font-size: 30px;
    font-family: PingFang, PingFang-SC-Bold;
    font-weight: normal;
    color: #fff;
    letter-spacing: -0.6px;
    line-height: 60px;
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
.addDetail-Page{
    width: 100%;
    height: 100%;
    background: #fff;
}
.header-box{
    width: 100%;
    height: auto;
    position: relative;
    margin-top: -41.5vw;
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

/*content-box*/
.content-box{
    background: #fff;
    width: 100%;
    height: 74.5px;
    line-height:74.5px;
}
.content-name-date{
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    background: #fff;
}
.content-name-date div{
    font-size: 26px;
    font-family: PingFang, PingFang-SC-Regular;
    font-weight: SC-Regular;
    text-align: left;
    padding-left: 56px;
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
    padding-left: 60px;
    box-sizing: border-box;
}
.content-info-user-name .left span{
    font-size: 28px;
    font-family: PingFang, PingFang-SC-Medium;
    font-weight: SC-Medium;
    color: #333333;
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
    background: #fff;
    display: grid;
    grid-template-columns: 40% 60%;
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
    margin-left: 36vw;
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
    background: #fff;
    padding-bottom: 140px;
    box-sizing: border-box;
    /* display: grid; */
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