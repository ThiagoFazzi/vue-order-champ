<template>
<b-container>
  <b-row>
    <b-col cols="2">
      <div class="scroller">
        <ul>
          <li v-for="image in getImages" :key="image.node.id" class="image-list">
            <img
              :src="image.node.modal"
              class="image-small"
              @click="setImagePreview(image.node.id)"/>
          </li>
        </ul>
      </div>
    </b-col>
    <b-col cols="10">
      <img
        :src="imagePreview || firstPhoto"
        class="image-preview" />
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PictureView',
  data() {
    return {
      imagePreview: '',
    };
  },
  computed: {
    ...mapGetters(['getImages']),
    firstPhoto() {
      return this.getImages[0]?.node.big || '';
    },
  },
  methods: {
    setImagePreview(id) {
      this.imagePreview = this.getImages.find((image) => image.node.id === id).node.big;
    },
  },
};
</script>
