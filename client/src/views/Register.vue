<template>
  <div class="register">
      <v-container>
          <!-- <div class="my-7">
                <p class="text-center text-h4">Create new account</p>
            </div> -->
            <v-row justify="center">
                <v-form class="mt-10">
                    <v-card
                        outlined
                        min-width="450">
                        <v-card-title class="justify-center">
                            Create new account
                        </v-card-title>
                        <div class="px-10 pt-7">
                            <v-text-field
                                label="Name"
                                outlined
                                dense
                            ></v-text-field>
                            <v-text-field
                                label="Email"
                                outlined
                                dense
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                outlined
                                dense
                            ></v-text-field>
                            <v-text-field
                                label="Confirm password"
                                outlined
                                dense
                            ></v-text-field>
                        </div>
                        <v-card-actions class="justify-center">
                            <v-btn
                                class="reg_btn"
                                text
                                color="blue darken-2 white--text">
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

}
</script>

<style>
.v-btn.reg_btn::before {
  background-color: transparent;
}
</style>