<template>
  <v-dialog v-model="addEmpWthAddDlg" width="700" persistent>
    <v-card>
      <v-card-title class="text-h5 amber lighten-5 font-weight-black">
        ADD EMPLOYEES WITH ADDITIONAL
      </v-card-title>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" sm="2">
          <v-subheader>EMPLOYEE CODE: </v-subheader>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field dense hide-details class="ma-2" outlined clearable v-model="employee_code" @blur="getEmpInfoByCode(employee_code)"></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-subheader>SELECT ADDITIONAL</v-subheader>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="ma-2">
            <select type="submit" v-model="slctd_addon_cde">
              <option v-for="(item, index) in additionals" :key="index" :value="item.CODE_ADDITIONAL">{{item.DESC_ADDITIONAL}}</option>
            </select>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card  class="ma-2">
        <v-row no-gutters>
          <v-col cols="12" sm="2">
            <v-subheader>EMPLOYEE NAME: </v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field dense hide-details class="ma-2" outlined disabled v-model="employee_info.emplname"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-subheader>DEPT NAME: </v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field dense hide-details class="ma-2" outlined disabled v-model="employee_info.deptname"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-subheader>SECT NAME: </v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field dense hide-details class="ma-2" outlined disabled v-model="employee_info.sectname"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-subheader>TEAM NAME:</v-subheader>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field dense hide-details class="ma-2" outlined disabled v-model="employee_info.teamname"></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-divider></v-divider> 
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save">
          INSERT
        </v-btn>
        <v-btn color="error" @click="close">
          CANCEL
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
export default {
  props : ['addEmpWthAddDlg','itemAdditional', 'station_emp_arry'],
  data: ()=>{
    return{
      additionals: [],
      temp_empList: [],
      employee_code: null,
      slctd_addon_cde: null,
      employee_info: {},
    }
  },
  watch: {
    itemAdditional(val){
      this.additionals = val
    },
    station_emp_arry(val){
      this.temp_empList = val
    }
  },

  methods: {
    getEmpInfoByCode(val){
      let temp_obj = _.filter(this.temp_empList, function(rec){ return rec.EMPLCODE == val})
      if(temp_obj.length != 0){
        
        this.employee_info = {
          emplname : temp_obj[0].EMPNAME,
          emplcode : temp_obj[0].EMPLCODE,
          deptname : temp_obj[0].DEPTDESC,
          sectname : temp_obj[0].SECTIONDESC,
          teamname : temp_obj[0].TEAMDESC,
        }
      }else{
        this.employee_info = {}
      }
    },

    save(){
      if(this.employee_info.emplname != undefined){
        this.employee_info.addncode = this.slctd_addon_cde
        if(this.employee_info.addncode != null){
          const get_employees_wth_addtnls_by_codeURL = `${this.api}/get_employees_wth_addtnls_by_code/?employeeCode=${this.employee_info.emplcode}&additionalCode=${this.employee_info.addncode}&companycode=${this.$store.state.cpr_password_info.companycode}`
          axios.get(get_employees_wth_addtnls_by_codeURL).then(res1=>{
            if(res1.data.length != 0){
              this.$toast.warning('Employee already has Additional!',`Warning!`,this.notif.options.info)
            }else{
              this.employee_info.sqlquery =  `INSERT INTO companypresent_t_additional
                                                (COMPANYCODE,CODE_ADDITIONAL, EMPLOYEECODE, CREATEDDATE) 
                                              VALUES 
                                              ('${this.$store.state.cpr_password_info.companycode}','${this.employee_info.addncode}','${this.employee_info.emplcode}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`
              const insertUrl = `${this.api}/addItems`
              axios.post(insertUrl, this.employee_info).then(()=>{
                this.$toast.success('Successfully!',`Added Employees`,this.notif.options.success)
                this.$emit(`reloadEmpWithAddtnls`, this.employee_info.addncode)
                this.close()
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

    close(){
      this.$emit(`closeDialog`, false)
      this.employee_info = {}
      this.employee_code = null
      this.slctd_addon_cde = null
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