<template>
    <div>
        <NavDrawer />
        <div  class="mt-3 ml-8">
            <v-container>
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
                                    v-if="!saveName"
                                    class="ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="editUserName">
                                    <v-icon small>edit</v-icon>
                                    <span>Edit</span>
                                </v-btn>
                                <v-btn
                                    v-if="saveName"
                                    class="ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="saveUserName(name, 'name')">
                                    <v-icon small>save</v-icon>
                                    <span>Save</span>
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
                                    v-if="!saveEmail"
                                    class="ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="editUserEmail">
                                    <v-icon small>edit</v-icon>
                                    <span>Edit</span>
                                </v-btn>
                                <v-btn
                                    v-if="saveEmail"
                                    class="ml-2 mt-1 blue--text text--darken-2"
                                    text
                                    small
                                    @click="saveUserEmail">
                                    <v-icon small>save</v-icon>
                                    <span>Save</span>
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
                                    class="red white--text">
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
            password: ''
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
            this.updateUser({ name, type })
        },
        saveUserEmail() {
            this.saveEmail = false
            this.disabledEmail = true
        },
        changeUserPassword() {}
    },
    computed: {
        name: {
            get() {
                return this.$store.getters.user.name
            },
            set (value) {
            this.$store.commit('userUpdate', value)
    }
        },
        email: {
            get() {
                return this.$store.getters.user.email
            }
        }
    }
}
</script>

<style>
.textfeildwidth {
    max-width: 400px;
}
</style>