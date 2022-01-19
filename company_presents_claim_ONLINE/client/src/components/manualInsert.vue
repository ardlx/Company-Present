<template>
  <v-dialog v-model="manualDialog" width="1200px" @keydown.esc="close()" persistent>
    <v-form v-on:submit.prevent> <!-- ADD this code 'v-on:submit.prevent' pag may isa submit kng isang data through @keypress.enter //
                                      ito ay para maiwasan ang pagreload ng buong page. Subukan mong wag lagyan ewan ko nlng!.-->
      <v-card height="268px" color="#C2CAD0">
        <v-card outlined tile height="60px" color="#C2CAD0" flat>
          <v-card outlined tile height="50px" color="#FFFBE6" flat class="ma-1">
            <v-row no-gutters>
              <v-col cols="12" sm="3">
                <v-card outlined tile height="40px" flat class="ma-1 mr-5 ml-16 empl_id_card">
                  <center class="mt-2">
                    <span class="mb-2 font-weight-black mx-auto" style="color:black">EMPLOYEE CODE:</span>
                  </center>
                </v-card>
              </v-col>
              <v-col cols="12" sm="9">
                <div class="mt-1 mr-16">
                  <input type="number" class="_employeeID" v-model="employeeCode" @change="show()" @keypress.enter="save()">
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
        <v-simple-table class="main_table ml-1 mr-1 mb-10">
          <thead>
            <tr>
              <th>
                <v-row no-gutters>
                  <v-col cols="12" sm="2">
                    <v-card height="188px" width="190" class="mt-2 mb-2" color="#C2CAD0">
                      <center>
                        <v-avatar tile size="180" class="mt-1">
                          <img :src="emply_infrmtn.AVATAR"/>
                        </v-avatar> 
                      </center>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="10">
                    <v-simple-table class="ma-2" style="width:100%">
                      <template class="mt-3">
                        <thead>
                          <tr>
                            <th colspan="12">
                              <v-row no-gutters>
                                <v-col xs="12" sm="4">
                                  <v-card class="mb-2 mt-2 mr-2 mx-auto" outlined tile height="43px" flat color="#1565C0" >
                                    <v-card outlined tile height="35px"  flat  dark color="#1E88E5" >
                                      <center>
                                        <span class="display-1 mb-2 font-weight-black mx-auto">{{emply_infrmtn.EMPLCODE}}</span>
                                      </center>
                                    </v-card>
                                  </v-card>
                                </v-col>
                                <v-col xs="12" sm="8">
                                  <v-card class="mb-2 mt-2 mx-auto" outlined tile height="43px" flat color="#1565C0" >
                                    <v-card outlined tile height="35px"  flat  dark color="#1E88E5" >
                                      <center>
                                        <span class="display-1 mb-2 font-weight-black mx-auto">{{slctd_ctgrynm}}</span>
                                      </center>
                                    </v-card>
                                  </v-card>
                                </v-col>
                              </v-row>

                              <v-row no-gutters>
                                <v-col xs="12" sm="12" md="12" lg="12">
                                  <v-card class="mb-2 mx-auto" outlined tile height="120px" flat color="#C62828">
                                    <v-card class="mb-2" outlined tile height="112px" flat color="#EF5350">
                                      <center>
                                        <v-simple-table style="width:100%" class="personal_infoTbl mt-1">
                                          <tr>
                                            <th colspan="2">PERSONAL INFORMATION</th>
                                            <th colspan="2">DESIGNATION DETAILS</th>
                                          </tr>
                                          <tr>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="#FFFBE6">
                                                <div style="color: black">{{'FULL NAME:'}}</div>
                                              </v-card>
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="white">
                                                <div style="color: black">{{emply_infrmtn.EMPNAME}}</div>
                                              </v-card>  
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="#FFFBE6">
                                                <div style="color: black">{{'DEPARTMENT:'}}</div>
                                              </v-card>
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="white">
                                                <div style="color: black">{{emply_infrmtn.DEPTNAME}}</div>
                                              </v-card>  
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="#FFFBE6">
                                                <div style="color: black">{{'STATUS:'}}</div>
                                              </v-card>
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="white">
                                                <div style="color: black">{{emply_infrmtn.STATUS}}</div>
                                              </v-card>
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="#FFFBE6">
                                                <div style="color: black">{{'SECTION:'}}</div>
                                              </v-card>
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="white">
                                                <div style="color: black">{{emply_infrmtn.SECTNAME}}</div>
                                              </v-card>  
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="#FFFBE6">
                                                <div style="color: black">{{'CLAIMED DATE:'}}</div>
                                              </v-card>
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="white">
                                                <div style="color: black">{{emply_infrmtn.CLAIMDATE}}</div>
                                              </v-card>
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="#FFFBE6">
                                                <div style="color: black">{{'TEAM'}}</div>
                                              </v-card>
                                            </td>
                                            <td>
                                              <v-card class="pa-0" outlined tile color="white">
                                                <div style="color: black">{{emply_infrmtn.TEAMNAME}}</div>
                                              </v-card>  
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
        <!-- <v-card class="ma-1" flat color="#FFFBE6" tile>
          <center>
            <v-btn @click="save" class="ma-2" color="primary">CLAIM</v-btn>
            <v-btn @click="close" class="ma-2 ml-4" color="error">CLOSE</v-btn>
          </center>
        </v-card> -->
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  props: ['manualDialog', 'selectedCategory'],
  data: function(){
    return{
      slctd_ctgry  : {},
      emply_infrmtn: {},
      employeeCode : null,
      slctd_ctgrynm: null,
    }
  },

  watch:{
    selectedCategory(val){
      this.slctd_ctgry = val == null ? null : val
      this.slctd_ctgrynm = val == null ? null : val.CATEGORYNAME
      this.emply_infrmtn = {
        AVATAR: "NoPic.png"
      }
    },
  },

  methods: {
    show(){
      if(this.employeeCode){
        const get_emp_to_claimURl = `${this.api}/get_emp_frm_station01_by_emp_code/?categoryCode=${this.slctd_ctgry.CATEGORYCODE}&employeeCode=${this.employeeCode}&companycode=${this.$store.state.cpr_password_info.companycode}`
        axios.get(get_emp_to_claimURl).then(res=>{
          if(res.data.length == 0){
            this.emply_infrmtn = {
              AVATAR: "NoPic.png"
            }
          }else{
            try{
              this.emply_infrmtn = {
                // AVATAR      : require(`../assets/Picture/${res.data.EMPLCODE}.jpg`),
                AVATAR      : this.get_picture(res.data.EMPLCODE),
                EMPLCODE    : res.data.EMPLCODE,
                EMPNAME     : res.data.EMPNAME,
                CATEGORYCODE: res.data.CATEGORYCODE,
                CATEGORYNAME: res.data.CATEGORYNAME,
                STATUS      : res.data.STATUS,
                DEPTNAME    : res.data.DEPTDESC,
                SECTNAME    : res.data.SECTIONDESC,
                TEAMNAME    : res.data.TEAMDESC,
                CLAIMDATE   : res.data.length != 0 ? moment().format('YYYY-MM-DD HH:mm:ss') : ''
              }
            }catch(error){
              if(error){
                this.emply_infrmtn = {
                  AVATAR      : "NoPic.png",
                  EMPLCODE    : res.data.EMPLCODE,
                  EMPNAME     : res.data.EMPNAME,
                  CATEGORYCODE: res.data.CATEGORYCODE,
                  CATEGORYNAME: res.data.CATEGORYNAME,
                  STATUS      : res.data.STATUS,
                  DEPTNAME    : res.data.DEPTDESC,
                  SECTNAME    : res.data.SECTIONDESC,
                  TEAMNAME    : res.data.TEAMDESC,
                  CLAIMDATE   : res.data.length != 0 ? moment().format('YYYY-MM-DD HH:mm:ss') : ''
                }
              }
            }
          }
        })
      }
    },
    
    save(){
      if(this.emply_infrmtn.EMPLCODE == undefined){
        this.$toast.warning('Employee not exist!',`Warning!`,this.notif.options.info)
        this.emply_infrmtn = {
          AVATAR: "NoPic.png"
        }
      }else{
        const getEmpAlreadyClmedByCtgryCde = `${this.api}/getEmpInStation_01/${this.emply_infrmtn.EMPLCODE}/${this.emply_infrmtn.CATEGORYCODE}/${this.$store.state.cpr_password_info.companycode}`
        axios.get(getEmpAlreadyClmedByCtgryCde).then(res=>{
          if(res.data.length != 0){
            this.$toast.warning('Employee already Claimed!',`Warning!`,this.notif.options.info)
            this.emply_infrmtn = {
              AVATAR: "NoPic.png"
            }
          }else{
            const get_emp_by_code_url = `${this.api}/get_emp_frm_station01_by_emp_code/?categoryCode=${this.slctd_ctgry.CATEGORYCODE}&employeeCode=${this.employeeCode}&companycode=${this.$store.state.cpr_password_info.companycode}`
            axios.get(get_emp_by_code_url).then(res=>{
              if(res.data.length == 0){
                this.emply_infrmtn.sqlquery = `INSERT INTO companypresent_t_claim_details
                                              (COMPANYCODE,EMPLCODE, CATEGORYCODE, CLAIMDATE, REMARKS, CREATEDDATE, UPDATEDDATE) 
                                              VALUES 
                                              ('${this.$store.state.cpr_password_info.companycode}','${this.emply_infrmtn.EMPLCODE}',
                                              ${this.emply_infrmtn.CATEGORYCODE},'${this.emply_infrmtn.CLAIMDATE}','Claimed',
                                              '${this.emply_infrmtn.CLAIMDATE}','${this.emply_infrmtn.CLAIMDATE}')`
                const claimedUrl = `${this.api}/addItems`
                axios.post(claimedUrl, this.emply_infrmtn).then(()=>{
                  this.$toast.success('Successfully!','Claimed',this.notif.options.success)
                  this.close()
                })
                const claimedUrlByCode = `${this.api}/getAllAlreadyClaimed_by_code/?employeeCode=${this.emply_infrmtn.EMPLCODE}&categoryCode=${this.emply_infrmtn.CATEGORYCODE}&companycode=${this.$store.state.cpr_password_info.companycode}`
                axios.get(claimedUrlByCode).then(res=>{
                  // console.log(res.data)
                  this.$emit(`reload_emplist`, res.data)
                })
              }else{
                this.$toast.warning('Employee was not registered!',`Warning!`,this.notif.options.info)
              }
            })
          }
        })
      }
      this.employeeCode = null
    },
    close(){
      this.$emit(`close`, false)
      this.employeeCode = null
      this.emply_infrmtn = {
        AVATAR: "NoPic.png"
      }
    },
  }
}
</script>

<style scoped>
.main_table th{
  background-color: #FFFBE6;
  color: white !important;
  font-size: 12px !important;
  padding:0;
}

.personal_infoTbl th{
  border: 2px solid silver;
  background-color: rgba(104, 101, 101);
  color: white !important;
  font-size: 14px !important;
  margin:0;
  padding:0;
}
.personal_infoTbl td{
  border: 1px solid silver;
  color: white !important;
  font-size: 14px !important;
  margin:0;
  padding:0;
  text-align: center;
  width: 20%;
  border-collapse: collapse
}

._employeeID[type=number]{
  height: 40px;
  width: 100%;
  border: 2px solid silver;
  text-align: center;
  background-color: white;
  font-size: 40px; 
  font-family: monospace;
  font-weight: bold;
  transition: ease-in-out, width .35s ease-in-out;
} 
.input[type=number]:focus {
  width: 250px;
}

.empl_id_card {
    background-color: #FFECB3 !important;
    border: 2px solid silver;
}
</style>