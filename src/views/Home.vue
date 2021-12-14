<template>
  <b-container class="w-100">
    <b-row>
      <b-col cols="5">
        <PictureView />
      </b-col>
      <b-col cols="7">
        <b-row>
          <b-col cols="12">
            {{ getProductName }}
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <Variant />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5">
        {{ getDescription }}
      </b-col>
      <b-col cols="7">
        <Controls />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PictureView from '@/components/PictureView.vue';
import Variant from '@/components/Variant.vue';
import Controls from '@/components/Controls.vue';

export default {
  name: 'Home',
  components: {
    PictureView,
    Variant,
    Controls,
  },
  computed: {
    ...mapGetters(['getProductName', 'getImages', 'getDescription', 'getVariants']),
  },
  async created() {
    await this.fetchInitialData();
  },
  methods: {
    ...mapActions(['fetchInitialData']),
  },
};
</script>

<style lang="scss">
.scroller {
  height: 400px;
  width: 90px;
  overflow: auto;
  margin-right: .6rem;
}
.image-list {
  display: flex;
}
.image-small {
  width: 90%;
  box-sizing: border-box;
  margin: 1rem 0;

  &:hover {
    cursor: pointer;
  }
}
.image-preview {
  width: 100%;
  height: 400px;
  border: 1 solid black;
}
</style>
