<template>
    <div>
        <v-container>
            <center>
                <v-card
                    v-if="!verifyOtpCard"
                    class="mt-16"
                    outlined
                    max-width=600
                    :loading="this.loading"
                >
                    <v-card-title
                        class="justify-center"
                    >
                        <p class="text-h5">Update Password</p>
                    </v-card-title>
                        <v-form ref="emailForm">
                            <v-text-field
                                :rules=inputRules.concat(emailRules)
                                class="mt-n2 mx-10"
                                v-model="email"
                                label="Enter your email"
                                validate-on-blur
                            ></v-text-field>
                        </v-form>
                    <v-card-actions class="justify-center">
                        <v-btn
                            :disabled="this.disabled"
                            class="mb-5"
                            color="blue darken-2 white--text"
                            @click="checkEmail">
                            Update Password
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card
                    :loading="this.loading"
                    v-if="verifyOtpCard"
                    class="mt-16"
                    outlined
                    max-width=600
                >
                    <v-card-title>
                        <v-btn
                            text
                            class="backbtn"
                            @click="goback"
                        >
                            <v-icon
                                color="blue darken-2">
                                arrow_back
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                        <v-form ref="otpForm">
                            <v-text-field
                                :rules=inputRules
                                class="mt-n2 mx-10"
                                v-model="otp"
                                label="OTP"
                                validate-on-blur
                            ></v-text-field>
                        </v-form>
                        <v-btn
                            text
                            :ripple=false
                            :disabled="this.resendotpbtn_status"
                            class="reg_btn"
                            color="blue darken-2 white--text"
                            @click="resendOTP">
                            <span class="text-body-2 text-capitalize" v-if="this.resendotpbtn_status">Resend OTP in {{ this.resendOtpTimer }} seconds.</span>
                            <span class="text-body-2 text-capitalize" v-else >Resend OTP</span> <br>
                        </v-btn>
                    <v-card-actions class="justify-center">
                        <v-btn
                            :disabled="this.disabled"
                            class="mb-5"
                            color="blue darken-2 white--text"
                            @click="verifyOtp">
                            Verify
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-snackbar
                    text
                    top
                    color="success"
                    v-model="snackbar">
                    {{ this.snackbarText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        :ripple=false
                        color="success"
                        text
                        class="copy"
                        v-bind="attrs"
                        @click="snackbar = false"
                        >
                        <v-icon left>close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar>
                <v-dialog
                    overlay-color="indigo lighten-5"
                    max-width="450"
                    persistent
                    v-model="updatePasswordDialog">
                    <v-form ref="passwordForm">
                        <v-card
                            :loading="this.loadingPassword"    
                        >
                            <v-card-title class="justify-center blue--text text--darken-2">
                                Enter new password
                            </v-card-title>
                            <v-card-text class="pt-5">
                                <v-text-field
                                    class="mx-5"
                                    dense
                                    v-model="newPassword"
                                    :rules="inputRules"
                                    label="New password"
                                    type="password"
                                    outlined
                                    validate-on-blur
                                ></v-text-field>
                                <v-text-field
                                    class="mx-5"
                                    dense
                                    v-model="confirmPassword"
                                    :rules="inputRules.concat(confirmPasswordRule)"
                                    label="Confirm new password"
                                    type="password"
                                    outlined
                                    validate-on-blur
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn
                                    :disabled="this.disabled"
                                    text
                                    @click="updatePassword"
                                    class="verify_btn mb-3"
                                    color="blue darken-2 white--text">
                                    Update Password
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>
            </center>
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
            otp: '',
            newPassword: '',
            confirmPassword: '',
            loading: false,
            loadingPassword: false,
            disabled: false,
            snackbar: false,
            snackbarText: 'If the email is registered, an OTP will be send to the email',
            verifyOtpCard: false,
            updatePasswordDialog: false,
            resendOtpTimer: 30,
            resendotpbtn_status: true,
            inputRules: [
                value => value.length > 0 || 'Required',
            ],
            emailRules: [
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    methods: {
        checkEmail() {
            if(this.$refs.emailForm.validate()) {
                this.loading = true
                this.disabled =  true
                let url = `${this.$serverURLI}/user_details/forgetpassword`
                this.$http.post(url, {
                    email: this.email
                }).then(() => {
                    this.loading = false
                    this.disabled = false
                    this.snackbar = true
                    this.verifyOtpCard = true
                    this.resentOtpCountDown()
                })
            }
        },
        verifyOtp() {
            if(this.$refs.otpForm.validate()){
                this.loading = true
                this.disabled = true
                let url = `${this.$serverURLI}/user/user_account/verify`
                this.$http.post(url, {
                    email: this.email,
                    otp: this.otp
                }).then(() => {
                    this.loading = false
                    this.disabled = false
                    this.otp = ''
                    this.updatePasswordDialog = true
                }).catch(() => {
                    this.loading = false
                    this.disabled = false
                    this.snackbar = true
                    this.snackbarText = 'Invalid OTP'
                })
            }
        },
        updatePassword() {
            if(this.$refs.passwordForm.validate()){
                if(this.newPassword == '' || this.confirmPassword == '') {
                    this.errorSnackbar = true,
                    this.snackbarText = 'Enter a password'
                } else {
                    this.loadingPassword = true
                    this.disabled = true
                    let url = `${this.$serverURLI}/user_details/forget/updatepassword`
                    this.$http.post(url, {
                        email: this.email,
                        newPassword: this.newPassword,
                    }).then(() => {
                        this.loadingPassword = false
                        this.disabled = false
                        this.newPassword = ''
                        this.confirmPassword = ''
                        this.updatePasswordDialog =false
                        this.verifyOtpCard = false
                        swal.fire({
                        title: "Password updated",
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonText: 'Login',
                        }).then(() =>{
                            this.$router.push({name: 'Login'})
                        })
                    }).catch(() => {
                        this.newPassword = ''
                        this.confirmPassword = ''
                        this.snackbar = true
                        this.snackbarText = 'Failed to update password'
                    })
                }
            }
        },
        resendOTP() {
            this.resendotpbtn_status = true
            this.resendOtpTimer = 30
            this.resentOtpCountDown()
            let url = `${this.$serverURLI}/user/user_account/resendotp`
            this.$http.post(url, {
                email: this.email
            }).then(response => {
                this.otp = ''
                this.snackbar = true
                this.snackbarText = response.data
            }).catch(error => {
                this.otp = ''
                this.snackbar = true
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
        goback() {
            this.verifyOtpCard = false
        }
    },
    computed: {
        confirmPasswordRule() {
            return () => (this.newPassword === this.confirmPassword) || 'Passwords doesn\'t match'
        }
    },
}
</script>

<style>
.v-btn.backbtn::before {
  background-color: transparent;
}
</style>