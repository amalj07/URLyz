<template>
  <div class="register">
      <v-container>
          <!-- <div class="my-7">
                <p class="text-center text-h4">Create new account</p>
            </div> -->
            <v-row justify="center">
                <v-form class="mt-7" ref="loginForm">
                    <v-card
                        class="mt-16"
                        outlined
                        min-width="450">
                        <v-card-title class="justify-center">
                            Login to URLyz
                        </v-card-title>
                        <div class="px-10 pt-7">
                            <v-text-field
                                label="Email"
                                type="email"
                                outlined
                                dense
                                v-model="email"
                                :rules="inputRules.concat(emailRules)"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                type="password"
                                outlined
                                dense
                                v-model="password"
                                :rules="inputRules"
                            ></v-text-field>
                        </div>
                        <v-card-actions class="justify-center">
                            <v-btn
                                class="reg_btn"
                                text
                                color="blue darken-2 white--text"
                                @click="submitLogin">
                                Login
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-row>   
      </v-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            inputRules: [
                value => value.length > 0 || 'required',
            ],
            emailRules: [ 
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    methods: {
        submitLogin() {
            if(this.$refs.loginForm.validate()) {
                console.log(this.email, this.password)
            }
        }
    }
}
</script>

<style>
.v-btn.reg_btn::before {
  background-color: transparent;
}
</style>