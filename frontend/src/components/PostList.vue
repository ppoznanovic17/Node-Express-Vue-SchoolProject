<template>
    <div>
        <b-table
                hover v-if="posts.length"
                sticky-header="800px"
                :items="posts"
                :fields="fields"
                head-variant="light"
               >
            <template v-slot:cell(action)="row">
                <b-button variant="danger" @click="">Delete</b-button>
            </template>
        </b-table>
        <h1 v-else>No messages</h1>
    </div>
</template>

<script>

    import { mapState, mapActions } from 'vuex';

    export default {
        name: "PostList",
        computed: {
            ...mapState(['posts'])
        },
        data() {
            return {
                fields: [
                    { key: 'header' },
                    { key: 'content' },
                    { key: 'data' },
                    {key: 'userid'}

                ]
            }
        },
        methods: {
            ...mapActions(['load_posts'])
        },
        mounted: function() {
            this.load_posts();
        }

    }
</script>

<style>
    tr:hover td{
        background: lightgreen;
    }
</style>
