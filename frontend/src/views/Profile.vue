<template>
    <div>
        <h1>PROFILE</h1>

        <b-container fluid >


            <b-form>
                <b-row class="mt-2">
                    <b-col sm="2" offset="2">
                        <b-input v-model="newHeader" class="mb-2 mr-sm-2 mb-sm-0" placeholder="header"></b-input>
                    </b-col>
                    <b-col sm="2">
                        <b-input v-model="newContent" placeholder="content"></b-input>
                    </b-col>


                    <b-col sm="1">
                        <b-button variant="primary" size="lg" @click="post">POST</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>

        <div>
            <b-table
                    hover v-if="posts.length"
                    sticky-header="800px"
                    :items="posts"
                    :fields="fields"
                    head-variant="light"
                    @row-clicked="editPost">
                <template v-slot:cell(action)="row">
                    <b-button variant="danger" @click="delete_post(row.item.id)">Delete</b-button>
                </template>
            </b-table>
            <h1 v-else>No messages</h1>
        </div>




    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';
    import Edit from '@/views/Edit';


    export default {
        name: "Profile",
        computed: {
            ...mapState(['log','posts'])
        },
        data() {

            return {
                fields: [
                    {key: 'id'},
                    { key: 'header' },
                    { key: 'content' },
                    { key: 'date' },
                    { key: 'userid' },
                    { key: 'action' }
                ],
                newHeader: '',
                newContent: ''
            }
        },


        methods: {
            ...mapActions(['load_posts','delete_post','new_post']),

            editPost: function (item, index, event) {
                this.$router.push
            },

            post: function (){
                const post = JSON.stringify({header: this.newHeader, content: this.newContent});
                this.new_post(post);



            },
            delete: function(id){
                this.delete_post(id.toString())
            }

        },
        mounted: function() {
            this.load_posts();
        }
    }
</script>

<style scoped>

</style>

