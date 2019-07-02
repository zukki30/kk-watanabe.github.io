<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Routing</h1>
                <hr>
                <router-view name="header-top"></router-view>
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
                <router-view name="header-bottom"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style>
    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        opacity: 1;
        transition: opacity 1s ease;
    }

    @keyframes slide-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }
    }
</style>
