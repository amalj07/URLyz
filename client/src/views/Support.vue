<template>
  <div>
      <v-container>
          <v-form ref="msgform">
              <v-card
                outlined
                width=700
                class="mt-7"
                :loading=this.loading
              >
                <v-card-text>
                    <v-text-field
                        label="Name"
                        v-model="name"
                        :rules="inputRules"
                        outlined
                        validate-on-blur
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        v-model="email"
                        type="email"
                        :rules="inputRules.concat(emailRules)"
                        outlined
                        validate-on-blur
                    ></v-text-field>
                    <v-text-field
                        label="Phone"
                        v-model="phone"
                        type="number"
                        :rules="inputRules"
                        outlined
                        validate-on-blur
                    ></v-text-field>
                    <v-textarea
                        label="Message"
                        v-model="message"
                        :rules="inputRules"
                        outlined
                        validate-on-blur
                    ></v-textarea>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                        :disabled=this.disabled
                        @click="sendMessage"
                        class="mb-3 mr-4"
                        color="blue darken-2 white--text">
                        Send Message
                        </v-btn>
                </v-card-actions>
              </v-card>
          </v-form>
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
      </v-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            message: '',
            loading: false,
            disabled: false,
            successSnackbar: false,
            errorSnackbar: false,
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
        sendMessage() {
            if(this.$refs.msgform.validate()) {
                this.loading = true,
                this.disabled = true
                let url = `${this.$serverURLI}/api/support`
                this.$http.post(url, {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    message: this.message
                }).then(() => {
                    this.loading = false
                    this.disabled = false
                    this.name = ''
                    this.email = ''
                    this.phone = ''
                    this.message = ''
                    this.successSnackbar = true,
                    this.snackbarText = "New support request created."
                }).catch(() => {
                    this.loading = false,
                    this.disabled = false
                    this.name = ''
                    this.email = ''
                    this.phone = ''
                    this.message = ''
                    this.errorSnackbar = true,
                    this.snackbarText = "Failed to create support request, Please try again"
                })
            }
        }
    }
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button, 
      input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          margin: 0; 
      }
</style>