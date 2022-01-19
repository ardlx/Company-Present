<template>
  <v-row justify="center" no-gutters>
    <v-dialog
    v-model="transactionform"
    max-width="1000px"
    ref="dutyAllowanceDialog"
    persistent
    @keyup.esc="test()"
    >
      <v-card flat class="mx-auto" color="grey">
        <v-app-bar
        dark
        color="secondary"
        >
            <v-toolbar-title class="headline font-weight-bold">FLEXIBLE CLAIMING SYSTEM</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-container fluid>
          <v-card>
            <v-row no-gutters>
                <v-col cols="12" sm="2">
                    <v-subheader class="mt-2">
                        EMPLOYEE NAME :
                    </v-subheader>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card
                    class="pa-2 mt-2"
                    outlined
                    tile
                    >
                        {{}}
                    </v-card>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-subheader class="mt-2">
                        DEPARTMENT : 
                    </v-subheader>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card
                    class="pa-2 mt-2 mr-3"
                    outlined
                    tile
                    >
                        {{}}
                    </v-card>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-subheader>
                        EMPLOYEE CODE :
                    </v-subheader>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                        {{}}
                    </v-card>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-subheader>
                        DATE FILED : 
                    </v-subheader>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card
                    class="pa-2 mr-3"
                    outlined
                    tile
                    >
                        {{}}
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12">
                    <v-divider class="mx-4"></v-divider>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-subheader class="mt-5">
                        COVERED PERIOD FROM:
                    </v-subheader>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                    dense
                    outlined
                    class="mt-5"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-subheader class="mt-5">
                        TO:
                    </v-subheader>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                    dense
                    outlined
                    class="mt-5 mr-3"
                    >
                    </v-text-field>
                </v-col>
            </v-row>

            <v-divider class="mx-4 mb-4"></v-divider>

            <v-card flat class="mx-auto">
                <v-simple-table 
                fixed-header
                max-height="100%"
                class="text-weight-light simpletb ml-4 mr-4"
                >
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">Overtime Date</th>
                                <th class="text-center">No of Actual Hours</th>
                                <th class="text-center">Nature of Work</th>
                            </tr>
                        </thead>
                        <tbody
                        
                        >
                        <!-- v-for="(empData, i) in dutyAllowance"
                        :key="i" -->
                            <tr>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                            </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card>

            <v-divider class="mx-4 mb-4 mt-4"></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="close">
                CLOSE   
                <v-icon>
                    mdi-close-thick
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['openTransaction'],
  data: function(){
    return{
      transactionform : false,
    }
  },
  watch:{
    openTransaction(val){
      this.transactionform = val
    }
  },
  methods: {
    close(){
      this.$emit('close', false)
    },
  },
}
</script>