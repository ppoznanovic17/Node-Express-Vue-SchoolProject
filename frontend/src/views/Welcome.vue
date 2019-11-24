<template>
    <div>
        <div>
            <h1>WELCOME</h1>

        </div>
        <div>
            <router-link to="/auth/reg" >Register</router-link>
            <router-link to="/auth/log" >Log In</router-link>



        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import {mapState} from 'vuex';
    export default {
        name: "Welcome",
       computed: {
            ...mapState['users']
        },
        methods: {
            ...mapActions(['load_users'])
        },
        mounted: function() {
            this.load_users();

        }
    }
</script>

<style >

    h1{
        color: blue;
    }

</style>
