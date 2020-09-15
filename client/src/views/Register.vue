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
                    <v-card-title class="justify-center">
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
                        <p class="text-caption">It will take upto 5 min to recive the confirmation email</p>
                        <p
                            id="resendotp"
                            class="text-caption blue--text text--darken-2"
                            @click="resendOTP"
                        >Resend OTP</p>
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
        registerUser() {
            if(this.$refs.registerForm.validate()) {
                this.loadreg_form = true
                this.reg_btnStatus = true
                let url= 'http://localhost:5000/api/user/user_register'
                this.$http.post(url, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    console.log(response.data)
                    if(response.data == 'email already registered') {
                        this.loadreg_form = false,
                        this.reg_btnStatus = false,
                        this.snackbar = true,
                        this.snackbarText = 'email already registered'
                    } else {
                        this.loadreg_form = false
                        this.reg_btnStatus = false
                        this.userVerifyDialog = true
                    }
                }).catch(error => {
                    this.loadreg_form = false
                    this.reg_btnStatus = false
                    console.log(error)
                })
            }     
        },
        verifyOTP() {
            if(this.$refs.verifyUserForm.validate()) {
                this.loadverify_form = true
                this.verify_btnStatus = true
                let url = 'http://localhost:5000/api/user/user_account/verify'
                this.$http.post(url, {
                    otp: this.registerOTP,
                    email: this.email
                }).then(response => {
                    console.log(response.data)
                    this.loadverify_form = false
                    this.verify_btnStatus = false
                    this.userVerifyDialog = false
                }).catch(error => {
                    console.log(error)
                    this.loadverify_form = false
                    this.verify_btnStatus = false
                })
            }
        },
        resendOTP() {
            console.log(this.email)
            let url = 'http://localhost:5000/api/user/user_account/resendotp'
            this.$http.post(url, {
                email: this.email
            }).then(response => {
                this.snackbar = true
                this.snackbarText = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
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
#resendotp {
    cursor: pointer;
}
</style>