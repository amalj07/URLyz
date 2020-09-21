<template>
    <div>
        <v-container>
            <center>
                <v-card
                    class="mt-16"
                    outlined
                    max-width=600
                >
                    <v-card-title
                        class="justify-center"
                    >
                        <p class="text-h5">Update Password</p>
                    </v-card-title>
                        <v-form ref="emailForm">
                            <v-text-field
                                :rules=emailRules
                                class="mt-n2 mx-10"
                                v-model="email"
                                label="Enter your email"
                            ></v-text-field>
                        </v-form>
                    <v-card-actions class="justify-center">
                        <v-btn
                            class="mb-5"
                            color="blue darken-2 white--text"
                            @click="checkEmail">
                            Update Password
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </center>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            emailRules: [
                v => v.length > 0 || 'Email is required',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    methods: {
        checkEmail() {
            if(this.$refs.emailForm.validate()) {
                console.log(this.email)
            }
        }
    }
}
</script>

<style>

</style>