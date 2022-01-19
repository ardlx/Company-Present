<template>
<v-container>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <v-card height="100%" width="100%">
      <v-app-bar color="primary" clipped-left dense dark app fixed>
        <v-toolbar-title class="h2">
          <span class="h4 font-weight-black">COMPANY PRESENT CLAIMS</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="text-center ml-16">
          <v-menu transition="scale-transition" offset-y open-on-hover rounded>
            <template v-slot:activator="{ on, attrs }">
              
              <v-btn dark v-bind="attrs" v-on="on" outlined>
                MENU
                <v-icon class="ml-6">mdi-menu-open</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" link>
                <v-list-item-content >
                  <center>
                    <v-list-item-title><v-btn dense @click="selectOption(item.title)" :color="item.color">{{ item.title }} <v-icon :class="item.margin">{{item.icon}}</v-icon></v-btn></v-list-item-title>
                  </center>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>
    </v-card>
    <v-btn v-shortkey="['f9']" @shortkey="openManualDialog()" style="display:none" v-if="selectedCategory != null"></v-btn>
    
    <v-card max-height="100%" max-width="100%" color="#E0E0E0" flat>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#C2CAD0" height="103px" class="mx-auto" flat>
              <v-simple-table>
                <template class="mt-2">
                  <thead>
                    <tr>
                      <th class="pa-0">
                        <v-card class="text-center ma-2 mx-auto" color="#43A047" dark width="120px" height="80px" rounded="b" outlined flat>
                            <p class="button font-weight-black">
                                TOTAL
                            </p>
                            <p class="display-1 font-weight-black">
                                {{total_empl_count.length}}
                            </p>
                        </v-card>
                      </th>
                      <th class="pa-0">
                        <v-card class=" text-center ma-2 mx-auto" color="#FF5722" dark width="120px" height="80px" rounded="b" outlined flat
                        >
                            <p class="button font-weight-black rounded-lg">
                                UNCLAIMED
                            </p>
                            <p class="display-1 font-weight-black">
                                <!-- {{total_empl_unclm}} -->
                                {{total_unclaimed}}
                            </p>
                        </v-card>
                      </th>
                      <th class="pa-0">
                        <v-card class=" text-center ma-2 mx-auto" color="warning" dark width="120px" height="80px" rounded="b" outlined flat>
                            <p class="button font-weight-black rounded-lg">
                                CLAIMED
                            </p>
                            <p class="display-1 font-weight-black">
                                {{total_empl_clmed.length}}
                            </p>
                        </v-card>
                      </th>
                      <th colspan="12">
                        <v-row no-gutters>
                          <v-col xs="12" sm="12" md="6" lg="4">
                            <v-card class="pa-2 mt-7 select_cat" outlined height="40px">
                              <center>
                                <span style="font-size: 15px">SELECT CATEGORY :</span>
                              </center>
                            </v-card>
                          </v-col>
                          <v-col xs="12" sm="12" md="6" lg="8">
                            <v-autocomplete class="mt-7 ml-3" dense outlined solo :items="itemCategories" item-text="CATEGORYNAME" v-model="selectedCategory" clearable return-object @click="CategoryClick()" @change="CategoryChange()"></v-autocomplete>
                          </v-col>
                        </v-row>
                      </th>
                    </tr>
                  </thead>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>

          <v-col cols="12" v-if="selectedCategory">
            <v-card flat color="grey lighten-2" height="1px">
              <v-text-field ref="barcode" autofocus dense hide-details v-model="emplBrcdeID"  class="txtfield" clear clearable></v-text-field>
            </v-card>
            <v-simple-table>
              <thead>
                <tr>
                  <th>
                    <v-card color="#FFFBE6" height="625px" class="mt-4 mb-4" flat>
                      <v-form>
                        <v-simple-table class="mt-2">
                          <thead>
                            <tr>
                              <th>
                                <v-row no-gutters>
                                  <v-col cols="12" sm="2">
                                    <v-card height="178" width="195" class="mt-3" color="#C2CAD0" flat>
                                      <center>
                                        <v-avatar tile size="170" class="mt-1">
                                          <img :src="`${emply_infrmtn.AVATAR}`"/>
                                        </v-avatar> 
                                      </center>
                                    </v-card>
                                  </v-col>
                                  <v-col cols="12" sm="10">
                                    <v-simple-table class="main_table ma-2" style="width:100%">
                                      <template class="mt-3">
                                        <thead>
                                          <tr>
                                            <th colspan="12">
                                              <v-row no-gutters>
                                                <v-col xs="12" sm="4">
                                                  <v-card class="mb-2 mt-2 mr-2 mx-auto" outlined tile height="43px" flat color="#1565C0" >
                                                    <v-card outlined tile height="35px"  flat  dark color="#1E88E5" >
                                                      <center>
                                                        <span class="display-1 mb-2 font-weight-black mx-auto"> {{emply_infrmtn.EMPLCODE}} </span>
                                                      </center>
                                                    </v-card>
                                                  </v-card>
                                                </v-col>
                                                <v-col xs="12" sm="8">
                                                  <v-card class="mb-2 mt-2 mx-auto" outlined tile height="43px" flat color="#1565C0" >
                                                    <v-card outlined tile height="35px"  flat  dark color="#1E88E5" >
                                                      <center>
                                                        <span class="display-1 mb-2 font-weight-black mx-auto">{{slctdCtgryNme}}</span>
                                                      </center>
                                                    </v-card>
                                                  </v-card>
                                                </v-col>
                                              </v-row>

                                              <v-row no-gutters>
                                                <v-col xs="12" sm="12" md="12" lg="12">
                                                  <v-card class="mb-2" outlined tile height="95%" flat color="#C62828" >
                                                    <v-card class="mb-2 mx-auto" outlined tile height="112px" flat color="#EF5350" >
                                                      <center>
                                                        <v-simple-table style="width:100%" class="personal_infoTbl mt-1">
                                                          <tr>
                                                            <th colspan="2">PERSONAL INFORMATION</th>
                                                            <th colspan="2">DESIGNATION DETAILS</th>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              <div style="color: black">{{'FULL NAME:'}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{emply_infrmtn.EMPNAME}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{'DEPARTMENT:'}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{emply_infrmtn.DEPTNAME}}</div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              <div style="color: black">{{'STATUS:'}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{emply_infrmtn.STATUS}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{'SECTION:'}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{emply_infrmtn.SECTNAME}}</div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              <div style="color: black">{{'DATED:'}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{emply_infrmtn.CLAIMDATE}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{'TEAM'}}</div>
                                                            </td>
                                                            <td>
                                                              <div style="color: black">{{emply_infrmtn.TEAMNAME}}</div>
                                                            </td>
                                                          </tr>
                                                        </v-simple-table>
                                                      </center>
                                                    </v-card>
                                                  </v-card>
                                                </v-col>
                                              </v-row>
                                            </th>
                                          </tr>
                                        </thead>
                                      </template>
                                    </v-simple-table>
                                  </v-col>
                                </v-row>
                              </th>
                            </tr>
                          </thead>
                        </v-simple-table>
                      </v-form>
                      
                      <v-form class="mt-2">
                        <v-card>
                          <v-simple-table class="view_EmplDataTbl" dense flat>
                            <thead>
                              <tr>
                                <th>Employee<br>Code</th>
                                <th>Employee<br>Name</th>
                                <th>Department<br>Name</th>
                                <th>Section<br>Name</th>
                                <th>Team<br>Name</th>
                                <th>Dated</th>
                                <th>Category</th>
                                <th>Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item, index in pagination_tbl" :key="index">
                                <td>{{item.EMPLCODE}}</td>
                                <td>{{item.EMPNAME}}</td>
                                <td>{{item.DEPTDESC}}</td>
                                <td>{{item.SECTIONDESC}}</td>
                                <td>{{item.TEAMDESC}}</td>
                                <td>{{item.CLAIMDATE.substr(0,10)}}</td>
                                <td>{{item.CATEGORYNAME}}</td>
                                <td>{{item.REMARKS}}</td>
                              </tr>
                            </tbody>
                            
                          </v-simple-table>
                          <v-card v-if="empAlrdyClmdList.length == 0" max-height="100%" color="grey lighten-2" class="ma-1" flat tile>
                            <v-img class="mx-auto" height="70px" width="50px" :src="imgURL"></v-img>
                            <center><span>NO DATA AVAILABLE</span></center>
                          </v-card> 
                        </v-card>
                      </v-form>

                      <v-form>
                        <v-simple-table class="mt-3 pictures_tbl" style="width:100%">
                          <tbody>
                            <tr>
                              <th>
                                <template v-if="empl_avtr_pics[1] != undefined">
                                  <center><span class="display-1 font-weight-bold mx-auto" style="color:#1A237E"> {{empl_avtr_pics[1].emplcode}} </span></center>
                                </template>
                                <template v-else>
                                  <center><span class="display-1 font-weight-bold mx-auto"> No ID </span></center>
                                </template>
                                <v-row align="center" justify="center" dense no-gutters>
                                  <v-card height="148" width="148" class="mb-3" color="#424242" flat>
                                    <center>
                                      <v-avatar tile size="140" class="mt-1">
                                        <template v-if="empl_avtr_pics[1] != undefined">
                                          <img :src="`${empl_avtr_pics[1].avatar}`"/>
                                        </template>
                                        <template v-else>
                                          <img :src="`NoPic.png`"/>
                                        </template>
                                      </v-avatar> 
                                    </center>
                                  </v-card>
                                </v-row>
                              </th>
                              <th>
                                <template v-if="empl_avtr_pics[2] != undefined">
                                  <center><span class="display-1 font-weight-bold mx-auto" style="color:#1A237E"> {{empl_avtr_pics[2].emplcode}} </span></center>
                                </template>
                                <template v-else>
                                  <center><span class="display-1 font-weight-bold mx-auto"> No ID </span></center>
                                </template>
                                <v-row align="center" justify="center" dense no-gutters>
                                  <v-card height="148" width="148" class="mb-3" color="#424242" flat>
                                    <center>
                                      <v-avatar tile size="140" class="mt-1">
                                        <template v-if="empl_avtr_pics[2] != undefined">
                                          <img :src="`${empl_avtr_pics[2].avatar}`"/>
                                        </template>
                                        <template v-else>
                                          <img :src="`NoPic.png`"/>
                                        </template>
                                      </v-avatar>
                                    </center>
                                  </v-card>
                                </v-row>
                              </th>
                              <th>
                                <template v-if="empl_avtr_pics[3] != undefined">
                                  <center><span class="display-1 font-weight-bold mx-auto" style="color:#1A237E"> {{empl_avtr_pics[3].emplcode}} </span></center>
                                </template>
                                <template v-else>
                                  <center><span class="display-1 font-weight-bold mx-auto"> No ID </span></center>
                                </template>
                                <v-row align="center" justify="center" dense no-gutters>
                                  <v-card height="148" width="148" class="mb-3" color="#424242" flat>
                                    <center>
                                      <v-avatar tile size="140" class="mt-1">
                                        <template v-if="empl_avtr_pics[3] != undefined">
                                          <img :src="`${empl_avtr_pics[3].avatar}`"/>
                                        </template>
                                        <template v-else>
                                          <img :src="`NoPic.png`"/>
                                        </template>
                                      </v-avatar> 
                                    </center>
                                  </v-card>
                                </v-row>
                              </th>
                              <th>
                                <template v-if="empl_avtr_pics[4] != undefined">
                                  <center><span class="display-1 font-weight-bold mx-auto" style="color:#1A237E"> {{empl_avtr_pics[4].emplcode}} </span></center>
                                </template>
                                <template v-else>
                                  <center><span class="display-1 font-weight-bold mx-auto"> No ID </span></center>
                                </template>
                                <v-row align="center" justify="center" dense no-gutters>
                                  <v-card height="148" width="148" class="mb-3" color="#424242" flat>
                                    <center>
                                      <v-avatar tile size="140" class="mt-1">
                                        <template v-if="empl_avtr_pics[4] != undefined">
                                          <img :src="`${empl_avtr_pics[4].avatar}`"/>
                                        </template>
                                        <template v-else>
                                          <img :src="`NoPic.png`"/>
                                        </template>
                                      </v-avatar> 
                                    </center>
                                  </v-card>
                                </v-row>
                              </th>
                              <th>
                                <template v-if="empl_avtr_pics[5] != undefined">
                                  <center><span class="display-1 font-weight-bold mx-auto" style="color:#1A237E"> {{empl_avtr_pics[5].emplcode}} </span></center>
                                </template>
                                <template v-else>
                                  <center><span class="display-1 font-weight-bold mx-auto"> No ID </span></center>
                                </template>
                                <v-row align="center" justify="center" dense no-gutters>
                                  <v-card height="148" width="148" class="mb-3" color="#424242" flat>
                                    <center>
                                      <v-avatar tile size="140" class="mt-1">
                                        <template v-if="empl_avtr_pics[5] != undefined">
                                          <img :src="`${empl_avtr_pics[5].avatar}`"/>
                                        </template>
                                        <template v-else>
                                          <img :src="`NoPic.png`"/>
                                        </template>
                                      </v-avatar> 
                                    </center>
                                  </v-card>
                                </v-row>
                              </th>
                              <th>
                                <template v-if="empl_avtr_pics[6] != undefined">
                                  <center><span class="display-1 font-weight-bold mx-auto" style="color:#1A237E"> {{empl_avtr_pics[6].emplcode}} </span></center>
                                </template>
                                <template v-else>
                                  <center><span class="display-1 font-weight-bold mx-auto"> No ID </span></center>
                                </template>
                                <v-row align="center" justify="center" dense no-gutters>
                                  <v-card height="148" width="148" class="mb-3" color="#424242" flat>
                                    <center>
                                      <v-avatar tile size="140" class="mt-1">
                                        <template v-if="empl_avtr_pics[6] != undefined">
                                          <img :src="`${empl_avtr_pics[6].avatar}`"/>
                                        </template>
                                        <template v-else>
                                          <img :src="`NoPic.png`"/>
                                        </template>
                                      </v-avatar> 
                                    </center>
                                  </v-card>
                                </v-row>
                              </th>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-form>
                    </v-card>
                  </th>
                </tr>
              </thead>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <manual-insert-dialog :manualDialog="manualDialog" @close="closeManualEncoding" :selectedCategory="selectedCategory" @reload_emplist="reload_claims"/>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import manualInsertDialog from './manualInsert.vue'
export default {
  directives: { focus },
  components : {
    'manual-insert-dialog' : manualInsertDialog
  },
  data: ()=>{
    return{
      page_count      : 1,
      page_length     : 0,
      page_rows       : 5,
      total_empl_unclm: 0,
      group           : null,
      selectedCategory: null,
      slctdCtgryNme   : null,
      slctdCtgryCde   : null,
      emplBrcdeID     : null,
      ctgrycde        : null,
      isHidden        : false,
      navDrawer       : false,
      openCategory    : false,
      swipingTable    : false,
      manualDialog    : false,
      isFocus         : false,
      overlay         : false,
      timeOut         : undefined,
      emply_infrmtn   : {},
      empl_avtr_pics  : [],
      empAlrdyClmdList: [],
      itemCategories  : [],
      total_empl_clmed: [],
      total_empl_count: [],
      tmporary_emp_arr: [],
      items: [
        { title: 'Maintenance', icon: 'mdi-cogs', color: 'success', margin: 'ml-0'},
        { title: 'Sign-Out   ', icon: 'mdi-logout-variant', color: 'warning', margin: 'ml-10'},
      ],
      imgURL: require(`../assets/nodata.png`),
    }
  },

  created() {
    this.getCategories()
  },

  mounted() {

  },

  computed: {
    pagination_tbl(){
      const start = (this.page_count - 1) * this.page_rows
      const end = start + this.page_rows
      return this.empAlrdyClmdList.slice(start,end)
    },

    total_unclaimed(){
      let total = this.total_empl_count.length - this.total_empl_clmed.length
      return total
    },
  },

  watch: {
    selectedCategory(val){
      this.slctdCtgryNme = val == null ? null : val.CATEGORYNAME
      this.slctdCtgryCde = val == null ? null : val.CATEGORYCODE
      this.get_employee_list(this.slctdCtgryCde)
    },

    emplBrcdeID(val){
      if(val){
        try{
          if(val.length == 10){
            this.saveClaim(val.substr(0,9))
          }
        }catch(error){
          console.log(error)
        }
      }
    },
  },

  methods: {

    CategoryClick(){
      clearInterval(this.timeOut)
    },
    CategoryChange(){
      this.SetFocus()
      this.emply_infrmtn = {}
    },

    SetFocus(){
      this.timeOut = setInterval(() => {
        if(this.$refs.barcode){
          this.$refs.barcode.focus()
        }
      }, 0);
    },

    getCategories(){
      const url = `${this.api}/getCategory/?companycode=${this.$store.state.cpr_password_info.companycode}`
      axios.get(url).then(res=>{
        this.itemCategories = res.data
      })
    },

    get_employee_list(val){
      this.total_empl_unclm = 0
      const url = `${this.api}/getAllAlreadyClaimed/?categoryCode=${val}&companycode=${this.$store.state.cpr_password_info.companycode}`
      axios.get(url).then(res=>{
        this.total_empl_clmed = res.data.length == 0 ? [] : _.map(res.data, 'EMPLCODE')
        const url = `${this.api}/get_total_employee_frm_station?ctgryCode=${val}&companycode=${this.$store.state.cpr_password_info.companycode}`
          axios.get(url).then(res2=>{
            if(res2.data){
              this.total_empl_count = _.map(res2.data, 'EMPLCODE')
              if(res.data.length != 0){
                this.total_empl_unclm = this.total_empl_count.length - res.data.length
              }else{
                this.total_empl_unclm = this.total_empl_count.length
              }
            }
          })
        this.empAlrdyClmdList = _.orderBy(res.data, 'CLAIMDATE' , 'desc')
        if(this.empAlrdyClmdList.length != 0){
          try{
            setTimeout(() => {
              this.emply_infrmtn = {
                // AVATAR      : require(`../assets/Picture/${this.empAlrdyClmdList[0].EMPLCODE}.jpg`),
                AVATAR      : this.get_picture(this.empAlrdyClmdList[0].EMPLCODE),
                STATUS      : this.empAlrdyClmdList[0].STATUS,
                EMPNAME     : this.empAlrdyClmdList[0].EMPNAME,
                EMPLCODE    : this.empAlrdyClmdList[0].EMPLCODE,
                DEPTNAME    : this.empAlrdyClmdList[0].DEPTDESC,
                SECTNAME    : this.empAlrdyClmdList[0].SECTIONDESC,
                TEAMNAME    : this.empAlrdyClmdList[0].TEAMDESC,
                CLAIMDATE   : moment().format('YYYY-MM-DD HH:mm:ss'),
                CATEGORYCODE: this.empAlrdyClmdList[0].CATEGORYCODE,
                CATEGORYNAME: this.empAlrdyClmdList[0].CATEGORYNAME,
              }
            }, 500);
            
          }catch(error){
            if(error){
              setTimeout(() => {
                this.emply_infrmtn = {
                  AVATAR      : 'NoPic.png',
                  STATUS      : this.empAlrdyClmdList[0].STATUS,
                  EMPNAME     : this.empAlrdyClmdList[0].EMPNAME,
                  EMPLCODE    : this.empAlrdyClmdList[0].EMPLCODE,
                  DEPTNAME    : this.empAlrdyClmdList[0].DEPTDESC,
                  SECTNAME    : this.empAlrdyClmdList[0].SECTIONDESC,
                  TEAMNAME    : this.empAlrdyClmdList[0].TEAMDESC,
                  CLAIMDATE   : moment().format('YYYY-MM-DD HH:mm:ss'),
                  CATEGORYCODE: this.empAlrdyClmdList[0].CATEGORYCODE,
                  CATEGORYNAME: this.empAlrdyClmdList[0].CATEGORYNAME,
                }
              }, 500);
            }
          }
        }else{
          this.emply_infrmtn = {
            AVATAR : 'NoPic.png'
          }
        }
        this.empl_avtr_pics = []
        let tempObj = {}
        for(let i = 0 ; i < this.empAlrdyClmdList.length ; i++){
          tempObj = {
            // avatar : require(`../assets/Picture/${this.empAlrdyClmdList[i].EMPLCODE}.jpg`),
            avatar : this.get_picture(this.empAlrdyClmdList[i].EMPLCODE),
            emplcode : this.empAlrdyClmdList[i].EMPLCODE
          }
          this.empl_avtr_pics.push(tempObj)
        }
      })
    },

    saveClaim(val){
      const get_emp_to_claimURl = `${this.api}/get_emp_frm_station01_by_bar_code?categoryCode=${this.slctdCtgryCde}&empBarCode=${val}&companycode=${this.$store.state.cpr_password_info.companycode}`
      axios.get(get_emp_to_claimURl).then(res=>{
        if(res.data.length != 0){
          const alrdyClmedURL = `${this.api}/getEmpInStation_01/${res.data.EMPLCODE}/${res.data.CATEGORYCODE}/${this.$store.state.cpr_password_info.companycode}`
          axios.get(alrdyClmedURL).then(res1=>{
            if(res1.data.length != 0){
              this.$toast.warning('Employee already Claimed!',`Warning!`,this.notif.options.info)
            }else{
              setTimeout(() => {
                this.emply_infrmtn = {
                  STATUS  : res.data.STATUS,
                  EMPNAME : res.data.EMPNAME,
                  EMPLCODE: res.data.EMPLCODE,
                  DEPTNAME: res.data.DEPTDESC,
                  SECTNAME: res.data.SECTIONDESC,
                  TEAMNAME: res.data.TEAMDESC,
                  CLAIMDATE: moment().format('YYYY-MM-DD HH:mm:ss'),
                  CATEGORYCODE: res.data.CATEGORYCODE,
                  CATEGORYNAME: res.data.CATEGORYNAME,
                }
                
                this.emply_infrmtn.sqlquery =`INSERT INTO companypresent_t_claim_details
                                                (COMPANYCODE,EMPLCODE, CATEGORYCODE, CLAIMDATE, REMARKS, CREATEDDATE, UPDATEDDATE) 
                                              VALUES 
                                              ('${this.$store.state.cpr_password_info.companycode}','${this.emply_infrmtn.EMPLCODE}',
                                                ${this.emply_infrmtn.CATEGORYCODE},'${this.emply_infrmtn.CLAIMDATE}','Claimed',
                                              '${this.emply_infrmtn.CLAIMDATE}','${this.emply_infrmtn.CLAIMDATE}')`
                const claimedUrl = `${this.api}/addItems`
                axios.post(claimedUrl, this.emply_infrmtn).then(()=>{
                  this.$toast.success('Successfully!','Claimed',this.notif.options.success)
                  this.get_employee_list(this.slctdCtgryCde)
                })
              }, 500);
            }
          })
        }else{
          this.$toast.warning('Employee is not Existing!',`Warning!`,this.notif.options.info)
        }
      })
      this.emplBrcdeID = null
    },

    selectOption(val){
      if(this.mChangeSpace(val) == 'Maintenance'){
        this.$router.push('/Maintenance')
      }else if(this.mChangeSpace(val)=='SignOut'){
        this.INSERT_PASSWORD(null)
        this.$router.push('/')
        this.$toast.success('Successfully!','Log-out',this.notif.options.success)
      }
    },
    openManualDialog(){
      this.manualDialog = true
    },
    onSelectCategory(val){
      this.openCategory = val
    },
    closeManualEncoding(val){
      this.manualDialog = val
    },
    reload_claims(val){
      setTimeout(() => {
        this.get_employee_list(this.slctdCtgryCde)
        this.emply_infrmtn = {
          STATUS  : val.STATUS,
          EMPNAME : val.EMPNAME,
          EMPLCODE: val.EMPLCODE,
          DEPTNAME: val.DEPTDESC,
          SECTNAME: val.SECTIONDESC,
          TEAMNAME: val.TEAMDESC,
          CLAIMDATE: moment().format('YYYY-MM-DD'),
          CATEGORYCODE: val.CATEGORYCODE,
          CATEGORYNAME: val.CATEGORYNAME,
        }
      }, 100);
    }
  },
}
</script>
<style scoped>
.select_cat {
    background-color: #FFECB3 !important;
    border: 2px solid silver;
}

.main_table th{
  background-color: #C2CAD0 !important;
  color: black !important;
  font-size: 12px !important;
  margin:0;
  padding:0;
}
th{
  border: 1px solid silver;
  background-color: #FFFBE6 !important;
}

.personal_infoTbl td{
  border: 1px solid silver;
  font-size: 14px !important;
  color: black !important;
  text-align: center;
  width: 10%;
  border-collapse: collapse
}
.personal_infoTbl th{
  border: 2px solid silver;
  background-color: rgb(104, 101, 101) !important;
  font-size: 14px !important;
  color: white !important;
  text-align: center;
}
.view_EmplDataTbl th{
  border: 1px solid silver;
  background-color: rgb(104, 101, 101) !important;
  font-size: 12px !important;
  color: white !important;
  margin:0;
  padding:0;
  text-align: center !important;
}
.view_EmplDataTbl td{
  border: 1px solid rgb(104, 101, 101);
  background-color: rgb(255, 255, 255) !important;
  font-size: 10px !important;
  color: black !important;
  margin:0;
  padding:0;
  text-align: center !important;
}
.pictures_tbl th{
  border: 1px solid rgb(104, 101, 101);
  background-color:  #E0E0E0 !important;
  font-size: 14px !important;
  color: white !important;
  text-align: center;
}
.flexcard {
  display: flex;
  flex-direction: column;
}.flexcard .v-toolbar {
  flex: 0;
}

.txtfield{
  width: 1px;
  overflow: hidden;
}
</style>