<template>
    <div>
        <NavDrawer />
        <div  class="mt-3 ml-8">
            <v-container>
                <v-dialog
                    overlay-color="indigo lighten-5"
                    max-width="450"
                    persistent
                    v-model="updatePasswordDialog">
                    <v-form ref="verifyUserForm">
                        <v-card
                            :loading="this.loading">
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
                                ></v-text-field>
                                <v-text-field
                                    class="mx-5"
                                    dense
                                    v-model="confirmPassword"
                                    :rules="inputRules.concat(confirmPasswordRule)"
                                    label="Confirm new password"
                                    type="password"
                                    outlined    
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn
                                    text
                                    @click="updatePassword"
                                    :disabled="this.disabled"
                                    class="verify_btn mb-3"
                                    color="blue darken-2 white--text">
                                    Update Password
                                </v-btn>
                                <v-btn
                                    text
                                    @click="cancelUpdate"
                                    class="verify_btn mb-3 mr-4"
                                    color="blue darken-2 white--text">
                                    Cancel
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>
                <v-dialog
                    overlay-color="indigo lighten-5"
                    max-width="500"
                    persistent
                    v-model="deleteAccountDialog">
                    <v-form ref="verifyUserForm">
                        <v-card
                            :loading="this.loading">
                            <v-card-title class="justify-center red--text text--darken-2">
                                Delete Account
                            </v-card-title>
                            <v-card-text class="pt-5">
                                <p class="mx-5 mb-5 text-body-1">Are you sure want to delete your account?</p>
                                <v-text-field
                                    class="mx-5"
                                    dense
                                    v-model="deleteAccountPassword"
                                    :rules="inputRules"
                                    label="Password"
                                    type="password"
                                    outlined    
                                ></v-text-field>
                                <p class="mx-5">Deleting your account removes all the data and urls associated with your account. This action cannot be undone</p>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn
                                    text
                                    @click="confirmDeleteAccount"
                                    :disabled="this.disabled"
                                    class="verify_btn mb-3 mr-2"
                                    color="red darken-2 white--text">
                                    Delete Account
                                </v-btn>
                                <v-btn
                                    text
                                    @click="cancelDeleteAccount"
                                    class="verify_btn mb-3 mr-5"
                                    color="blue darken-2 white--text">
                                    Cancel
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>
                <v-snackbar
                    text
                    top
                    color="success"
                    class="update_btn"
                    v-model="successSnackbar">
                    {{ this.snackbarText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        :ripple=false
                        color="green"
                        class="update_btn"
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
                    class="update_btn"
                    v-model="errorSnackbar">
                    {{ this.snackbarText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        :ripple=false
                        color="error"
                        class="update_btn"
                        text
                        v-bind="attrs"
                        @click="errorSnackbar = false"
                        >
                        <v-icon left>close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar> 
                <h1 class="mb-7 text-decoration-underline grey--text text--darken-2 font-italic">My Profile</h1>
                <div>
                    <v-card class="mb-2" outlined max-width="900">
                        <div class="ml-10">
                            <h3 class="my-3">Name:</h3>
                            <v-row>
                                <v-text-field
                                    class="textfeildwidth ml-5 m"
                                    dense
                                    :disabled="this.disabledName"
                                    outlined
                                    v-model="name"
                                ></v-text-field>
                                <v-btn
                                    :ripple=false
                                    v-if="!saveName"
                                    class="update_btn ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="editUserName">
                                    <v-icon small>edit</v-icon>
                                    <span>Edit</span>
                                </v-btn>
                                <v-btn
                                    :ripple=false
                                    v-if="saveName"
                                    class="update_btn ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="saveUserName(name, 'name')">
                                    <v-icon small>save</v-icon>
                                    <span>Save</span>
                                </v-btn>
                                <v-btn
                                    :ripple=false
                                    v-if="saveName"
                                    class="update_btn ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="cancelSaveUserName">
                                    <v-icon small>cancel</v-icon>
                                    <span>Cancel</span>
                                </v-btn>
                            </v-row>
                            <h3 class="mb-3">Email:</h3>
                            <v-row>
                                <v-text-field
                                    class="textfeildwidth ml-5"
                                    dense
                                    :disabled="this.disabledEmail"
                                    outlined
                                    v-model="email"
                                ></v-text-field>
                                <v-btn
                                    :ripple=false
                                    v-if="!saveEmail"
                                    class="update_btn ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="editUserEmail">
                                    <v-icon small>edit</v-icon>
                                    <span>Edit</span>
                                </v-btn>
                                <v-btn
                                    :ripple=false
                                    v-if="saveEmail"
                                    class="update_btn ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="cancelSaveUserEmail">
                                    <v-icon small>save</v-icon>
                                    <span>Save</span>
                                </v-btn>
                                <v-btn
                                    :ripple=false
                                    v-if="saveEmail"
                                    class="update_btn ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="cancelSaveUserEmail">
                                    <v-icon small>cancel</v-icon>
                                    <span>Cancel</span>
                                </v-btn>
                            </v-row>
                        </div>
                    </v-card>
                    <v-card class="mt-7" outlined max-width="900">
                        <div class="ml-10">
                            <v-col class="mt-3">
                                <v-text-field
                                    class="textfeildwidth"
                                    dense
                                    outlined
                                    type="password"
                                    placeholder="Enter your current password"
                                    v-model="password"  
                                ></v-text-field>
                                <v-btn
                                    class="blue white--text mt-n2"
                                    @click="changeUserPassword">
                                    Change Password
                                </v-btn>
                            </v-col>
                            <v-col class="mt-4">
                                <v-btn
                                    class="red white--text"
                                    @click="deleteAccount">
                                    Delete Account
                                </v-btn>
                                <p class="caption mt-2 grey--text text--darken-1">Deleting your account removes all your account data.</p>
                            </v-col>
                        </div>
                    </v-card>
                </div>
            </v-container>
        </div>
    </div>
</template>

<script>
import NavDrawer from '@/components/NavDrawer'
import { mapActions } from 'vuex'

export default {
    components: {
        NavDrawer
    },
    data() {
        return {
            saveName: false,
            disabledName: true,
            saveEmail: false,
            disabledEmail: true,
            password: '',
            loading: false,
            disabled: false,
            updatePasswordDialog: false,
            newPassword: '',
            confirmPassword: '',
            deleteAccountDialog: false,
            deleteAccountPassword: '',
            successSnackbar: false,
            errorSnackbar: false,
            snackbarText: '',
            inputRules: [
                value => value.length > 0 || 'required',
            ],
        }
    },
    methods: {
        ...mapActions(['updateUser']),
        editUserName() {
            this.saveName = true
            this.disabledName = false
        },
        editUserEmail() {
            this.saveEmail = true
            this.disabledEmail = false
        },
        saveUserName(name, type) {
            this.saveName = false
            this.disabledName = true
            this.updateUser({ data: name, type })
        },
        saveUserEmail(email, type) {
            this.saveEmail = false
            this.disabledEmail = true
            this.updateUser({ data: email, type })
        },
        cancelSaveUserName() {
            this.saveName = false
            this.disabledName = true
        },
        cancelSaveUserEmail() {
            this.saveEmail = false
            this.disabledEmail = true
        },
        changeUserPassword() {
            let url = `${this.$serverURLI}/api/user_details/verifypassword`
            this.$http.post(url, {
                sid: this.$cookies.get("sid"),
                token: this.$cookies.get("t"),
                password: this.password
            }).then(() => {
                    this.updatePasswordDialog = true
                    this.password = ''
            }).catch(error => {
                if(error.response.data == 'Invalid password' || error.response.data == 'Failed to verify password'){
                    this.password = ''
                    this.errorSnackbar = true,
                    this.snackbarText = error.response.data
                }else {
                    this.logout()
                }
            })
        },
        updatePassword() {
            if(this.$refs.verifyUserForm.validate()){
                if(this.newPassword == '' || this.confirmPassword == '') {
                    this.errorSnackbar = true,
                    this.snackbarText = 'Enter a password'
                } else {
                    let url = `${this.$serverURLI}/api/user_details/updatepassword`
                    this.$http.post(url, {
                        sid: this.$cookies.get("sid"),
                        token: this.$cookies.get("t"),
                        newPassword: this.newPassword,
                    }).then(() => {
                        this.newPassword = ''
                        this.confirmPassword = ''
                        this.updatePasswordDialog = false
                        this.successSnackbar = true
                        this.snackbarText = 'Password updated'
                    }).catch(error => {
                        this.newPassword = ''
                        this.confirmPassword = ''
                        if(error.response.data == "Failed to update password") {
                            this.updatePasswordDialog = false
                            this.errorSnackbar = true
                            this.snackbarText = error.response.data
                        }
                        else {
                            this.logout()
                        }
                    })
                }
            }
        },
        cancelUpdate() {
            this.updatePasswordDialog = false
        },
        deleteAccount(){
            this.deleteAccountDialog = true
        },
        confirmDeleteAccount() {
            if(this.deleteAccountPassword == '') {
                this.errorSnackbar = true
                this.snackbarText = 'Enter your password'
            } else {
                this.loading = true
                this.disabled = true
                let url = `${this.$serverURLI}/api/user/delete_account`
                this.$http.post(url, {
                    sid: this.$cookies.get("sid"),
                    token: this.$cookies.get("t"),
                    password: this.deleteAccountPassword
                }).then( () => {
                        this.password = ''
                        this.successSnackbar = true
                        this.snackbarText = 'User deleted succesfully'
                        this.logout()
                }).catch(error => {
                    if(error.response.data == 'Invalid password' || error.response.data == 'Failed to delete user'){
                        this.password = ''
                        this.loading = false
                        this.disabled = false
                        this.deleteAccountDialog = false
                        this.errorSnackbar = true
                        this.snackbarText = error.response.data
                    }else {
                        this.logout()
                    }
                })
            }
        },
        cancelDeleteAccount() {
            this.deleteAccountDialog = false
        },
        async logout() {
            let url = `${this.$serverURLI}/api/user/logout`
            this.$http.post(url, {
                sid: this.$cookies.get("sid"),
                token: this.$cookies.get("t")
            }).then(async () => {
                await this.$cookies.remove("sid")
                await this.$cookies.remove("t")
                // this.$router.push('/login')
                window.location.href = `${this.$serverURLI}`
            })
        }
    },
    computed: {
        name: {
            get() {
                return this.$store.getters.user.name
            },
            set (value) {
            this.$store.commit('userUpdateName', value)
            }
        },
        email: {
            get() {
                return this.$store.getters.user.email
            },
            set (value) {
            this.$store.commit('userUpdateEmail', value)
            }
        },
        confirmPasswordRule() {
            return () => (this.newPassword === this.confirmPassword) || 'Passwords doesn\'t match'
        }
    }
}
</script>

<style>
.textfeildwidth {
    max-width: 400px;
}
.v-btn.update_btn::before {
  background-color: transparent;
}
</style>