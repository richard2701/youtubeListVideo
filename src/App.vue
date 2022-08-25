<template>
  <div id="app">
    <div class="container mx-auto">
      <div class="pt-10">
        <div class="flex items-center justify-center flex-col">
          <div class="flex flex-col">
            <h1 class="text-2xl font-medium mb-4">
              Añadir nuevo video
            </h1>
            <div class="flex">
              <input v-model="video" type="text" :class="validation && errorMessage ? 'border-red-500 border-2 border-solid' : ''" class="input" placeholder="Agegar un video">
              <button class="button-primary" :disabled="loading" @click="getID()">
                Añadir
              </button>
            </div>
            <span v-if="validation && errorMessage" class="text-red-500">{{ errorMessage }}</span>
          </div>
          <div class="px-20 mt-20">
            <Modal v-if="show" :data="itemVideo" @close-modal="close()"/>
            <CardSection v-if="!loading" :data-video="itemsVideo" @item-select="itemSelect($event)" @remove-select="remove($event)" />
            <div class="flex items-center justify-center">
              <Spinner v-if="loading" />
            </div>
            <h2 class="text-3xl" v-if="itemsVideo.length === 0 && !loading">No tienes elementos en tu lista</h2>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import CardSection from './components/CardSection'
export default {
  name: 'App',
  components: {
    CardSection
  },
  data () {
    return {
      video: '',
      itemVideo: '',
      show: false,
      itemsVideo: [],
      loading: true,
      validation: false,
      errorMessage: 'Debes agregar una url ejem: https://www.youtube.com/watch?v=f02mOEt11OQ'
    }
  },
  created () {
    this.getAllVideo()
  },
  methods: {
    close () {
      this.show = !this.show
    },
    getID () {
      if (!this.video) { return this.validation = true }
      let ID = '';
      let url = this.video
      url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\\-]/i);
        ID = ID[0];
      }
      else {
        ID = url;
      }
      console.log(ID)
      if (Array.isArray(ID)) {
        this.errorMessage = "La url ingresado no es valida, ejem(https://www.youtube.com/watch?v=f02mOEt11OQ)"
        this.validation = true
      }else {
        this.validation = false
        this.getVideo(ID)
      }
    },
    async getVideo (id) {
      this.loading = true
      const response =  await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyBQ75Xi5cT9NUyvoNGzawGwzE0w2hVEut0&part=snippet`)
      const data = await response.json()
      if (data) {
       await fetch('https://2k6hjncltl.execute-api.us-east-1.amazonaws.com/all', {
        method: "post",
        headers: {
          "Content-Types": 'application/json'
        },
        body: JSON.stringify(data.items[0])
       })
       this.video = ''
       this.getAllVideo()
      }
    },
    async getAllVideo () {
      this.loading = true
      await fetch('https://2k6hjncltl.execute-api.us-east-1.amazonaws.com/all')
      .then((response) => response.json())
      .then((data) => this.itemsVideo = data.body)
      this.loading = false
    },
    itemSelect (item) {
      this.itemVideo = item
      this.show = true
    },
    async remove (item) {
      this.loading = true
      const response =  await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${item.id}&key=AIzaSyBQ75Xi5cT9NUyvoNGzawGwzE0w2hVEut0&part=snippet`)
      const data = await response.json()
      if (data) {
       await fetch('https://2k6hjncltl.execute-api.us-east-1.amazonaws.com/all', {
        method: "delete",
        headers: {
          "Content-Types": 'application/json'
        },
        body: JSON.stringify(data.items[0])
       })
       this.getAllVideo()
      }
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3C3E41;
  background: #F5F5F5;
  width: 100%;
  height: 100%;
}
</style>
