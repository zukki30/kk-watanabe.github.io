<template>
    <div>
        <h1>Filters & Mixins2</h1>
        <!-- Exercise 1) -->
        <!-- Build a local Filter which reverses the Text it is applied on -->
        <p>{{ text | recersed }}</p>

        <!-- Exercise 2 -->
        <!-- Build a global Filter which counts the length of a word and it appends it -->
        <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
        <p>{{ text | textLength }}</p>
    </div>
</template>

<script>
    import { textMixin } from "./text";

    export default {
        data() {
            return {
                text: 'Filters & Mixin Test Secound'
            }
        },
        mixins: [textMixin]
    }
</script>

<style>
</style>
