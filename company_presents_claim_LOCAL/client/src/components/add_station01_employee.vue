<template>
  <v-dialog v-model="addEmpSttn01Dlg" width="900" persistent>
    <v-card>
      <v-card-title class="text-h5 amber lighten-5 font-weight-black">
        INSERT EMPLOYEE
      </v-card-title>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" sm="2">
          <v-subheader>EMPLOYEE CODE: </v-subheader>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field dense hide-details class="ma-2" outlined clearable v-model="employee_info.employee_code"></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
            <v-subheader>EMPLOYEE NAME: </v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field dense hide-details class="ma-2" outlined v-model="employee_info.emplname"></v-text-field>
          </v-col>
        
      </v-row>
      <v-divider></v-divider>
      <v-card  class="ma-2" color="gray">
        <v-row no-gutters>
          <v-col cols="12" sm="2">
            <v-subheader eader>SELECT CATEGORY:</v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="ma-2">
              <select type="submit" v-model="employee_info.categorycode">
                <option v-for="(item, index) in itemCategories" :key="index" :value="item.CATEGORYCODE">{{item.CATEGORYNAME}}</option>
              </select>
            </div>
          </v-col>
          <v-col cols="12" sm="2">
            <v-subheader>SELECT DEPARMENT: </v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="ma-2">
              <select type="submit" v-model="employee_info.departmentcode" @change="getSections()">
                <option :value="null">NONE</option>
                <option v-for="(item, index) in dept_list" :key="index" :value="item.DEPTCODE">{{item.DEPTDESC}}</option>
              </select>
            </div>
          </v-col>
          <v-col cols="12" sm="2">
            <v-subheader>SELECT SECTION: </v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="ma-2">
              <select type="submit" v-model="employee_info.sectioncode" @change="getTeams()">
                <option :value="null">NONE</option>
                <option v-for="(item, index) in sect_list" :key="index" :value="item.SECTIONCODE">{{item.SECTIONDESC}}</option>
              </select>
            </div>
          </v-col>
          <v-col cols="12" sm="2">
            <v-subheader>SELECT TEAM:</v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="ma-2">
              <select type="submit" v-model="employee_info.teamcode">
                <option :value="null">NONE</option>
                <option v-for="(item, index) in team_list" :key="index" :value="item.TEAMCODE">{{item.TEAMDESC}}</option>
              </select>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <v-divider></v-divider> 
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save()">
          INSERT
        </v-btn>
        <v-btn color="error" @click="close()">
          CANCEL
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
export default {
  props : ['addEmpSttn01Dlg','itemCategories','station_emp_list'],
  data: ()=>{
    return{
      employee_info: {},
      employee_list: [],
      dept_list: [],
      sect_list: [],
      team_list: [],
    }
  },

  watch: {
    station_emp_list(val){
      this.employee_list = val
    },

    addEmpSttn01Dlg(val){
      if(val){
        const get_dept_url = `${this.api}/getDepartments/?companycode=${this.$store.state.cpr_password_info.companycode}`
        axios.get(get_dept_url).then(dept_res=>{
          this.dept_list = _.sortBy(dept_res.data, 'DEPTDESC')
        })
      }
    }
  },

  methods: {
    save(){
      if(this.employee_info.emplname != undefined){
        if(this.employee_info.categorycode != null){
          const get_emp_frm_station = `${this.api}/get_emp_frm_station01_by_emp_code/?categoryCode=${this.employee_info.categorycode}&employeeCode=${this.employee_info.employee_code}&companycode=${this.$store.state.cpr_password_info.companycode}`
          axios.get(get_emp_frm_station).then(res1=>{
            if(res1.data.length != 0){
              this.$toast.warning('Employee already registered in this category!',`Warning!`,this.notif.options.info)
            }else{
              const get_mx_brcde = `${this.api}/get_mx_brcode/?companycode=${this.$store.state.cpr_password_info.companycode}`
              axios.get(get_mx_brcde).then(res2=>{
                // let number = parseInt(res2.data[0].BARCODEID.substr(3,9))
                // var addMoreZeros = (numStr, numLength = numStr.length) => `${++numStr}`.padStart(numLength,'0');
                // let barcode = 'MAN' + addMoreZeros(number,6)
                this.employee_info.sqlquery =  `INSERT INTO companypresent_m_station01 (COMPANYCODE, BARCODEID,CATEGORYCODE,EMPLCODE,EMPNAME,DEPTCODE,SECTIONCODE,TEAMCODE)`+ '\n' + `
                                                VALUES
                                                  (
                                                    '${this.$store.state.cpr_password_info.companycode}','${res2.data.MaximumManualBarcode}',${this.employee_info.categorycode},'${this.employee_info.employee_code}','${this.employee_info.emplname}','${this.employee_info.departmentcode}','${this.employee_info.sectioncode}','${this.employee_info.teamcode}'
                                                  )`
                const insertUrl = `${this.api}/addItems`
                axios.post(insertUrl, this.employee_info).then(()=>{
                  this.$toast.success('Successfully!',`Added Employees`,this.notif.options.success)
                  this.$emit(`refresh_data`, 1)
                  this.close()
                })
              })
            }
          })
        }else{
          this.$toast.warning('Select Additional first!',`Warning!`,this.notif.options.info)
        }
      }else{
        this.$toast.warning('Adding employee failed!',`Warning!`,this.notif.options.info)
      }
    },

    getSections(){
      let sections = this.employee_list.filter(rec=>{
        return rec.DEPTCODE == this.employee_info.departmentcode && rec.SECTIONDESC != null
      })
      this.sect_list = _.uniqBy(sections, 'SECTIONDESC')
    },

    getTeams(){
      let teams = this.employee_list.filter(rec=>{
        return rec.SECTIONCODE == this.employee_info.sectioncode && rec.TEAMDESC != null
      })
      this.team_list = _.uniqBy(teams, 'TEAMDESC')
    },

    close(){
      this.employee_info = {}
      this.$emit(`closeDialog`, false)
    },
  },
}
</script>

<style scoped>
  select {
    width :100%;
    border:1px solid rgb(104, 101, 101);
    border-radius:6px;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
    background-color: rgb(255, 255, 255);
    text-align: center;
  }
</style>