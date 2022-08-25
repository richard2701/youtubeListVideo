<template>
  <div>
    <div v-if="overlay" id="defaultModal" tabindex="-1" aria-modal="true"
      class="modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex transition-100">
      <div class="relative w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="shadow modal__content relative">
          <img src="@/assets/images/Union.svg" alt="close" class="absolute z-4 top-8 right-8 cursor-pointer" @click="$emit('close-modal',)">
          <div class="flex gap-4 justify-center items-center h-full relative">
            <div class="w-2/6 relative modal__img-thumbnails">
              <img :src="data.snippet.thumbnails.medium.url" alt="thumbnails" class="mw-100 h-100">
              <img src="@/assets/images/play.svg" alt="close" class="absolute z-4  cursor-pointer modal__button-play" @click="overlay = !overlay">
            </div>
            <div class="flex-1">
              <h3 class="text-3xl font-medium mb-2">
                {{ data.snippet.title }}
              </h3>
              <p class="text-2xl font-normal">
                {{ data.snippet.description.substring(0, 100)  }}
                Mario will go inside a giant Numberblocks, will he survive? Subscribe to never miss new videos! 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!overlay" class="modal--video overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex">
      <div>
        <button class="modal__button-back" @click="overlay = !overlay">
          <img src="@/assets/images/return.svg" alt="back" srcset="">
          volver
        </button>
        <iframe width="1192px" height="670px" :src="`https://www.youtube.com/embed/${data.id}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      overlay: true,
    }
  }
}
</script>

<style lang="scss">
.modal {
  background-color: rgba(#020202, 0.5);
  &--video {
    background: #F5F5F5;
  }
  &__content {
    background: #FBFBFB;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
    padding: 2rem 2rem;
    min-height: 346px;
    width: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__button-back {
    position: absolute;
    top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px 20px;
    gap: 5px;

    position: absolute;
    width: 250px;
    height: 57px;
    border: 1px solid #136AE4;

    border-radius: 10px;
  }
  &__button-play {
    width: 40px;
    top: calc(50% - 20px);
  }
  &__img-thumbnails {
    width: 264px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      object-fit: cover;
    }
  }
}
</style>