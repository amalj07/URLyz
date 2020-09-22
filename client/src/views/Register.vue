<template>
  <div class="register">
      <v-container>
        <v-dialog
            overlay-color="indigo lighten-5"
            max-width="500"
            persistent
            v-model="userVerifyDialog">
            <v-form ref="verifyUserForm">
                <v-card
                    :loading="this.loadverify_form">
                    <v-card-title class="justify-center blue--text text--darken-2">
                        Verify Account
                    </v-card-title>
                    <v-card-text class="pt-5">
                        <p>Enter the OTP send to {{ this.email }}</p>
                        <v-text-field
                            v-model="registerOTP"
                            :rules="inputRules"
                            label="OTP"
                            outlined    
                        ></v-text-field>
                        <p class="text-caption">It will take upto 1 min to recive the confirmation email</p>
                        <v-btn
                            text
                            :ripple=false
                            :disabled="this.resendotpbtn_status"
                            id="resendotp"
                            class="reg_btn mt-n3 ml-n4"
                            color="blue darken-2 white--text"
                            @click="resendOTP">
                            <span class="text-body-2 text-capitalize" v-if="this.resendotpbtn_status">Resend OTP in {{ this.resendOtpTimer }} seconds.</span>
                            <span class="text-body-2 text-capitalize" v-else >Resend OTP</span> <br>
                        </v-btn>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="verifyOTP"
                            :disabled="this.verify_btnStatus"
                            class="verify_btn mb-3 mr-4"
                            color="blue darken-2 white--text">
                            Verify Account
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
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
                    class="verify_btn"
                    color="green"
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
                    class="verify_btn"
                    text
                    v-bind="attrs"
                    @click="errorSnackbar = false"
                    >
                    <v-icon left>close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar> 
            <v-row justify="center">
                <v-form class="mt-10" ref="registerForm">
                    <v-card
                        :loading="this.loadreg_form"
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
                                :disabled="this.reg_btnStatus"
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
import swal from 'sweetalert2';
window.swal = swal
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            loadreg_form: false,
            reg_btnStatus: false,
            userVerifyDialog: false,
            registerOTP: '',
            loadverify_form: false,
            verify_btnStatus: false,
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
        registerUser() {
            if(this.$refs.registerForm.validate()) {
                this.loadreg_form = true
                this.reg_btnStatus = true
                let url= `${this.$serverURLI}/api/user/user_register`
                this.$http.post(url, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(() => {
                    this.loadreg_form = false
                    this.reg_btnStatus = false
                    this.userVerifyDialog = true
                    this.resentOtpCountDown()
                }).catch(error => {
                    this.name = ''
                    this.email = ''
                    this.password = ''
                    this.confirmPassword = ''
                    this.loadreg_form = false
                    this.reg_btnStatus = false
                    this.errorSnackbar = true
                    if(error.response.data == 'Failed to register user') {
                        this.snackbarText = error.response.data
                    }else if(error.response.data == 'Email already registered') {
                        this.snackbarText = error.response.data
                    }else {
                        this.snackbarText = 'Something went wrong!'
                    }
                })
            }     
        },
        verifyOTP() {
            if(this.$refs.verifyUserForm.validate()) {
                this.loadverify_form = true
                this.verify_btnStatus = true
                let url = `${this.$serverURLI}/api/user/user_account/verify`
                this.$http.post(url, {
                    otp: this.registerOTP,
                    email: this.email
                }).then( () => {
                    this.loadverify_form = false
                    this.verify_btnStatus = false
                    this.userVerifyDialog = false
                    this.registerOTP = ''
                    swal.fire({
                        title: "Account Verified",
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonText: 'Go to Dashboard',
                    }).then(() =>{
                        this.submitLogin()
                    })
                }).catch(error => {
                    this.registerOTP = ''
                    this.loadverify_form = false
                    this.verify_btnStatus = false
                    this.userVerifyDialog = false
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
                this.successSnackbar = true
                this.snackbarText = response.data
            }).catch(error => {
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
        submitLogin() {
            this.loading = true
            this.disabled = true
            let url = `${this.$serverURLI}/api/user/user_login`
            this.$http.post(url, {
                email: this.email,
                password: this.password
            }).then(response => {
                this.loading = false
                this.disabled = false
                if(response.data === 'login_success'){
                    // window.location.href = `${this.$serverURLI}`
                    window.location.href = process.env.VUE_APP_CLIENT_URL
                }else {
                    this.errorSnackbar = true,
                    this.snackbarText = 'Something went wrong!'
                }
            }).catch(() => {
                this.snackbar = true
                this.snackbarText = 'Something went wrong!'
            })
        }
    },
    computed: {
        confirmPasswordRule() {
            return () => (this.password === this.confirmPassword) || 'Passwords doesn\'t match'
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
.v-btn.verify_btn::before {
  background-color: transparent;
}
#resendotp {
    cursor: pointer;
}
</style>