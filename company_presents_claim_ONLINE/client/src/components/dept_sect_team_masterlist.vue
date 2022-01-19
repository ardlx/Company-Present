<template>
  <v-dialog v-model="dsgntn_mstrlst_dlg" @keydown.esc="$emit('closeDialog', false)" width="800px" persistent>
    <v-form v-on:submit.prevent>
      <v-card height="594px" color="grey lighten-2">
        <v-card outlined tile height="72px" color="grey lighten-2" flat>
          <v-card outlined tile height="62px" color="#FFFBE6" flat class="ma-1">
            <v-row no-gutters>
              <v-col cols="12" sm="12">
                <v-card-title class="text-center justify-center">
                  <h1 class="font-weight-bold maintenance--text">
                    {{tab_name}} Lists
                  </h1>
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
        <v-card outlined tile height="517px" color="#FFFBE6" flat class="ml-1 mr-1">
          <v-tabs v-model="tab" background-color="transparent" color="maintenance" grow>
            <v-tab v-for="(item, index) in menus" :key="index">
              {{item.name}}
            </v-tab>
            <v-tabs-items v-model="tab">
              <v-tab-item key="depts">
                <v-card color="maintenance" flat>
                  <v-simple-table class="table pa-1" dense >
                    <thead>
                      <tr>
                        <th>Department Code</th>
                        <th>Department Name</th>
                      </tr>
                      <tr>
                        <th><input type="text" v-model="srch_dept_code" placeholder="Search Department Code..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_dept_name" placeholder="Search Department Name..." class="mt-1"/></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in pgntn_dprtmnt" :key="index">
                        <td>{{item.DEPTCODE}}</td>
                        <td>{{item.DEPTDESC}}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                  <v-col cols="12">
                    <v-pagination :total-visible="10" v-model="dept_page" :length="pgcnt_dprtmnt"></v-pagination>
                  </v-col>
                </v-card>
              </v-tab-item>

              <v-tab-item key="sects">
                <v-card color="maintenance" flat>
                  <v-simple-table class="table pa-1" dense >
                    <thead>
                      <tr>
                        <th>Section Code</th>
                        <th>Section Name</th>
                      </tr>
                      <tr>
                        <th><input type="text" v-model="srch_sect_code" placeholder="Search Section Code..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_sect_name" placeholder="Search Section Name..." class="mt-1"/></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in pgntn_sctn" :key="index">
                        <td>{{item.SECTIONCODE}}</td>
                        <td>{{item.SECTIONDESC}}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                  <v-col cols="12">
                    <v-pagination :total-visible="10" v-model="sect_page" :length="pgcnt_sctn"></v-pagination>
                  </v-col>
                </v-card>
              </v-tab-item>

              <v-tab-item key="teams">
                <v-card color="maintenance" flat>
                  <v-simple-table class="table pa-1" dense >
                    <thead>
                      <tr>
                        <th>Team Code</th>
                        <th>Team Name</th>
                      </tr>
                      <tr>
                        <th><input type="text" v-model="srch_team_code" placeholder="Search Team Code..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_team_name" placeholder="Search Team Name..." class="mt-1"/></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in pgntn_team" :key="index">
                        <td>{{item.TEAMCODE}}</td>
                        <td>{{item.TEAMDESC}}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                  <v-col cols="12">
                    <v-pagination :total-visible="10" v-model="team_page" :length="pgcnt_team"></v-pagination>
                  </v-col>
                </v-card>
              </v-tab-item>

              <v-tab-item key="Manual">
                <v-card color="maintenance" flat>
                  <v-simple-table class="table pa-1" dense >
                    <thead>
                      <tr>
                        <th>Employee Code</th>
                        <th>Employee Name</th>
                        <th>Department Name</th>
                        <th>Section Name</th>
                        <th>Team Name</th>
                        <th>Category</th>
                        <th>Remarks</th>
                      </tr>
                      <tr>
                        <th><input type="text" v-model="srch_empl_code" placeholder="Search..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_empl_name" placeholder="Search..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_empl_dept" placeholder="Search..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_empl_sect" placeholder="Search..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_empl_team" placeholder="Search..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_empl_ctgr" placeholder="Search..." class="mt-1"/></th>
                        <th><input type="text" v-model="srch_empl_rmrk" placeholder="Search..." class="mt-1"/></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in pgntn_empl" :key="index">
                        <td>{{item.EMPLCODE}}</td>
                        <td>{{item.EMPNAME}}</td>
                        <td>{{item.DEPTDESC}}</td>
                        <td>{{item.SECTIONDESC}}</td>
                        <td>{{item.TEAMDESC}}</td>
                        <td>{{item.CATEGORYNAME}}</td>
                        <td>{{item.REMARKS}}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                  <v-col cols="12">
                    <v-pagination :total-visible="10" v-model="empl_page" :length="pgcnt_empl"></v-pagination>
                  </v-col>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
export default({
  props: ['dsgntn_mstrlst_dlg'],
  data:function (){
    return{
      tab : null,
      dept_page : 1,
      sect_page : 1,
      team_page : 1,
      empl_page : 1,
      tab_name : null,
      dept_rwpg : 10,
      sect_rwpg : 10,
      team_rwpg : 10,
      empl_rwpg : 10,

      srch_dept_code : '',
      srch_dept_name : '',

      srch_sect_code : '',
      srch_sect_name : '',

      srch_team_name : '',
      srch_team_code : '',

      srch_empl_name : '',
      srch_empl_code : '',
      srch_empl_dept : '',
      srch_empl_sect : '',
      srch_empl_team : '',
      srch_empl_ctgr : '',
      srch_empl_rmrk : '',

      dept_list : [],
      sect_list : [],
      team_list : [],
      empl_list : [],

      dept_pgelngth : 0,
      sect_pgelngth : 0,
      team_pgelngth : 0,
      empl_pgelngth : 0,

      
      


      menus: [
        {name: 'Departments',   key: 'depts'},   
        {name: 'Sections',      key: 'sects'},
        {name: 'Teams',         key: 'teams'},
        {name: 'Manual Encoded',key: 'Manual'},
      ],
    }
  },

  created(){
    //Set code here for creating data in methods
  },

  watch:{
    tab(val){
      this.tab_name = val == 0 ? 'Department' : val == 1 ? 'Section' : val == 2 ? 'Team' : ''
    },
    dsgntn_mstrlst_dlg(val){
      if(val){
        this.getAllDeptsSectsTeams()
      }
    }
  },

  computed :{
    //FOR DEPARTMENTS
    srch_dprtmnt(){
      return this.dept_list.filter(data=>{
        if(this.srch_dept_code){
          let srchdeptcde = new RegExp(this.srch_dept_code.toUpperCase(), "g");
          return JSON.stringify(data.DEPTCODE).toUpperCase().match(srchdeptcde);
        }else{
          let srchdeptnme = new RegExp(this.srch_dept_name.toUpperCase(), "g");
          return JSON.stringify(data.DEPTDESC).toUpperCase().match(srchdeptnme);
        }
      })
    },
    pgntn_dprtmnt(){
      const start = (this.dept_page - 1) * this.dept_rwpg,
      end = start + this.dept_rwpg;
      return this.srch_dprtmnt.slice(start, end);
    },
    pgcnt_dprtmnt(){
      let searchLength = this.srch_dprtmnt.length
      let Pagelength = this.dept_rwpg
      return Math.ceil(searchLength/Pagelength)
    },

    //FOR SECTIONS
    srch_sctn(){
      return this.sect_list.filter(data=>{
        if(this.srch_sect_code){
          let srchsectcde = new RegExp(this.srch_sect_code.toUpperCase(), "g");
          return JSON.stringify(data.SECTIONCODE).toUpperCase().match(srchsectcde);
        }else{
          let srchsectnme = new RegExp(this.srch_sect_name.toUpperCase(), "g");
          return JSON.stringify(data.SECTIONDESC).toUpperCase().match(srchsectnme);
        }
      })
    },
    pgntn_sctn(){
      const start = (this.sect_page - 1) * this.sect_rwpg,
      end = start + this.sect_rwpg;
      return this.srch_sctn.slice(start, end);
    },
    pgcnt_sctn(){
      let searchLength = this.srch_sctn.length
      let Pagelength = this.sect_rwpg
      return Math.ceil(searchLength/Pagelength)
    },

    //FOR TEAMS
    srch_team(){
      return this.team_list.filter(data=>{
        if(this.srch_team_code){
          let srchteamcde = new RegExp(this.srch_team_code.toUpperCase(), "g");
          return JSON.stringify(data.TEAMCODE).toUpperCase().match(srchteamcde);
        }else{
          let srchteamnme = new RegExp(this.srch_team_name.toUpperCase(), "g");
          return JSON.stringify(data.TEAMDESC).toUpperCase().match(srchteamnme);
        }
      })
    },
    pgntn_team(){
      const start = (this.team_page - 1) * this.team_rwpg,
      end = start + this.team_rwpg;
      return this.srch_team.slice(start, end);
    },
    pgcnt_team(){
      let searchLength = this.srch_team.length
      let Pagelength = this.team_rwpg
      return Math.ceil(searchLength/Pagelength)
    },

    //FOR MANUALLY INSERTED
    srch_empl(){
      return this.empl_list.filter(data=>{
        if(this.srch_empl_code){
          let srchemplcde = new RegExp(this.srch_empl_code.toUpperCase(), "g");
          return JSON.stringify(data.EMPLCODE).toUpperCase().match(srchemplcde);
        }else if(this.srch_empl_name){
          let srchemplnme = new RegExp(this.srch_empl_name.toUpperCase(), "g");
          return JSON.stringify(data.EMPNAME).toUpperCase().match(srchemplnme);
        }else if(this.srch_empl_dept){
          let srchempldpt = new RegExp(this.srch_empl_dept.toUpperCase(), "g");
          return JSON.stringify(data.DEPTDESC).toUpperCase().match(srchempldpt);
        }else if(this.srch_empl_sect){
          let srchemplsec = new RegExp(this.srch_empl_sect.toUpperCase(), "g");
          return JSON.stringify(data.SECTIONDESC).toUpperCase().match(srchemplsec);
        }else if(this.srch_empl_team){
          let srchempltim = new RegExp(this.srch_empl_team.toUpperCase(), "g");
          return JSON.stringify(data.TEAMDESC).toUpperCase().match(srchempltim);
        }else if(this.srch_empl_ctgr){
          let srchemplctg = new RegExp(this.srch_empl_ctgr.toUpperCase(), "g");
          return JSON.stringify(data.CATEGORYNAME).toUpperCase().match(srchemplctg);
        }else{
          let srchemplrmk = new RegExp(this.srch_empl_rmrk.toUpperCase(), "g");
          return JSON.stringify(data.REMARKS).toUpperCase().match(srchemplrmk);
        }
      })
    },
    pgntn_empl(){
      const start = (this.empl_page - 1) * this.empl_rwpg,
      end = start + this.empl_rwpg;
      return this.srch_empl.slice(start, end);
    },
    pgcnt_empl(){
      let searchLength = this.srch_empl.length
      let Pagelength = this.empl_rwpg
      return Math.ceil(searchLength/Pagelength)
    },
  },

  methods:{
    getAllDeptsSectsTeams(){
      const get_dept_url = `${this.api}/getDepartments/?companycode=${this.$store.state.cpr_password_info.companycode}`
      axios.get(get_dept_url).then(dept_res=>{
        this.dept_list = dept_res.data
        this.dept_pgelngth = Math.ceil(this.dept_list.length / this.dept_rwpg)
      })

      const get_sect_url = `${this.api}/getSections/?companycode=${this.$store.state.cpr_password_info.companycode}`
      axios.get(get_sect_url).then(sect_res=>{
        this.sect_list = sect_res.data
        this.sect_pgelngth = Math.ceil(this.sect_list.length / this.sect_rwpg)
      })

      const get_team_url = `${this.api}/getTeams/?companycode=${this.$store.state.cpr_password_info.companycode}`
      axios.get(get_team_url).then(team_res=>{
        this.team_list = _.filter(team_res.data, function(rec){return rec.TEAMDESC != 'NONE'})
        this.team_pgelngth = Math.ceil(this.team_list.length / this.team_rwpg)
      })

      const get_emp_manually =`${this.api}/get_manual_inserted_employee?companycode=${this.$store.state.cpr_password_info.companycode}`
      axios.get(get_emp_manually).then(empl_res=>{
        this.empl_list = empl_res.data
        this.empl_pgelngth = Math.ceil(this.empl_list.length / this.empl_rwpg)
      })
    },
  },
})
</script>

<style scoped>
.maintenance {
  background-color: #FFFBE6 !important;
}
.maintenance--text {
  color: black !important;
}
.table th{
  border: 1px solid silver;
  background-color: rgb(104, 101, 101) !important;
  font-size: 12px !important;
  color: white !important;
  margin:0;
  padding:0;
  text-align: center !important;
}
.table td{
  border: 1px solid rgb(104, 101, 101);
  background-color: rgb(255, 255, 255) !important;
  font-size: 10px !important;
  color: black !important;
  margin:0;
  padding:0;
  text-align: center !important;
}
input[type=text]{
  width :100%;
  border:2px solid silver;
  border-radius:4px;
  margin:2px 0;
  outline:none;
  padding:4px;
  box-sizing:border-box;
  transition:.3s;
  background-color: white;
  text-align: center;
}

input[type=text]:focus{
  border-color: rgb(247, 123, 123);
  box-shadow:0 0 8px 0 black;
}
</style>
