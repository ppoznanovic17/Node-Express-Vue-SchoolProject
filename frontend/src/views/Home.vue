<template>
    <div class="home">
        <div>
            <b-button variant="outline-primary" @click="go2">Home</b-button>
            <b-button variant="outline-primary" @click="go1">Profile</b-button>
        </div>

        <Header/>
        <b-container>
            <b-row>
                <b-col m="4" >

                    <PostList/>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import Header from '@/components/Header';
    import PostList from '@/components/PostList';


    export default {
        name: "Home",
        components:{
          Header,
          PostList
        },
        computed: {
            ...mapState(['log'])
        },
        methods: {
            go1: function() {
                let userId = 1;
                this.$router.push({ path: `/profile` }) // -> /user/123
            },
            go2: function() {

            }
        }






        }

</script>

<style scoped>

</style>
