<template>

    <b-container fluid>

        <p> {{msg}} </p>
        <b-form>
            <b-row class="mt-2">
                <b-col sm="2" offset="2">
                    <b-input v-model="newUsername" class="mb-2 mr-sm-2 mb-sm-0" placeholder="username"></b-input>
                </b-col>
                <b-col sm="2">
                    <b-input v-model="newPassword" placeholder="password"></b-input>
                </b-col>

                <b-col sm="1">
                    <b-button variant="primary" size="lg" @click="log">LogIn</b-button>
                </b-col>
                <b-col sm="1">
                    <b-button variant="primary" size="lg" @click="reg">GO Register</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>

    import { mapMutations } from 'vuex';
    import {mapState} from 'vuex';

    export default {
        name: "LogIn",
        computed: {
            ...mapState(['users'])
        },
        props: {
            username: {
                type: String,
                default: ''
            },
            password: {
                type: String,
                default: ''
            },

        },
        data() {
            return {
                newUsername: '',
                newPassword: '',
                msg : ''
            }
        },
        mounted: function () {
            this.newUsername = this.username;
            this.newPassword = this.password;

        },
        methods: {
            ...mapMutations(['set_log']),

            log: function() {


                let exist = false;
                for(let i=0; i<this.users.length;i++){
                    if(this.users[i].username === this.newUsername &&
                        this.users[i].password === this.newPassword){
                        exist = true;
                    }
                }

                if(exist){
                    const user = JSON.stringify({username: this.newUsername, password: this.newPassword});
                    this.set_log(user);
                    this.$router.push({path: `/home`});
                }else{
                    this.msg='Pogresan username ili password!';
                    this.newUsername = '';
                    this.newPassword = '';
                }

            },
            reg: function () {
                this.$router.push({path: `/auth/reg`});
            }

        }
    }
</script>

<style scoped>
    p{
        color: red;
    }
</style>
