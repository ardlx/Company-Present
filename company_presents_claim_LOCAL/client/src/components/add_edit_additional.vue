<template>
  <div>
    <v-dialog v-model="addEditAddtnDlg" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 amber lighten-5 font-weight-black">
          {{toDoAdditional}}
        </v-card-title>
        <v-divider></v-divider>
        <v-text-field dense hide-details class="ma-2" outlined v-model="toSend.additionalName"></v-text-field>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveChecking(toSend.additionalName, toDoAdditional)">
            SAVE
          </v-btn>
          <v-btn color="error" @click="close">
            CANCEL
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  props: ['addEditAddtnDlg','toDoAdditional','toEditAdditional'],
  data: function(){
    return{
      toSend : {},
      toCheck : []
    }
  },
  watch:{
    toEditAdditional(val){
      this.toSend.additionalName = val.DESC_ADDITIONAL
      this.toSend.additionalCode = val.CODE_ADDITIONAL
    },
    toDoAdditional(val){
      if(val == 'ADD ADDITIONAL'){
        this.toSend = {}
      }
    }
  },
  created(){

  },
  methods:{
    saveChecking(val, isAddOrEdit){
      if(val){
        let data = this.mChangeSpace(val).toUpperCase()
        const url = `${this.api}/getAdditional/?companycode=${this.$store.state.cpr_password_info.companycode}`
        axios.get(url).then(res=>{
          for(let i = 0 ; i<res.data.length ; i++){
            this.toCheck.push(this.mChangeSpace(res.data[i].DESC_ADDITIONAL).toUpperCase())
          }
        })
        setTimeout(() => {
          if(this.toCheck.includes(data)){
            this.$toast.warning('Additional was already included!',`Warning!`,this.notif.options.info)
          }else{
            if(isAddOrEdit == 'ADD ADDITIONAL'){
              const getMxUrl = `${this.api}/getMaxAdditionalCode/?companycode=${this.$store.state.cpr_password_info.companycode}`
              axios.get(getMxUrl).then(res=>{
                this.toSend.sqlquery = `INSERT INTO 
                                      companypresent_m_additional(COMPANYCODE, CODE_ADDITIONAL,DESC_ADDITIONAL,CREATEDDATE) 
                                      VALUES
                                      (${this.$store.state.cpr_password_info.companycode},${res.data.maxAddnlCode + 1},'${this.toSend.additionalName}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`

                const addUrl = `${this.api}/addItems`
                axios.post(addUrl, this.toSend).then(()=>{
                  this.$emit(`toReload`, true)
                  this.$toast.success('Successfully!',`Added Additional`,this.notif.options.success)
                  this.close()
                  this.toSend = {}
                })
              })
            }else if(isAddOrEdit =='EDIT ADDITIONAL'){
              this.toSend.sqlquery = `UPDATE companypresent_m_additional 
                                      SET 
                                        DESC_ADDITIONAL ='${this.toSend.additionalName}',
                                        UPDATEDDATE  ='${moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}' 
                                      WHERE 
                                        CODE_ADDITIONAL = ${this.toSend.additionalCode}`

              const editUrl =`${this.api}/updateItems`
              axios.post(editUrl, this.toSend).then(()=>{
                this.$emit('reloadUpdate', this.toSend)
                this.$toast.success('Successfully!',`Updated Additional`,this.notif.options.success)
                this.close()
                this.toSend = {}
              })
            }
          }
        }, 500);
        this.toCheck = []
      }else{
        this.$toast.warning('Cant insert null!',`Warning!`,this.notif.options.info)
      }
    },

    close(){
      this.$emit('closeDialog', false)
    }
  }
}
</script>