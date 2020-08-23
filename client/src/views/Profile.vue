<template>
    <div>
        <NavDrawer />
        <div  class="mt-10 ml-8">
            <v-container>
                <h1 class="mb-10 text-decoration-underline grey--text text--darken-2 font-italic">My Profile</h1>
                <div>
                    <v-card outlined max-width="900">
                        <div class="ml-10">
                            <h3 class="my-3">Name:</h3>
                            <v-text-field
                                class="textfeildwidth ml-5 m"
                                dense
                                disabled
                                outlined
                                v-model="name"  
                            ></v-text-field>
                            <h3 class="mb-3">Email:</h3>
                            <v-text-field
                                class="textfeildwidth ml-5"
                                dense
                                disabled
                                outlined
                                v-model="email"  
                            ></v-text-field>
                        </div>
                    </v-card>
                </div>
            </v-container>
        </div>
    </div>
</template>

<script>
import NavDrawer from '@/components/NavDrawer'

export default {
    components: {
        NavDrawer
    },
    data() {
        return {
            name: '',
            email: ''
        }
    }
}
</script>

<style>
.textfeildwidth {
    max-width: 400px;
}
</style>