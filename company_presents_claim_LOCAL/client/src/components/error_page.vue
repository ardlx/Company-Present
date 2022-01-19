<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="4" md="7">
            <v-card class="elevation-2 mx-auto" max-width="900px" color="#ECEFF1" flat>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-card height="500" color="transparent" flat class="mx-auto mt-15">
                      <div class="display-3 text-center">
                        <h1>404</h1>
                        
                      </div>
                      <div class="display-3 text-right">
                        <v-img class="mx-auto mt-2" height="200px" width="150px" :src="url" elevation="10"> </v-img>
                      </div>
                      <div class="display-1 mt-2 text-center grey--text">
                        <h1>Page Not Found</h1>
                      </div>
                      <div class="blue--text mt-8 text-center">
                        The page you are looking for might have been removed had its name changed or is temporarily unavailable.
                      </div>
                      
                      <div class="blue--text text-center">
                        Try going back to dashboard and repeating your action.
                      </div>
                      <div class="paragraph-text mt-5 text-center">
                        <v-row>
                          <v-col cols="12">
                            <v-btn
                            outlined
                            rounded
                            color="primary"
                            @click="goBack()"
                            >
                            BACK TO DASHBOARD 
                            </v-btn>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: function (){
    return{
      url:require('../assets/web_icon.png'),
    }
  },
  methods:{
    goBack(){
      this.$router.push('/Dashboard')
    }
  }
}
</script>

<style scoped>
  .paragraph-text {
    font-size: 18px;
  }
  .centered{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%) 
  }
</style>