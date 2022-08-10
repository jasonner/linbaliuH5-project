<template>
<div class="addDetail-Page">
    <div class="header-box">
        <!-- <img src="@/assets/img/addDetail/headerbg.png"/>
        <div class="header-title" bindtap="goback">
            <img  src="@/assets/img/addDetail/back.png"/>
            <span>记录详情</span>
        </div> -->
        <div class="header-number">
          送检编号 {{recordList.detectcode}}
        </div>
        <div class="content-box">
            <div class="content-name-date">
                <div class="left"> 
                    填报人：{{recordList.username}}
                </div>
                <div class="right">
                    填表日期：{{recordList.write}}
                </div>
            </div>
            <div class="content-name-date">
                <div class="left"> 
                  送检医生：{{recordList.doctor}}
                </div>
                <div class="right">
                  <span style="letter-spacing: 15px;">科  室</span>：{{recordList.keshi}}
                </div>
            </div>

            <!-- 送检数据 -->
            <div class="Information-report-box" @click="InformationShowChange()">
              <div class="pie-title">
                <div class="left">
                  <span class="ranking-select-icon"></span><span class="ranking-select-title">送检数据</span>
                </div>
                <div class="right">
                    <img v-show="!InformationShow" class="Information-report-up" src="@/assets/img/addDetail/select.png"/>
                     <img v-show="InformationShow" class="Information-report-up" src="@/assets/img/addDetail/upselect.png"/>
                </div>
              </div>
            </div>  
            
            <!-- 送检数据详情 -->
            <div class="Inspection-data-box" v-show="InformationShow">
              <!-- 姓    名 -->
              <div class="content-info-user-name">
                  <div class="left">
                      <span class="user-name">姓    名</span>
                  </div>
                  <div class="right">
                      <input maxlength="15" v-model="recordList.patient" disabled="true"  placeholder-class="placeholder-input" type="text" placeholder="请输入您的姓名"/>
                  </div>
              </div>
              
              <!-- 性    别 -->
              <div class="content-user-sex" style="grid-template-columns: 40% 60%;">
                  <div class="left">
                        <span class="user-name">性    别</span>
                    </div>
                    <div class="right">
                        <van-radio-group class="content-user-sex content-user-sex-box"   v-model="recordList.sex">
                            <van-radio name="1" label-disabled>男</van-radio>
                            <van-radio name="2" label-disabled>女</van-radio>
                        </van-radio-group>
                    </div>
              </div>   

              <!-- 年    龄 -->
              <div class="content-info-user-name">
                  <div class="left">
                      <span class="user-name">年    龄</span>
                  </div>
                  <div class="right">
                      <input maxlength="3" disabled="true" v-model="recordList.age"  placeholder-class="placeholder-input" type="number" placeholder="请输入您的"/>
                  </div>
              </div>

               <!-- 联系电话 -->
              <div class="content-info-user-name">
                  <div class="left">
                      <span>联系电话</span>
                  </div>
                  <div class="right">
                      <input maxlength="11" disabled="true" v-model="recordList.patientphone" type="tel" placeholder-class="placeholder-input" placeholder="请输入患者联系电话"/>
                  </div>
              </div>
              
              <!-- 送检医生  -->
              <div class="content-info-user-name">
                  <div class="left number-span">
                      <span>送检医生</span>
                  </div>
                  <div class="right  number-span">
                      <input disabled="true"  v-model="recordList.doctor"  placeholder-class="placeholder-input" maxlength="15" type="text" placeholder="请输入送检医生"/>
                  </div>
              </div>

              <!-- 送检单位 -->
              <div class="content-info-user-name">
                <div class="left number-text">
                    <span>送检单位</span>
                </div>
                <div class="right">
                    <div class="section">
                        <input disabled="true" v-model="recordList.unit" class="select-input" type="text" />
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
                                    <input class="select-input" v-model="recordList.keshi" disabled="true" type="text" />
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
                                <input class="select-input" v-model="recordList.ems" placeholder="请选择物流公司" disabled="true" type="text" />
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
                        <input class="select-input"  v-model="recordList.ems_code" type="text"  placeholder-class="placeholder-input" placeholder="请输入物流单号" />
                    </div>
                </div>

                <!-- 寄件日期 -->
                <div class="content-info-user-name">
                  <div class="left number-text">
                      <span>寄件日期</span>
                  </div>
                  <div class="right">
                      <div class="section">
                          <input disabled="true" v-model="recordList.ems_date" placeholder="请选择寄件日期" class="select-input" type="text"/>
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
                          <van-switch disabled active-color="#2FC0C5" inactive-color="#fff" size="28px"  style="margin-left:38vw"  v-model="recordList.sample_need_return" />
                      </div>
                  </div>
              </div> 
                  
                <!-- 收件人 -->
              <div class="content-info-user-name"  v-if="recordList.sample_need_return">
                  <div class="left number-text">
                      <span>收件人</span>
                  </div>
                  <div class="right" >
                      <div class="section">
                          <input  v-model="recordList.sample_return_name" placeholder="请输入收件人姓名" class="select-input" type="text"/>
                      </div>
                  </div>
              </div>
              
              
              <!-- 收件地址 -->
              <div class="content-info-user-name" v-if="recordList.sample_need_return">
                  <div class="left number-text">
                      <span>收件地址</span>
                  </div>
                  <div class="right" >
                      <div class="section">
                          <input  v-model="recordList.sample_return_addressee" placeholder="请输入收件地址" class="select-input" type="text"/>
                      </div>
                  </div>
              </div>


              <!-- 联系方式 -->
              <div class="content-info-user-name"  v-if="recordList.sample_need_return">
                  <div class="left number-text">
                      <span>联系方式</span>
                  </div>
                  <div class="right" >
                      <div class="section">
                          <input v-model="recordList.sample_return_phone" placeholder="请输入联系方式" class="select-input" type="text"/>
                      </div>
                  </div>
              </div>

              <!--知情同意书  -->
              <div class="content-info-user-name" v-show="recordList.agree_img !='' && recordList.agree_img">
                  <div class="left">
                      <span>知情同意书</span>
                  </div>
                  <div class="right">
                      <div class="section">
                          <img class="agree_img"  :src="recordList.agree_img" alt="" srcset="">
                      </div>
                  </div>
              </div>

              <!-- 临床/病理诊断 -->
              <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                  <div class="left">
                      <span>临床/病理诊断</span>
                  </div>
                  <div class="right">
                      <input v-model="recordList.zhenduan" style="width:51vw;margin-left:-6vw" disabled="true"  type="text" />
                  </div>
              </div>

              <!-- 原发部位 -->
              <div class="content-info-user-name">
                  <div class="left number-text">
                      <span>原发部位</span>
                  </div>
                  <div class="right  number-text">
                      <input disabled="true"  v-model="recordList.part" placeholder-class="placeholder-input" maxlength="15" type="text" placeholder="请输入原发部位"/>
                  </div>
              </div>

              <!-- 病  程 -->
              <div class="content-info-user-name">
                  <div class="left">
                      <span class="user-name">病  程</span>
                  </div>
                  <div class="right">
                      <input maxlength="15" v-model="recordList.sick" disabled="true"  placeholder-class="placeholder-input" type="text" placeholder="请输入病程"/>
                  </div>
              </div>
              
              <!--AnnArbor(分期) -->
              <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                  <div class="left">
                      <span>AnnArbor(分期)</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input v-model="recordList.ann" disabled="true" style="width:51vw;margin-left:-6vw"  class="select-input" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>

              <!-- 疾病分期 -->
              <div class="content-info-user-name">
                  <div class="left number-text">
                      <span>疾病分期</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input v-model="recordList.disease" disabled="true" class="select-input" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>

              <!-- 结外浸润 -->
              <div class="content-info-user-name">
                  <div class="left number-text">
                      <span>结外浸润</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input v-model="recordList.qinrun" disabled="true" class="select-input" type="text" />
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
                      <input maxlength="15" v-model="recordList.ecog" disabled="true" style="width:51vw;margin-left:-6vw"  placeholder-class="placeholder-input"   type="text" placeholder="请输入您的ECOG"/>
                  </div>
              </div>

              <!-- LDH(乳酸脱氢酶) -->
              <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                  <div class="left">
                      <span>LDH(乳酸脱氢酶)</span>
                  </div>
                  <div class="right">
                      <input maxlength="15" v-model="recordList.ldh" disabled="true" style="width:51vw;margin-left:-6vw"  placeholder-class="placeholder-input"   type="text" placeholder="请输入您的LDH"/>
                  </div>
              </div>

              <!-- LDH(联子级) -->
              <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                  <div class="left">
                      <span>LDH表达(数值)</span>
                  </div>
                  <div class="right">
                      <input  v-model="recordList.ldh_exp" style="width:50vw;margin-left:-5vw" class="select-input" type="number" />
                  </div>
              </div>

              <!-- MYC表达 -->
              <div class="content-info-user-name">
                  <div class="left number-text">
                      <span>MYC表达</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input disabled="true" v-model="recordList.myc"  class="select-input" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>

              <!-- MYC表达(数值) -->
              <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                  <div class="left">
                      <span>MYC表达(数值)</span>
                  </div>
                  <div class="right">
                      <input disabled="true"  v-model="recordList.myc_exp" style="width:51vw;margin-left:-6vw"  placeholder-class="placeholder-input" placeholder="请输入级联子" class="select-input" type="text"/>
                  </div>
              </div>
              
              <!-- BCL2表达 -->
              <div class="content-info-user-name">
                  <div class="left number-text">
                      <span>BCL2表达</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input disabled="true" v-model="recordList.bcl2" class="select-input" type="text" />
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>

              <!-- BCL2表达(数值) -->
              <div class="content-info-user-name" style="grid-template-columns: 40% 60%;">
                  <div class="left">
                      <span>BCL2表达(数值)</span>
                  </div>
                  <div class="right">
                      <input disabled="true" v-model="recordList.bcl2_exp" style="width:51vw;margin-left:-6vw" placeholder-class="placeholder-input" class="select-input" type="text" placeholder="请输入CL2表达"/>
                  </div>
              </div>

              <!-- 送检样本类型 -->
              <div class="content-info-user-name" style="grid-template-columns: 35% 65%;">
                  <div class="left">
                      <span>送检样本类型</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input disabled="true" v-model="recordList.sample"  class="select-input" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>

              <!-- 疾病亚型 -->
              <div class="content-info-user-name" style="grid-template-columns: 35% 65%;">
                  <div class="left">
                      <span>送检样本类型</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input disabled="true" v-model="recordList.diseaseSubtype"  class="select-input" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>
            </div>

            <!-- 睿昂检测数据 -->
            <div class="Information-report-box" @click="InspectionShowChange()">
              <div class="pie-title">
                <div class="left">
                  <span class="ranking-select-icon"></span><span class="ranking-select-title">睿昂检测数据</span>
                </div>
                <div class="right">
                  <img v-show="!InspectionShow"  class="Information-report-up" src="@/assets/img/addDetail/select.png"/>
                  <img v-show="InspectionShow"   class="Information-report-up" src="@/assets/img/addDetail/upselect.png"/>
                </div>
              </div>
            </div>  
            
            <!-- 睿昂检测数据详情 -->
            <div class="select-result-box"  v-show="InspectionShow">
              <div class="content-info-user-name" style="grid-template-columns: 35% 65%;">
                  <div class="left">
                      <span>分子分型结果</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input disabled="true" v-model="TestDataList.result"  class="select-input" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>

              <!-- lsit1 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">BCL2</span>
                  <span class="result-text yangxing" v-if="TestDataList.BCL2 =='阳性'">{{TestDataList.BCL2}}</span>
                  <span class="result-text" v-if="TestDataList.BCL2 =='阴性'">{{TestDataList.BCL2}}</span>
                </div>
                <div class="item">
                  <span class="result-key">BCL6</span>
                  <span class="result-text yangxing" v-if="TestDataList.BCL6 =='阳性'">{{TestDataList.BCL6}}</span>
                  <span class="result-text" v-if="TestDataList.BCL6 =='阴性'">{{TestDataList.BCL6}}</span>
                </div>
                <div class="item">
                  <span class="result-key">MYC</span>
                  <span class="result-text yangxing" v-if="TestDataList.MYC =='阳性'">{{TestDataList.MYC}}</span>
                  <span class="result-text" v-if="TestDataList.MYC =='阴性'">{{TestDataList.MYC}}</span>
                </div>
              </div>

              <!-- lsit2 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">TNFRSF14</span>
                  <span class="result-text yangxing" v-if="TestDataList.TNFRSF14 =='阳性'">{{TestDataList.TNFRSF14}}</span>
                  <span class="result-text" v-if="TestDataList.TNFRSF14 =='阴性'">{{TestDataList.TNFRSF14}}</span>
                </div>
                <div class="item">
                  <span class="result-key">CCND3</span>
                  <span class="result-text yangxing" v-if="TestDataList.CCND3 =='阳性'">{{TestDataList.CCND3}}</span>
                  <span class="result-text" v-if="TestDataList.CCND3 =='阴性'">{{TestDataList.CCND3}}</span>
                </div>
              </div>

              <!-- list3 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">BTG1</span>
                  <span class="result-text yangxing" v-if="TestDataList.BTG1 =='阳性'">{{TestDataList.BTG1}}</span>
                  <span class="result-text" v-if="TestDataList.BTG1 =='阴性'">{{TestDataList.BTG1}}</span>
                </div>
                <div class="item">
                  <span class="result-key">KMT2D</span>
                  <span class="result-text yangxing" v-if="TestDataList.KMT2D =='阳性'">{{TestDataList.KMT2D}}</span>
                  <span class="result-text" v-if="TestDataList.KMT2D =='阴性'">{{TestDataList.KMT2D}}</span>
                </div>
              </div>

              <!-- list4 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">EZH2</span>
                  <span class="result-text yangxing" v-if="TestDataList.EZH2 =='阳性'">{{TestDataList.EZH2}}</span>
                  <span class="result-text" v-if="TestDataList.EZH2 =='阴性'">{{TestDataList.EZH2}}</span>
                </div>
                <div class="item">
                  <span class="result-key">STAT6</span>
                  <span class="result-text yangxing" v-if="TestDataList.STAT6 =='阳性'">{{TestDataList.STAT6}}</span>
                  <span class="result-text" v-if="TestDataList.STAT6 =='阴性'">{{TestDataList.STAT6}}</span>
                </div>
              </div>

              <!-- list5 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">NOTCH1</span>
                  <span class="result-text yangxing" v-if="TestDataList.NOTCH1 =='阳性'">{{TestDataList.NOTCH1}}</span>
                  <span class="result-text" v-if="TestDataList.NOTCH1 =='阴性'">{{TestDataList.NOTCH1}}</span>
                </div>
                <div class="item">
                  <span class="result-key">CD70</span>
                  <span class="result-text yangxing" v-if="TestDataList.CD70 =='阳性'">{{TestDataList.CD70}}</span>
                  <span class="result-text" v-if="TestDataList.CD70 =='阴性'">{{TestDataList.CD70}}</span>
                </div>
              </div>

              <!-- list6 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">TP53</span>
                  <span class="result-text yangxing" v-if="TestDataList.TP53 =='阳性'">{{TestDataList.TP53}}</span>
                  <span class="result-text" v-if="TestDataList.TP53 =='阴性'">{{TestDataList.TP53}}</span>
                </div>
                <div class="item">
                  <span class="result-key">FOXO1</span>
                  <span class="result-text yangxing" v-if="TestDataList.FOXO1 =='阳性'">{{TestDataList.FOXO1}}</span>
                  <span class="result-text" v-if="TestDataList.FOXO1 =='阴性'">{{TestDataList.FOXO1}}</span>
                </div>
              </div>

              <!-- list7 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">CD58</span>
                  <span class="result-text yangxing" v-if="TestDataList.CD58 =='阳性'">{{TestDataList.CD58}}</span>
                  <span class="result-text" v-if="TestDataList.CD58 =='阴性'">{{TestDataList.CD58}}</span>
                </div>
                <div class="item">
                  <span class="result-key">NOTCH2</span>
                  <span class="result-text yangxing" v-if="TestDataList.NOTCH2 =='阳性'">{{TestDataList.NOTCH2}}</span>
                  <span class="result-text" v-if="TestDataList.NOTCH2 =='阴性'">{{TestDataList.NOTCH2}}</span>
                </div>
              </div>

              <!-- list8 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">MPEG1</span>
                  <span class="result-text yangxing" v-if="TestDataList.MPEG1 =='阳性'">{{TestDataList.MPEG1}}</span>
                  <span class="result-text" v-if="TestDataList.MPEG1 =='阴性'">{{TestDataList.MPEG1}}</span>
                </div>
                <div class="item">
                  <span class="result-key">CXCR4</span>
                  <span class="result-text yangxing" v-if="TestDataList.CXCR4 =='阳性'">{{TestDataList.CXCR4}}</span>
                  <span class="result-text" v-if="TestDataList.CXCR4 =='阴性'">{{TestDataList.CXCR4}}</span>
                </div>
              </div>

              <!-- list9 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">TBL1XR1</span>
                  <span class="result-text yangxing" v-if="TestDataList.TBL1XR1 =='阳性'">{{TestDataList.TBL1XR1}}</span>
                  <span class="result-text" v-if="TestDataList.TBL1XR1 =='阴性'">{{TestDataList.TBL1XR1}}</span>
                </div>
                <div class="item">
                  <span class="result-key">DTX1</span>
                  <span class="result-text yangxing" v-if="TestDataList.DTX1 =='阳性'">{{TestDataList.DTX1}}</span>
                  <span class="result-text" v-if="TestDataList.DTX1 =='阴性'">{{TestDataList.DTX1}}</span>
                </div>
              </div>

              <!-- list10 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">CD79B</span>
                  <span class="result-text yangxing" v-if="TestDataList.CD79B =='阳性'">{{TestDataList.CD79B}}</span>
                  <span class="result-text" v-if="TestDataList.CD79B =='阴性'">{{TestDataList.CD79B}}</span>
                </div>
                <div class="item">
                  <span class="result-key">MTOR</span>
                  <span class="result-text yangxing" v-if="TestDataList.MTOR =='阳性'">{{TestDataList.MTOR}}</span>
                  <span class="result-text" v-if="TestDataList.MTOR =='阴性'">{{TestDataList.MTOR}}</span>
                </div>
              </div>

              <!-- list11 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">HIST1H1E</span>
                  <span class="result-text yangxing" v-if="TestDataList.HIST1H1E =='阳性'">{{TestDataList.HIST1H1E}}</span>
                  <span class="result-text" v-if="TestDataList.HIST1H1E =='阴性'">{{TestDataList.HIST1H1E}}</span>
                </div>
                <div class="item">
                  <span class="result-key">TNFAIP3</span>
                  <span class="result-text yangxing" v-if="TestDataList.TNFAIP3 =='阳性'">{{TestDataList.TNFAIP3}}</span>
                  <span class="result-text" v-if="TestDataList.TNFAIP3 =='阴性'">{{TestDataList.TNFAIP3}}</span>
                </div>
              </div>

              <!-- list12 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">PIMI</span>
                  <span class="result-text yangxing" v-if="TestDataList.PIMI =='阳性'">{{TestDataList.PIMI}}</span>
                  <span class="result-text" v-if="TestDataList.PIMI =='阴性'">{{TestDataList.PIMI}}</span>
                </div>
                <div class="item">
                  <span class="result-key">CREBBP</span>
                  <span class="result-text yangxing" v-if="TestDataList.CREBBP =='阳性'">{{TestDataList.CREBBP}}</span>
                  <span class="result-text" v-if="TestDataList.CREBBP =='阴性'">{{TestDataList.CREBBP}}</span>
                </div>
              </div>

              <!-- list13 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">CARD11</span>
                  <span class="result-text yangxing" v-if="TestDataList.CARD11 =='阳性'">{{TestDataList.CARD11}}</span>
                  <span class="result-text" v-if="TestDataList.CARD11 =='阴性'">{{TestDataList.CARD11}}</span>
                </div>
                <div class="item">
                  <span class="result-key">EP300</span>
                  <span class="result-text yangxing" v-if="TestDataList.EP300 =='阳性'">{{TestDataList.EP300}}</span>
                  <span class="result-text" v-if="TestDataList.EP300 =='阴性'">{{TestDataList.EP300}}</span>
                </div>
              </div>

              <!-- list14 -->
              <div class="list">
                <div class="item">
                  <span class="result-key">KMT2C</span>
                  <span class="result-text yangxing" v-if="TestDataList.KMT2C =='阳性'">{{TestDataList.KMT2C}}</span>
                  <span class="result-text" v-if="TestDataList.KMT2C =='阴性'">{{TestDataList.KMT2C}}</span>
                </div>
                <div class="item">
                  <span class="result-key">KMT2D</span>
                  <span class="result-text yangxing" v-if="TestDataList.KMT2D =='阳性'">{{TestDataList.KMT2D}}</span>
                  <span class="result-text" v-if="TestDataList.KMT2D =='阴性'">{{TestDataList.KMT2D}}</span>
                </div>
              </div>

              <!-- list15 -->
              <div class="list" style="width: 54%;">
                <div class="item" >
                  <span class="result-key">SGK1</span>
                  <span class="result-text yangxing" v-if="TestDataList.SGK1 =='阳性'">{{TestDataList.SGK1}}</span>
                  <span class="result-text" v-if="TestDataList.SGK1 =='阴性'">{{TestDataList.SGK1}}</span>
                </div>
              </div>
            </div>

            <!-- 后续跟进 -->
            <div class="Information-report-box" @click="followUpShowChange()">
              <div class="pie-title">
                <div class="left">
                  <span class="ranking-select-icon"></span><span class="ranking-select-title">后续跟进</span>
                </div>
                <div class="right">
                  <img v-show="!followUpShow" class="Information-report-up" src="@/assets/img/addDetail/select.png"/>
                  <img v-show="followUpShow"  class="Information-report-up" src="@/assets/img/addDetail/upselect.png"/>
                </div>
              </div>
            </div>
            
            <!-- 后续跟进详情 -->
            <div class="isBTK-detail-box" v-show="followUpShow" >
              <div class="content-info-user-name" style="grid-template-columns: 35% 65%;">
                  <div class="left">
                      <span>分子分型结果</span>
                  </div>
                  <div class="right">
                      <div class="section">
                            <input disabled="true" v-model="TestDataList.result"  class="select-input" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>

              <!-- 是否BTK治疗 -->
              <!-- <div class="isBTK-box">
                <div class="left">
                  是否BTK治疗
                </div>
                <div class="right">
                <van-radio-group class="content-user-sex" v-model="followList.btk">
                    <van-radio name="1">是</van-radio>
                    <van-radio name="2">否</van-radio>
                </van-radio-group>
                </div>
              </div>  -->

              <!-- 治疗阶段 -->
              <div class="isBTK-box" v-if="followList.btk =='1'">
                <div class="left">
                  治疗阶段
                </div>
                <div class="right">
                    <van-radio-group class="content-user-sex" v-model="followList.stage">
                        <van-radio name="1">一线</van-radio>
                        <van-radio name="2">其他</van-radio>
                    </van-radio-group>
                </div>
              </div> 

              <!-- 开始治疗日期 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                <div class="left number-text">
                    <span>开始治疗日期</span>
                </div>
                <div class="right" @click="startTreatmentChange()">
                    <div class="section">
                        <input v-model="followList.start" placeholder="请选择开始治疗日期" disabled="true" class="select-input" type="text"/>
                        <img class="rili" src="@/assets/img/addDetail/icon-rili.png"/>
                    </div>
                </div>
              </div>
              
              <!-- 结束治疗日期 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                <div class="left number-text">
                    <span>结束治疗日期</span>
                </div>
                <div class="right" @click="endTreatmentChange()">
                    <div class="section">
                        <input v-model="followList.end" placeholder="请选择结束治疗日期" disabled="true" class="select-input" type="text"/>
                        <img class="rili" src="@/assets/img/addDetail/icon-rili.png"/>
                    </div>
                </div>
              </div>

              <!-- 治疗方案 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                <div class="left">
                    <span>治疗方案</span>
                </div>
                <div class="right">
                  <textarea value="" v-model="followList.plan" required="required" placeholder-class="input-placeholder" placeholder="请填写其他内容" name="" id="" cols="30" rows="10"></textarea>
                </div>
              </div>

              <!-- 开始用药日期 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                <div class="left number-text">
                    <span>开始用药日期</span>
                </div>
                <div class="right" @click="startMedicationChange()">
                    <div class="section">
                            <input disabled="true" placeholder="请选择开始用药日期" v-model="followList.medicate"  class="select-input" type="text"/>
                            <img class="rili" src="@/assets/img/addDetail/icon-rili.png"/>
                    </div>
                </div>
              </div>

              <!-- 完成周期数 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                  <div class="left number-text">
                      <span>完成周期数</span>
                  </div>
                  <div class="right">
                    <input class="select-input" v-model="followList.endcycle"  placeholder-class="placeholder-input" placeholder="请输入完成周期数" type="number" />
                  </div>
              </div>

              <!-- 有无疗效评价 -->
              <div class="isBTK-box" v-if="followList.btk =='1'">
                <div class="left">
                  有无疗效评价
                </div>
                <div class="right">
                    <van-radio-group class="content-user-sex" style="grid-template-columns: 33% 33% 33%;" v-model="followList.evaluate">
                        <van-radio name="1">有</van-radio>
                        <van-radio name="2">无</van-radio> 
                        <van-radio name="3">未知</van-radio>
                    </van-radio-group>
                </div>
              </div> 

              <!-- 其他内容 -->
              <div class="content-info-user-name" v-if="followList.btk =='1' && followList.evaluate =='3'">
                <div class="left">
                </div>
                <div class="right">
                  <textarea value="" v-model="evaluateTextarea" placeholder-class="input-placeholder" placeholder="请填写其他内容" name="" id="" cols="30" rows="10"></textarea>
                </div>
              </div>
              
              <!-- 本次无疗效评价 -->
              <div class="isBTK-box"  v-if="followList.btk =='1'">
                <div class="left">
                  本次无疗效评价
                </div>
                <div class="right">
                  <div class="radio-list">
                   <van-radio-group class="content-user-sex" style="grid-template-columns: 50% 50%;" v-model="followList.thisevaluate">
                        <van-radio name="1">完全缓解（CR）</van-radio>
                        <van-radio name="2">部分缓解（PR）</van-radio>
                    </van-radio-group>
                  </div>
                  <div class="radio-list">
                    <van-radio-group class="content-user-sex" style="grid-template-columns: 50% 50%;" v-model="followList.thisevaluate">
                        <van-radio name="3">稳定(SD)</van-radio>
                        <van-radio name="4">进展(PD)</van-radio>
                    </van-radio-group>
                  </div>
                  <div class="radio-list">
                    <van-radio-group class="content-user-sex" style="grid-template-columns: 50% 50%;" v-model="followList.thisevaluate">
                        <van-radio name="5">非CR非PD</van-radio>
                        <van-radio name="6">未知</van-radio>
                    </van-radio-group>
                  </div>
                </div>
              </div> 

              <!-- 其他内容 -->
              <div class="content-info-user-name" v-if="followList.btk =='1' && followList.thisevaluate == '6'">
                <div class="left">
                </div>
                <div class="right">
                  <textarea value="" v-model="thisevaluateTextarea" required="required" placeholder-class="input-placeholder" placeholder="请填写其他内容" name="" id="" cols="30" rows="10"></textarea>
                </div>
              </div>

              <!-- PFS时间 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                <div class="left number-text">
                    <span>PFS时间</span>
                </div>
                <div class="right">
                    <div class="section">
                      <input  type="datetime" placeholder-class="placeholder-input" v-model="followList.psf" placeholder="请输入PFS时间" class="select-input"/>
                    </div>
                </div>
              </div>

              <!-- 随访日期 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                <div class="left number-text">
                    <span>随访日期</span>
                </div>
                <div class="right" @click="followUpChange()">
                    <div class="section">
                        <input disabled="true" v-model="followList.follow" placeholder="请选择随访日期" class="select-input" type="text"/>
                        <img class="rili" src="@/assets/img/addDetail/icon-rili.png"/>
                    </div>
                </div>
              </div>

              <!-- 随访时状态 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                  <div class="left number-text">
                      <span>随访时状态</span>
                  </div>
                  <div class="right" @click="followStateChaneg()">
                      <div class="section">
                            <input disabled="true" v-model="followList.state" placeholder-class="placeholder-input" class="select-input" placeholder="请选择随访时状态" type="text"/>
                            <img src="@/assets/img/addDetail/select.png"/>
                      </div>
                  </div>
              </div>

              <!-- 脱落原因 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                <div class="left">
                    <span>脱落原因</span>
                </div>
                <div class="right">
                  <textarea bindblur="getReason" v-model="followList.reason" placeholder-class="input-placeholder" placeholder="请填写脱落原因" name="" id="" cols="30" rows="10"></textarea>
                </div>
              </div>

              <!-- 用药发票 -->
              <div class="content-info-user-name" v-if="followList.btk =='1'">
                <div class="left">
                    <span>用药发票</span>
                </div>
                <div class="right">
                  <img  class="tempFilePath-img" :src="followList.bill_img" v-show="followList.bill_img !=''"/>
                  <button @click="imgUploadChange()" class="upLoad" bindtap="imgUploadChange">+上传</button>
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

            <!-- 提交 -->
            <div class="submit-box">
              <button @click="addSubmit()" :disabled='isDisabled'>保存</button>
            </div>
        </div>
    </div>
    <vanPickerSelect  ref="PickerSelect" @onPickerConfirm="onPickerConfirm"  @func="getMsgFormSon"></vanPickerSelect>
    <vanDatePickerSelect ref="datePickerSelect" @onDatePickerConfirm="onDatePickerConfirm"  @DateFunc="getDateMsgFormSon"></vanDatePickerSelect>
</div>
</template>
<script>
import OSS from 'ali-oss';
import vanPickerSelect from '@/components/van-picker-select'
import vanDatePickerSelect from '@/components/van-date-picker-select'
import Vue from 'vue'
import { Dialog } from 'vant';
import wx from "weixin-js-sdk";
Vue.use(Dialog);
export default {
    name:'',
    data(){
        return{
            recordList:{},
            InspectionShow:false,
            InformationShow:false,
            followUpShow:true,
            dateSelectIndex:'1',
            TestDataList:{},
            followStatrArray: ['无瘤生存', '带瘤生存，肿瘤稳定', '生存，但疾病状态未知', '复发','远处转移','进展','失访','死亡','第二肿瘤','未随访到患者','治疗中','休疗间期','未知','其他'],
            followList:{
              id:0,
              openid:'',
              formid:'',
              btk:'1',//是否btk治疗
              stage:'1',//治疗阶段
              start:'',//开始治疗日期
              end:'',//结束治疗日期
              plan:'',//治疗方案
              medicate:'',//用药日期
              endcycle:'',//完成周期
              evaluate:'1',//评价
              thisevaluate:'1',//无疗效评价
              psf:'',//PFS时间
              follow:'',//随访日期
              state:'',//随访状态
              reason:'',//脱离原因
              bill_img:''//发票
            },
            evaluateTextarea:'',//有无疗效评价
            thisevaluateTextarea:'',//本次无疗效评价
            client:null,
            id:null,
            openid:'',
            isDisabled:false
        }
    },
    components:{
      'vanPickerSelect':vanPickerSelect,
      'vanDatePickerSelect':vanDatePickerSelect
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
        }else{
          this.openid = null;
        }
     
    },
    methods:{
        InformationShowChange(){
            this.InformationShow = !this.InformationShow;
        },
        InspectionShowChange(){
            this.InspectionShow = !this.InspectionShow;
        },
        followUpShowChange(){
            this.followUpShow = !this.followUpShow;
        },

        //根据ID查询单条消息
        GetDeceteInfoById(id){
            let that = this;
            that.axios.get('/api/NHL/GetDeceteInfoById',{
            params: {
                id:id,
            }
            }).then(function (res) {
                console.log(res.data);
                if(res.data.s){
                    console.log(111)
                    if(res.data.data && res.data.data !=''){
                        console.log(res.data.data)
                        if(!res.data.data.detectcode || res.data.data.detectcode == 'null'){
                            res.data.data.detectcode = '--'
                        };
                        if(res.data.data.sex  == "男"){
                          res.data.data.sex = '1'
                        }else{
                          res.data.data.sex = '2'
                        }
                        if(res.data.data.write){
                          res.data.data.write = that.timeStrChange(res.data.data.write*1); 
                        }else{
                          res.data.data.write = that.timeStrChange(res.data.data.u_time); 
                        }
                        switch (res.data.data.diseaseSubtype) {//疾病亚型
                            case 'H1L01':
                                    res.data.data.diseaseSubtype = 'B-ALL(急性B淋巴细胞白血病)'
                                break;
                            case 'H1L02':
                                    res.data.data.diseaseSubtype = 'T-ALL(急性T淋巴细胞白血病)'
                                break;
                            case 'H1L03':
                                    res.data.data.diseaseSubtype = 'AML(急性髓细胞白血病)'
                                break;
                            case 'H1L04':
                                    res.data.data.diseaseSubtype = 'APL(急性早幼粒白血病)'
                                break;
                            case 'H1L05':
                                    res.data.data.diseaseSubtype = 'MDS(骨髓增生异常综合征)'
                                break;
                            case 'H1L06':
                                    res.data.data.diseaseSubtype = 'MPN(骨髓增殖性肿瘤)'
                                break;
                            case 'H1L07':
                                    res.data.data.diseaseSubtype = 'CML(慢性粒细胞白血病)'
                                break;
                            case 'H1L08':
                                    res.data.data.diseaseSubtype = 'MDS/MPN(MDS伴MPN)'
                                break;
                            case 'H1L09':
                                    res.data.data.diseaseSubtype = '治疗相关AML(tAML)'
                                break;
                            case 'H1L10':
                                    res.data.data.diseaseSubtype = '家族易感髓系肿瘤'
                                break;
                            case 'H1L11':
                                    res.data.data.diseaseSubtype = 'AA(再生障碍性贫血)'
                                break;
                            case 'H1L12':
                                    res.data.data.diseaseSubtype = '白血病 其他'
                                break;
                            case 'H1L13':
                                    res.data.data.diseaseSubtype = '白血病 诊断不明'
                                break;
                            case 'H1S01':
                                    res.data.data.diseaseSubtype = '易栓症'
                                break;
                            case 'H1B01':
                                    res.data.data.diseaseSubtype = 'DLBCL(弥漫大B细胞淋巴瘤)'
                                break;
                            case 'H1B02':
                                    res.data.data.diseaseSubtype = 'FL(滤泡淋巴瘤)'
                                break;
                            case 'H1B03':
                                    res.data.data.diseaseSubtype = 'MCL(套细胞淋巴瘤)'
                                break;
                            case 'H1B04':
                                    res.data.data.diseaseSubtype = 'CLL/SLL(慢性淋巴细胞白血病/小细胞淋巴瘤)'
                                break;
                            case 'H1B05':
                                    res.data.data.diseaseSubtype = 'LPL/WM(淋巴浆细胞淋巴瘤/华氏巨球蛋白血症)'
                                break;
                            case 'H1B06':
                                    res.data.data.diseaseSubtype = 'B细胞淋巴瘤 其他'
                                break;
                            case 'H1B07':
                                    res.data.data.diseaseSubtype = 'B细胞淋巴瘤 诊断不明'
                                break;
                            case 'H1T01':
                                    res.data.data.diseaseSubtype = 'AITL(血管免疫母细胞T细胞淋巴瘤)'
                                break;
                            case 'H1T02':
                                    res.data.data.diseaseSubtype = 'ALCL(间变大细胞淋巴瘤)'
                                break;
                            case 'H1T03':
                                    res.data.data.diseaseSubtype = 'PTCL-NOS(外周T细胞淋巴瘤非特指)'
                                break;
                            case 'H1T04':
                                    res.data.data.diseaseSubtype = 'NK/T细胞淋巴瘤(NK/T-CL)'
                                break;
                            case 'H1T05':
                                    res.data.data.diseaseSubtype = 'T细胞淋巴瘤 其他'
                                break;
                            case 'H1T06':
                                    res.data.data.diseaseSubtype = 'T细胞淋巴瘤 诊断不明'
                                break;
                            case 'H1G01':
                                    res.data.data.diseaseSubtype = '多发性骨髓瘤(MM)'
                                break;
                            case 'H2H01':
                                    res.data.data.diseaseSubtype = '噬血细胞综合征'
                                break;
                            default:
                                break;
                        };
                        if(res.data.data.ldh == '阳性'){//LDH(乳酸脱氢酶)
                            res.data.data.ldh='+';
                        }else if(res.data.data.ldh == '阴性'){
                            res.data.data.ldh='-';
                        };
                        if(res.data.data.myc == '阳性'){//MYC表达
                            res.data.data.myc='+';
                        }else if(res.data.data.myc == '阴性'){
                            res.data.data.myc='-';
                        };
                        if(res.data.data.bcl2 == '阳性'){//BCL2
                            res.data.data.bcl2='+';
                        }else if(res.data.data.bcl2 == '阴性'){
                            res.data.data.bcl2='-';
                        };
                        that.recordList =  res.data.data;
                        if(res.data.data.formid && res.data.data.formid !=''){
                          that.followList.formid = res.data.data.formid;
                          that.getDdetectByFromid(res.data.data.formid);
                          that.getFollowByFromid(res.data.data.formid);
                        }
                    }
                }
            })
        },

        //根据formid查询检测信息
        getDdetectByFromid(formid){
           let that = this;
            that.axios.get('/api/NHL/GetDetectByFromId',{
            params: {
              formid:formid,
            }
            }).then(function (res) {
              console.log(res.data);
              if(res.data.s){
                console.log(res.data.data)
                  if(res.data.data && res.data.data.length>0){
                    console.log(res.data.data);
                    that.TestDataList = res.data.data[0];
                    console.log(that.TestDataList);
                  }else{
                    that.TestDataList = {};
                  }
              }
          })
        },

        //根据formid查询跟进信息
        getFollowByFromid(formid){
           let that = this;
            that.axios.get('/api/NHL/GetFollowByFormId',{
            params: {
              formid:formid,
            }
            }).then(function (res) {
              console.log(res.data);
              if(res.data.s){
                console.log(res.data.data)
                  if(res.data.data && res.data.data.length>0){
                    console.log(res.data.data[0]);
                    that.followList = res.data.data[0];
                    let evaluate = JSON.parse(res.data.data[0].evaluate);
                    if(evaluate.key){
                      that.followList.evaluate = evaluate.key;
                      that.evaluateTextarea = evaluate.value;
                    };
                    let thisevaluate = JSON.parse(res.data.data[0].thisevaluate);
                    if(thisevaluate.key){
                      that.followList.thisevaluate = thisevaluate.key;
                      that.thisevaluateTextarea = thisevaluate.value;
                    }
                    that.followList.id = res.data.data[0].Id;
                    console.log(that.followList);

                  }else{
                    that.followList.id = 0;
                  }
              }
          })
        },
        //随访状态选择
        followStateChaneg(){
          this.$refs.PickerSelect.onPickerConfirm(this.followStatrArray);
        },

         //状态选择传值
        onPickerConfirm(res){
          console.log(111)
          tihs.$emit(res);
        },

        //状态选择取值
        getMsgFormSon(data){
          console.log(data);
          this.followList.state = data;
        },

        //开始治疗日期选择
        startTreatmentChange(){
          this.$refs.datePickerSelect.onDatePickerConfirm();
          this.dateSelectIndex = '1';
        },

        //结束治疗日期选择
        endTreatmentChange(){
          this.$refs.datePickerSelect.onDatePickerConfirm();
          this.dateSelectIndex = '2';
        },

        //开始用药日期选择
        startMedicationChange(){
          this.$refs.datePickerSelect.onDatePickerConfirm();
          this.dateSelectIndex = '3';
        },

        //随访日期选择
        followUpChange(){
          this.$refs.datePickerSelect.onDatePickerConfirm();
          this.dateSelectIndex = '4';
        },
        
        //日期选择传值
        onDatePickerConfirm(res){
          console.log(res)
          tihs.$emit();
        },

        //日期选择取值
        getDateMsgFormSon(data){
          console.log(data);
          let that  = this;
          switch (that.dateSelectIndex) {
              case '1':
                  that.followList.start = data;
                  break;
              case '2':
                  that.followList.end = data;
                  break;
              case '3':
                  that.followList.medicate = data;
                  break;
              case '4':
                  that.followList.follow = data;
                  break;
              default:
                  break;
          }
        },


        //上传用药发票
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
                          _this.followList.bill_img =  httpUrl+fileName;
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

        //提交
        addSubmit(){
          if(this.followList.btk =='1'){
            if(this.followList.start ==''){
              Dialog.alert({
                  title: '提示',
                  message: '请选择开始治疗日期',
                  }).then(() => {
                  // on close

              });
            }
            // else if(this.followList.end ==''){
            //     Dialog.alert({
            //         title: '提示',
            //         message: '请选择结束治疗日期',
            //         }).then(() => {
            //         // on close

            //     });
            // }
            // else if(this.followList.plan ==''){
            //     Dialog.alert({
            //         title: '提示',
            //         message: '请输入治疗方案',
            //         }).then(() => {
            //         // on close

            //     });
            // }
            else if(this.followList.medicate ==''){
                Dialog.alert({
                    title: '提示',
                    message: '请选择开始用药日期',
                    }).then(() => {
                    // on close

                });
            }
            // else if(this.followList.endcycle == ''){
            //     Dialog.alert({
            //         title: '提示',
            //         message: '请输入完成周期数',
            //         }).then(() => {
            //         // on close

            //     });
            // }
            // else if(this.followList.psf ==''){
            //     Dialog.alert({
            //         title: '提示',
            //         message: '请输入PSF时间',
            //         }).then(() => {
            //         // on close

            //     });
            // }
            // else if(this.followList.follow ==''){
            //     Dialog.alert({
            //         title: '提示',
            //         message: '请选择随访日期',
            //         }).then(() => {
            //         // on close

            //     });
            // }
            // else if(this.followList.state == ''){
            //     Dialog.alert({
            //         title: '提示',
            //         message: '请选择随访状态',
            //         }).then(() => {
            //         // on close
            //     });
            // }
            // else if(this.followList.reason == ''){
            //     Dialog.alert({
            //         title: '提示',
            //         message: '请输入脱落原因',
            //         }).then(() => {
            //         // on close
            //     });
            // }
            // else if(this.followList.bill_img == ''){
            //     Dialog.alert({
            //       title: '提示',
            //       message: '请上传发票',
            //       }).then(() => {
            //       // on close
            //   });
            // }
            else{
              let that = this;
              if(that.followList.evaluate == '3'){
                that.followList.evaluate = JSON.stringify({'key':'3',value:that.evaluateTextarea})
              };
              if(that.followList.thisevaluate == '6'){
                that.followList.thisevaluate = JSON.stringify({'key':'6',value:that.thisevaluateTextarea})
              };
              let promise = { 
                'id':that.followList.id,//新增
                'openid':that.openid,//openid
                'formid':that.followList.formid,//填报人
                'btk':that.followList.btk,//是否btk治疗
                'stage':that.followList.stage,//治疗阶段
                'start':that.followList.start,//开始治疗日期
                'end':that.followList.end,//结束治疗日期
                'plan':that.followList.plan,//治疗方案
                'medicate':that.followList.medicate,//用药日期
                'endcycle':that.followList.endcycle*1,//完成周期数
                'evaluate':that.followList.evaluate,//有无疗效评价
                'thisevaluate':that.followList.thisevaluate,//本次无疗效评价
                'psf':that.followList.psf,//PSF时间
                'follow':that.followList.follow,//随访日期
                'state':that.followList.state,//随访状态
                'reason':that.followList.reason,//脱离原因
                'bill_img':that.followList.bill_img,//发票
              };
              that.isDisabled = true;
              setTimeout(() => {
                that.isDisabled = false;
              }, 5000);
              that.axios.post('/api/NHL/UpdateFollow', promise)
              .then(function (res) {
                  console.log(res);
                if(res.data.s){
                    Dialog.alert({
                        title: '提示',
                        message: '提交成功',
                        }).then(() => {
                        wx.miniProgram.switchTab({
                    　　　　url: '/pages/msgList/index',
                    　　});
                    });
                }else{
                    Dialog.alert({
                        title: '提示',
                          message: res.data.msg,
                        }).then(() => {
                        // on close

                    });
                }
              });
            }
          }else{
              let that = this;
              if(that.followList.evaluate == '3'){
                that.followList.evaluate = JSON.stringify({'key':'3',value:that.evaluateTextarea})
              };
              if(that.followList.thisevaluate == '6'){
                that.followList.thisevaluate = JSON.stringify({'key':'6',value:that.thisevaluateTextarea})
              };
              let promise = { 
                'id':that.followList.id,//新增
                'openid':that.openid,//openid
                'formid':that.followList.formid,//填报人
                'btk':that.followList.btk,//是否btk治疗
                'stage':that.followList.stage,//治疗阶段
                'start':that.followList.start,//开始治疗日期
                'end':that.followList.end,//结束治疗日期
                'plan':that.followList.plan,//治疗方案
                'medicate':that.followList.medicate,//用药日期
                'endcycle':that.followList.endcycle*1,//完成周期数
                'evaluate':that.followList.evaluate,//有无疗效评价
                'thisevaluate':that.followList.thisevaluate,//本次无疗效评价
                'psf':that.followList.psf,//PSF时间
                'follow':that.followList.follow,//随访日期
                'state':that.followList.state,//随访状态
                'reason':that.followList.reason,//脱离原因
                'bill_img':that.followList.bill_img,//发票
              };
              that.isDisabled = true;
              setTimeout(() => {
                that.isDisabled = false;
              }, 5000);
              that.axios.post('/api/NHL/UpdateFollow', promise)
              .then(function (res) {
                  console.log(res);
                if(res.data.s){
                    Dialog.alert({
                        title: '提示',
                        message: '提交成功',
                        }).then(() => {
                        wx.miniProgram.switchTab({
                          url: '/pages/msgList/index',
                        });
                    });
                }else{
                    Dialog.alert({
                        title: '提示',
                          message: res.data.msg,
                        }).then(() => {
                        // on close

                    });
                }
              });
            }
        },

    }
}
</script>
<style scoped>
/* pages/recordDetail/index.wxss */
/* pages/addDetail/index.wxss */
.addDetail-Page{
  width: 100%;
  height: 100%;
  background: #fff;
}
.header-box{
  width: 100%;
  height: auto;
  position: relative;
  background: #f4ffff;
}
.header-box image{
  width: 100%;
  height: 286px;
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
.header-title image{
  width: 18px;
  height: 30px;
  margin-right: 30px;
  z-index: 9;
}
.header-number{
  width: 702px;
  height: 90px;
  margin: 0 auto;
  border-radius: 10px 10px 0px 0px; 
  font-size: 32px;
  font-family: PingFang, PingFang-SC-Bold;
  font-weight: 700;
  text-align: left;
  color: #333333;
  letter-spacing: -0.64px;
  padding-left: 31px;
  padding-top: 15px;
  box-sizing: border-box;
}

/*content-box*/
.content-box{
  background: #fff;
  width: 100%;
  line-height:74.5px;
}
.content-name-date{
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  background: #fff;
}
.content-name-date div{
  font-size: 28px;
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
  grid-template-columns: 250px 500px;
  padding-top: 25px;
  box-sizing: border-box;
}
.content-info-user-name .left{
  font-size: 28px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: SC-Medium;
  text-align: left;
  color: #333333;
  padding-left: 48px;
  box-sizing: border-box;
}
.content-info-user-name .left text{
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
    border: 1px solid #eeeeee;
    border-radius: 6px;
    font-size: 24px;
    color: #333;
    padding-left: 24px;
    outline-color: #2fc0c5;
    background: #fff;
}
.content-info-user-name .right  input[disabled]{
    background:transparent;
    opacity:1;
    color:black;
}
.content-info-user-name .right .upLoad{
  padding: 21px 28px;
  box-sizing: border-box;
  width: 140px;
  height: 66px;
  line-height: 1;
  background: #2fc0c5;
  border: 1px solid #2fc0c5;
  border-radius: 6px;
  font-size: 26px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: 300;
  text-align:center;
  color: #ffffff;
  float: right;
  margin-right: 6vw;
}
.content-user-sex{
  width: 100%;
  background: #fff;
  display: grid;
  grid-template-columns: 35% 65%;
  margin-top: 3vw;
}
.content-user-sex .left{
  font-size: 28px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: SC-Medium;
  text-align: left;
  color: #333333;
  letter-spacing: -0.56px;
  padding-left: 48px;
  box-sizing: border-box;
}
.content-user-sex .right{
  font-size: 28px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: SC-Medium;
  text-align: left;
  color: #333333;
  letter-spacing: -0.56px;
}
.content-info-user-name .right .section{
    position: relative;
}
.content-info-user-name .right .section img{
    width: 23px;
    position: absolute;
    right:73px;
    top:30px;
}
.content-info-user-name .right .section .rili{
  width: 37px;
  position: absolute;
  right:73px;
  top:20px;
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
  left: 1px;
  top: 1px;
  border-radius: 100%;
}
.content-user-sex .right text:nth-of-type(2){
  margin-right: 105px;
}
.content-user-sex .right text{
  float: left;
}
.content-info-user-name .right{
  position: relative;
}
.content-info-user-name .right .picker image{
  width: 23px;
  height: 13px;
  position: absolute;
  right:73px;
  top:30px;
}
.content-info-user-name .right .picker .rili{
  width: 37px;
  height: 37px;
  position: absolute;
  right:73px;
  top:20px;
}
.content-info-user-name textarea{
  width: 400px;
  height: 152px;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  font-size: 24px;
  color: #333;
  padding: 5px 10px;
  box-sizing: border-box;
}
.input-placeholder{
  padding-top: 5px;
  box-sizing: border-box;
  color: #999;
}
/* Information-report-box */
.Information-report-box{  
  width: 100%;
  background: #fff;
  margin-top: 54px;
}
.Information-report-box .pie-title{
  padding-left:48px;
  padding-right: 30px;
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
}
.Information-report-box .pie-title .right{
  text-align: right;
  padding-right: 40px;
  box-sizing: border-box;
}
.Information-report-box .Information-report-up{
  width: 23px;
  height: 13px;
}
.ranking-select-icon{
  width: 6px;
  height: 30px;
  background: #2fc0c5;
  margin-right: 11px;
  margin-top: 26px;
  float: left;
}
.ranking-select-title{
  font-size: 32px;
  font-family: PingFang, PingFang-SC-Bold;
  font-weight: 600;
  text-align: left;
  color: #333333;
  letter-spacing: -0.64px;
  float: left;
}

/* isBTK-box */
.isBTK-box{
  width: 100%;
  display: grid;
  padding-left: 48px;
  box-sizing: border-box;
  grid-template-columns: 30% 70%;
  margin-top: 40px;
}
.isBTK-box .left{
  font-size: 28px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: SC-Medium;
  text-align: left;
  color: #333333;
  letter-spacing: -0.56px
}

.isBTK-box .right{
  font-size: 28px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: SC-Medium;
  text-align: left;
  color: #333333;
  letter-spacing: -0.56px;
  margin-left: 5%;
}
.isBTK-box  .right .radio{
  width: 20px;
  height: 20px; 
  display: block;  
  float: left;
  margin-top: 25px;
  margin-right: 25px;
  border-radius: 100%;
  border: 5px solid #999999;
}
.isBTK-box  .right .active{
  border: 5px solid #2FC0C5;
}
.isBTK-box .right text:nth-of-type(2){
  margin-right: 105px;
}
.isBTK-box  .right text{
  float: left;
}

.isBTK-box .radio-list view{
  flex: auto;
  width: 164px;
}
.isBTK-box .radio-list .radio{
  margin-right: 10px;
}
.isBTK-box .right .radio-list text:nth-of-type(2){
  margin-right: 0px;
}

/* submit-box */
.submit-box{
  width: 100%;
  margin-top: 73px;
  margin-bottom: 180px;
}
.submit-box button{
  padding: 0;
  width: 297px;
  height: 78px;
  background: #2fc0c5;
  border-radius: 39px;
  line-height: 78px;
  font-size: 30px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: SC-Medium;
  text-align: center;
  color: #ffffff;
  letter-spacing: -0.6px;
  border: none;
  margin-bottom: 10vh;
}
.Information-report-detail-box{
  width: 100%;
}
/* select-result-box */
.select-result-box{
  width: 100%;
  background: #fff;
  margin-bottom: 80px;
}
.select-result-box .list{
  width: 100%;
  margin-top: 20px;
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
}
.select-result-box .list .item{
  flex: 1;
  text-align: center;
  background: #f6f6f6;
  border-radius: 6px;
  margin: 20px;
}
.select-result-box .result-key{
  font-size: 28px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: SC-Medium;
  text-align: left;
  color: #333333;
  letter-spacing: -0.56px;
  margin-right: 36px;
}
.select-result-box .result-text{
  font-size: 28px;
  font-family: PingFang, PingFang-SC-Medium;
  font-weight: SC-Medium;
  text-align: left;
  color: #2fc0c5;
  letter-spacing: -0.56px;
}
.select-result-box .list .item .yangxing{
  color: #ff8080;
}
.addDetail-Page .content-info-user-name .right .section .agree_img{
    width: 20vw;
    height: 5vh;
    position: absolute;
    left: 7vw;
    top: 0;
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
.content-user-sex-box .van-radio__label{
    font-size: 28px;
    margin-left: 3px !important;
    width: 18vw;
    height: 4vw;
    line-height: 4vw;
    background: transparent;
    display: block;
    padding-left: 5vw;
    margin-left: -4vw !important;
    z-index: 10;
    padding-top: 0.5vw;
}
.isBTK-box .radio-list  .van-radio__label{
    font-size: 24px !important;
    margin-left: 1px;
}

.van-switch--disabled{
  opacity: 1 !important;
}
</style>