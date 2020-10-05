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
                    console.log("success")
                }).catch(error => {
                    this.loading = false,
                    this.disabled = false
                    console.log(error)
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