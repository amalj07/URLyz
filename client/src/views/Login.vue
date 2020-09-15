<template>
  <div class="register">
      <v-container>
          <!-- <div class="my-7">
                <p class="text-center text-h4">Create new account</p>
            </div> -->
            <v-row justify="center">
                <v-form class="mt-7" ref="loginForm">
                    <v-card
                        :loading="this.loading"
                        class="mt-16"
                        outlined
                        min-width="450">
                        <v-card-title class="justify-center">
                            <div v-if="!notVerified">
                                Login to URLyz
                            </div>
                            <div v-if="notVerified">
                                Verify your account
                            </div>
                        </v-card-title>
                        <div class="px-10 pt-7">
                            <v-text-field
                                v-if="!notVerified"
                                label="Email"
                                type="email"
                                outlined
                                dense
                                v-model="email"
                                :rules="inputRules.concat(emailRules)"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                v-if="!notVerified"
                                label="Password"
                                type="password"
                                outlined
                                dense
                                v-model="password"
                                :rules="inputRules"
                            ></v-text-field>
                            <div v-if="notVerified">
                                <p class="text-caption">Enter the otp send to {{ this.email }}</p>
                                <v-text-field
                                    label="OTP"
                                    type="text"
                                    outlined
                                    dense
                                    v-model="otp"
                                    :rules="inputRules"
                                    validate-on-blur
                                ></v-text-field>
                                <p
                                    id="resendotp"
                                    class="text-caption blue--text text--darken-2"
                                    @click="resendOTP"
                                >Resend OTP</p>
                            </div>
                        </div>
                        <v-card-actions class="justify-center">
                            <v-btn
                                v-if="!notVerified"
                                :disabled="this.disabled"
                                class="reg_btn"
                                text
                                color="blue darken-2 white--text"
                                @click="submitLogin">
                                Login
                            </v-btn>
                            <v-btn
                                v-if="notVerified"
                                :disabled="this.disabled"
                                class="reg_btn"
                                text
                                color="blue darken-2 white--text"
                                @click="verifyAccount">
                                Verify Account
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-row> 
             <v-snackbar
                    text
                    top
                    color="success"
                    v-model="snackbar">
                    {{ this.snackbarText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        color="green"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                        >
                        <v-icon left>close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar> 
      </v-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            otp: '',
            loading: false,
            disabled: false,
            notVerified: false,
            snackbar: false,
            snackbarText: '',
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
                this.loading = true
                this.disabled = true
                let url = 'http://localhost:5000/api/user/user_login'
                this.$http.post(url, {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.loading = false
                    this.disabled = false
                    if(response.data.STATUS === 'SUCCESS') {
                        console.log(response.data)
                        if(response.data.MSG === 'login_success'){
                            this.$cookies.set("sid", response.data.user.sid)
                            this.$cookies.set("t",response.data.user.token)
                            // this.$router.push({name: 'Dashboard'})
                            window.location.href = 'http://localhost:8080/dashboard'
                        } else {
                            this.notVerified = true
                        }
                    } else {
                        this.snackbar = true,
                        this.snackbarText = 'Invalid email or password!'
                    }
                }).catch(error => {
                    this.loading = false
                    this.disabled = false
                    console.log(error)
                })
            }
        },
        verifyAccount() {
            if(this.$refs.loginForm.validate()) {
                this.loading = true
                this.disabled = true
                let url = 'http://localhost:5000/api/user/user_account/verify'
                this.$http.post(url, {
                    otp: this.otp,
                    email: this.email
                }).then(response => {
                    console.log(response.data)
                    this.loading = false
                    this.disabled = false
                    this.userVerifyDialog = false
                }).catch(error => {
                    console.log(error)
                    this.loading = false
                    this.disabled = false
                })
            }
        },
        resendOTP() {
            let url = 'http://localhost:5000/api/user/user_account/resendotp'
            this.$http.post(url, {
                email: this.email
            }).then(response => {
                this.snackbar = true
                this.snackbarText = response.data
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style>
.v-btn.reg_btn::before {
  background-color: transparent;
}
#resendotp {
    cursor: pointer;
}
</style>