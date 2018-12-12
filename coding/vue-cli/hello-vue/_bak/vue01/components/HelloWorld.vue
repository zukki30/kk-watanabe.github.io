<template>
  <div id="form">
    <input type="text" v-model="message.input">
    <div class="error" v-if="error.require">必須項目です。</div>
    <div class="error" v-if="error.tooLong">長すぎます</div>
    <div v-text="message.require"></div>
    <div v-html="message.html"></div>
    <div><input type="checkbox" @click="change" checked=""><span v-show="seen">表示中</span></div>

    <div>
      <input type="checkbox" @click="ifchange" checked="">
      <span v-if="ifseen">表示中</span>
      <span v-else>非表示中</span>
    </div>

    <div>
      <input type="radio" name="type" @click="type='A'" checked>
      <input type="radio" name="type" @click="type='B'">
      <input type="radio" name="type" @click="type='C'">
      <span v-if="type=='A'">Good morning.</span>
      <span v-else-if="type=='B'">Hello!</span>
      <span v-else>Bye!</span>
    </div>

    <div>
      <ul>
        <li v-for="color in colorList">{{ color }}</li>
      </ul>
    </div>

    <div>
      <button v-on:click="hello">Hello</button>
      <button @click="hello">Hello</button>
    </div>

    <div>
      <input type="button" v-bind:value="message1">
      <input type="button" :value="message2">
    </div>

    <div>
      <input v-model="message1">
      <div>Message: {{ message1 }}</div>
    </div>

    <div>
      <div v-pre>Message: {{ message1 }}</div>
      <div>Message: {{ message1 }}</div>
    </div>

    <div>
      <button onclick="location.reload()">再表示</button>
      <div>Message: <span v-cloak>{{ message1 }}</span></div>
      <div>Message: <span>{{ message1 }}</span></div>
    </div>

    <div>
      <input type="text" name="text1" v-model:value="message1">
      <div>Message: <span v-once>{{ message1 }}</span></div>
      <div>Message: <span>{{ message1 }}</span></div>
    </div>
  </div><!-- /#form -->
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      message: {
        input: 'Hello test',
        require: '必須項目です。',
        tooLong: '長すぎます。',
        html: '<b>HTML TEST</b>'
      },
      error: {
        require: false,
        tooLong: false
      },
      seen: true,
      ifseen: true,
      type: 'A',
      colorList: [ 'Red', 'Green', 'Blue' ],
      message1: 'Hello! test',
      message2: '押してみて'
    }
  },
  methods: {
    change: function (e) {
      this.seen = e.target.checked
    },
    ifchange: function (e) {
      this.ifseen = e.target.checked
    },
    hello: function () {
      alert('Hello!')
    }
  },
  watch: {
    message: function (newVal, oldVal) {
      this.error.require = (newVal.length < 1)
      this.error.tooLong = (newVal.length > 5)
    }
  }
}
</script>

<style lang="sass" scoped>
[v-cloak]
  display: none

#form
  margin-right: auto
  margin-left: auto
  padding: 30px
  max-width: 800px
  text-align: left
  .error
    margin-top: 10px
    color: red
  div
    margin-top: 50px
</style>
