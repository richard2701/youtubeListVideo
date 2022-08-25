<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-3 gap-4">
        <article v-for="(card, index) in dataVideo" :key="index" class="relative z-1 cursor-pointer">
          <img :src="card.snippet.thumbnails.medium.url" alt="" class="z-1 hover:filter sepia" @click="$emit('item-select', card)">
          <img
            src="@/assets/images/close.svg"
            alt=""
            class="absolute z-4 top-0 right-0 bg-white hover:bg-red-500 cursor-pointer"
            @click="$emit('remove-select', card)">
        </article>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    dataVideo: {
      type: Array || Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      cards: [
        {
          id: '',
          title: 'asd',
          description: '',
          img: 'image8.svg'
        },
        {
          id: '',
          title: 'asqweqwed',
          description: '',
          img: 'image8.svg'
        },
        {
          id: '',
          title: 'asqweqasaswed',
          description: '',
          img: 'image8.svg'
        },
        {
          id: '',
          title: 'qwqw',
          description: '',
          img: 'image8.svg'
        },
        {
          id: '',
          title: 'wwwwww',
          description: '',
          img: 'image8.svg'
        },
        {
          id: '',
          title: 'qqqqqqqq',
          description: '',
          img: 'image8.svg'
        }
      ]
    }
  }
}
</script>

<style>

</style>