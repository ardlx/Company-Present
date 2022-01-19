<template>
  <div class="text-center">
    <v-dialog v-model="addEditCtgryDlg" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 amber lighten-5 font-weight-black">
          {{toDoCategory}}
        </v-card-title>
        <v-divider></v-divider>
        <v-text-field dense hide-details class="ma-2" outlined v-model="toSend.categoryName"></v-text-field>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveChecking(toSend.categoryName , toDoCategory)">
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
  props: ['addEditCtgryDlg','toDoCategory','toEditCategory'],
  data: function(){
    return{
      toSend : {},
      toCheck: [],
    }
  },
  watch:{
    toEditCategory(val){
      this.toSend.categoryName = val.CATEGORYNAME
      this.toSend.categoryCode = val.CATEGORYCODE
    },
    toDoCategory(val){
      if(val == 'ADD CATEGORY'){
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
        const url = `${this.api}/getCategory/?companycode=${this.$store.state.cpr_password_info.companycode}`
        axios.get(url).then(res=>{
            for(let i = 0 ; i<res.data.length ; i++){
              this.toCheck.push(this.mChangeSpace(res.data[i].CATEGORYNAME).toUpperCase())
          } 
        })
        setTimeout(() => {
          if(this.toCheck.includes(data)){
            this.$toast.warning('Category was already included!',`Warning!`,this.notif.options.info)
          }else{
              if(isAddOrEdit == 'ADD CATEGORY'){
                const getMxUrl = `${this.api}/getMaxCategoryCode/?companycode=${this.$store.state.cpr_password_info.companycode}`
                axios.get(getMxUrl).then(res=>{
                  this.toSend.sqlquery = `INSERT INTO 
                                      companypresent_m_categories(COMPANYCODE,CATEGORYCODE,CATEGORYNAME,CREATEDDATE) 
                                      VALUES
                                      (${this.$store.state.cpr_password_info.companycode},${res.data.maxCtgryCode + 1},'${this.toSend.categoryName}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`

                  const addUrl = `${this.api}/addItems`
                  axios.post(addUrl, this.toSend).then(()=>{
                    this.$emit(`toReload`, true)
                    this.$toast.success('Successfully!',`Added Category`,this.notif.options.success)
                    this.close()
                    this.toSend = {}
                  })
                })
            }else if(isAddOrEdit =='EDIT CATEGORY'){
              this.toSend.sqlquery = `UPDATE companypresent_m_categories 
                                      SET 
                                        CATEGORYNAME ='${this.toSend.categoryName}',
                                        UPDATEDDATE  ='${moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}' 
                                      WHERE 
                                        CATEGORYCODE = ${this.toSend.categoryCode}`

              const editUrl =`${this.api}/updateItems`
              axios.post(editUrl, this.toSend).then(()=>{
                this.$emit('reloadUpdate', this.toSend)
                this.$toast.success('Successfully!',`Updated Category`,this.notif.options.success)
                this.close()
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