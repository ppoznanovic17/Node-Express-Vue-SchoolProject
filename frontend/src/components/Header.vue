<template>
    <div>

        <b-jumbotron header="Message Board" :lead="'Num messages: ' + posts.length">
        </b-jumbotron>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "Header",
        computed: {
            ...mapState(['posts'])
        }
    }
</script>

<style scoped>

</style>
