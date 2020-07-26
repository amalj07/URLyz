<template>
  <div class="register">
      <v-container>
          <!-- <div class="my-7">
                <p class="text-center text-h4">Create new account</p>
            </div> -->
            <v-row justify="center">
                <v-form class="mt-10" ref="registerForm">
                    <v-card
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
                this.$refs.registerForm.validate()
                let url= 'http://localhost:5000/api/user/user_register'
                this.$http.post(url, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    console.log(response.data)
                }).catch(error => {
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
</style>