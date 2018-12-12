<template>
    <div class="container">
        <app-header></app-header>
        <hr>
        <div class="row">
            <servers></servers>
            <app-server-detail></app-server-detail>
        </div>
        <hr>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from './components/layout/Header'
    import Footer from './components/layout/Footer'
    import Servers from './components/server/Servers'
    import ServerDetail from './components/server/ServerDetails'

    export default {
        components: {
            appHeader: Header,
            'app-footer': Footer,
            Servers,
            'app-server-detail': ServerDetail
        }
    }
</script>

<style>

</style>
