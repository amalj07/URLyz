<template>
  <div class="register">
      <v-container>
        <v-dialog
            overlay-color="indigo lighten-5"
            max-width="500"
            persistent
            v-model="userVerifyDialog">
            <v-card>
                <v-card-title class="justify-center">
                    Verify Account
                </v-card-title>
                <v-card-text class="pt-11">
                    <p>Enter the OTP send to your mail</p>
                    <v-text-field
                        v-model="registerOTP"
                        :rules="inputRules"
                        label="OTP"
                        outlined    
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                        text
                        class="verify_btn mb-3 mr-4"
                        color="blue darken-2 white--text">
                        Verify Account
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
            <v-row justify="center">
                <v-form class="mt-10" ref="registerForm">
                    <v-card
                        :loading="this.loading"
                        outlined
                        min-width="450">
                        <v-card-title class="justify-center">
                            Create new account
                        </v-card-title>
                        <div class="px-10 pt-7">
                            <v-text-field
                                label="Name"
                                :rules="inputRules"
                                type="text"
                                outlined
                                dense
                                v-model="name"
                            ></v-text-field>
                            <v-text-field
                                label="Email"
                                :rules="inputRules.concat(emailRules)"
                                type="email"
                                outlined
                                dense
                                validate-on-blur
                                v-model="email"
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                :rules="inputRules"
                                type="password"
                                outlined
                                dense
                                v-model="password"
                            ></v-text-field>
                            <v-text-field
                                label="Confirm password"
                                :rules="inputRules.concat(confirmPasswordRule)"
                                type="password"
                                outlined
                                dense
                                validate-on-blur
                                v-model="confirmPassword"
                            ></v-text-field>
                        </div>
                        <v-card-actions class="justify-center">
                            <v-btn
                                :disabled="this.disabled"
                                class="reg_btn"
                                text
                                color="blue darken-2 white--text"
                                @click="registerUser">
                                Register
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
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            loading: false,
            disabled: false,
            userVerifyDialog: false,
            registerOTP: '',
            inputRules: [
                value => value.length > 0 || 'required',
            ],
            emailRules: [ 
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    methods: {
        registerUser() {
            if(this.$refs.registerForm.validate()) {
                this.loading = true
                this.disabled = true
                let url= 'http://localhost:5000/api/user/user_register'
                this.$http.post(url, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.loading = false
                    this.disabled = false
                    console.log(response.data)
                    this.userVerifyDialog = true
                }).catch(error => {
                    this.loading = false
                    this.disabled = false
                    console.log(error)
                })
            }     
        }
    },
    computed: {
        confirmPasswordRule() {
            return () => (this.password === this.confirmPassword) || 'Passwords doesn\'t match'
        }
    }
}
</script>

<style>
.v-btn.reg_btn::before {
  background-color: transparent;
}
.v-btn.verify_btn::before {
  background-color: transparent;
}
</style>