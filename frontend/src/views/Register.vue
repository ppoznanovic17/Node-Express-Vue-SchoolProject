<template>

    <b-container fluid>
        <div>
            <p>{{msg}}</p>
        </div>
        <b-form>
            <b-row class="mt-2">
                <b-col sm="2" offset="2">
                    <b-input v-model="newUsername" class="mb-2 mr-sm-2 mb-sm-0" placeholder="username"></b-input>
                </b-col>
                <b-col sm="2">
                    <b-input v-model="newPassword" placeholder="password"></b-input>
                </b-col>
                <b-col sm="2">
                    <b-input v-model="newPicture" placeholder="picture link"></b-input>
                </b-col>
                <b-col sm="1">
                    <b-button variant="primary" size="lg" @click="addNew">Register</b-button>
                </b-col>
                <b-col sm="1">
                    <b-button variant="primary" size="lg" @click="cancle">GO Log In</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>

    import { mapActions } from 'vuex';

    export default {
        name: "Register",
        props: {
            username: {
                type: String,
                default: ''
            },
            password: {
                type: String,
                default: ''
            },
            picture: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                newUsername: '',
                newPassword: '',
                newPicture: '',
                msg: ''
            }
        },
        mounted: function () {
            this.newUsername = this.username;
            this.newPassword = this.password;
            this.newPicture = this.picture;
        },

        methods: {
            ...mapActions(['new_user']),

            addNew: function() {
                if(this.newUsername.length<4 || this.newUsername.length>15) {
                    this.msg="Username mora imati minimu 4 i maksimum 15 slova";

                    this.newUsername = "";
                    this.newPassword = "";
                    this.newPicture = "";
                }

                if(this.newPassword.length<1 || this.newPassword.length>10) {
                    this.msg="Pasword ne sme biti prazan i maksimum moze imati 10 slova";
                    this.newUsername = "";
                    this.newPassword = "";
                    this.newPicture = "";

                }


                const user = JSON.stringify({username: this.newUsername, password: this.newPassword, picture: this.newPicture});

                this.new_user(user);



                this.$router.push({path: `/auth/log`})

            },
            cancle: function () {
                this.$router.push({path: `/auth/log`})
            }

        }
    }
</script>

<style scoped>
p{
    color: red;
}
</style>
