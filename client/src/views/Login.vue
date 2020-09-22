<template>
  <div class="register">
      <v-container>
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
                            <v-btn
                                text
                                :ripple=false
                                class="reg_btn mt-n3 ml-n4"
                                color="blue darken-2 white--text"
                                @click="forgetPassword">
                                <span class="text-body-2 text-capitalize">Forgot password ?</span> <br>
                            </v-btn>
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
                                <v-btn
                                    text
                                    :ripple=false
                                    :disabled="this.resendotpbtn_status"
                                    class="reg_btn mt-n3 ml-n4"
                                    color="blue darken-2 white--text"
                                    @click="resendOTP">
                                    <span class="text-body-2 text-capitalize" v-if="this.resendotpbtn_status">Resend OTP in {{ this.resendOtpTimer }} seconds.</span>
                                    <span class="text-body-2 text-capitalize" v-else >Resend OTP</span> <br>
                                </v-btn>
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
                    class="reg_btn"
                    v-model="successSnackbar">
                    {{ this.snackbarText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        :ripple=false
                        color="green"
                        class="reg_btn"
                        text
                        v-bind="attrs"
                        @click="successSnackbar = false"
                        >
                        <v-icon left>close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar> 
                <v-snackbar
                    text
                    top
                    color="error"
                    class="reg_btn"
                    v-model="errorSnackbar">
                    {{ this.snackbarText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        :ripple=false
                        color="error"
                        class="reg_btn"
                        text
                        v-bind="attrs"
                        @click="errorSnackbar = false"
                        >
                        <v-icon left>close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar> 
      </v-container>
  </div>
</template>

<script>
import swal from 'sweetalert2';
window.swal = swal
export default {
    data() {
        return {
            email: '',
            password: '',
            otp: '',
            loading: false,
            disabled: false,
            notVerified: false,
            successSnackbar: false,
            errorSnackbar: false,
            snackbarText: '',
            resendOtpTimer: 30,
            resendotpbtn_status: true,
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
                let url = `${this.$serverURLI}/api/user/user_login`
                this.$http.post(url, {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.loading = false
                    this.disabled = false
                    if(response.data.MSG === 'login_success'){
                        this.$cookies.set("sid", response.data.user.sid)
                        this.$cookies.set("t",response.data.user.token)
                        // this.$router.push({name: 'Dashboard'})
                        // window.location.href = `${this.$serverURLI}`
                        window.location.href = process.env.VUE_APP_CLIENT_URL
                    }else {
                        this.errorSnackbar = true,
                        this.snackbarText = 'Something went wrong!'
                    }
                }).catch(error => {
                    this.loading = false
                    this.disabled = false
                    if(error.response.data == 'Account not verified'){
                        this.notVerified = true
                        this.resentOtpCountDown()
                    }else if(error.response.data == 'Invalid email or password') {
                        this.email = ''
                        this.errorSnackbar = true,
                        this.snackbarText = error.response.data
                    }else {
                        this.email = ''
                        this.snackbar = true
                        this.snackbarText = 'Something went wrong!'
                    }
                })
            }
        },
        verifyAccount() {
            if(this.$refs.loginForm.validate()) {
                this.loading = true
                this.disabled = true
                let url = `${this.$serverURLI}/api/user/user_account/verify`
                this.$http.post(url, {
                    otp: this.otp,
                    email: this.email
                }).then(() => {
                    this.otp = ''
                    this.loading = false
                    this.disabled = false
                    this.notVerified = false
                    swal.fire({
                        title: "Account Verified",
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonText: 'Go to Dashboard',
                    }).then(() =>{
                        this.submitLogin()
                    })
                }).catch(error => {
                    this.otp = ''
                    this.loading = false
                    this.disabled = false
                    this.errorSnackbar = true
                    if(error.response.data == 'Failed to veriy user') {
                        this.snackbarText = error.response.data
                    } else if(error.response.data == 'Invalid OTP') {
                        this.snackbarText = error.response.data
                    } else {
                        this.snackbarText = 'Something went wrong'
                    }
                })
            }
        },
        resendOTP() {
            this.resendotpbtn_status = true
            this.resendOtpTimer = 30
            this.resentOtpCountDown()
            let url = `${this.$serverURLI}/api/user/user_account/resendotp`
            this.$http.post(url, {
                email: this.email
            }).then(response => {
                this.otp = ''
                this.successSnackbar = true
                this.snackbarText = response.data
            }).catch(error => {
                this.otp = ''
                this.errorSnackbar = true
                if(error.response.data == 'Invalid email'){
                    this.snackbarText = error.response.data
                } else if(error.response.data == 'Failed to send otp'){
                    this.snackbarText = error.response.data
                } else {
                    this.snackbarText = 'Something went wrong!'
                }
            })
        },
        resentOtpCountDown() {
            if(this.resendOtpTimer > 0) {
                setTimeout(() => {
                    this.resendOtpTimer -= 1
                    this.resentOtpCountDown()
                }, 1000);
            }else {
                this.resendotpbtn_status = false
            }
        },
        forgetPassword() {
            this.$router.push({name: "ForgotPassword"})
        }
    },
    created() {
        this.$cookies.remove("sid")
        this.$cookies.remove("t")
    }
}
</script>

<style>
.v-btn.reg_btn::before {
  background-color: transparent;
}
</style>