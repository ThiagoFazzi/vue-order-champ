<template>
  <b-container class="w-100">
    <b-row>
      <b-col>
        <b-btn variant="success">
          <span>Add to cart</span>
          <span>{{ getTotalPrice.toFixed(2) }}</span>
        </b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-btn variant="dark">Add to Favorite</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-btn variant="outline-dark">Contact the brand</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Controls',
  computed: {
    ...mapGetters(['getTotalPrice']),
  },
};
</script>

<style lang="scss">
.btn {
  width: 100%;
  margin: .3rem;

  :first-child {
    float: left;
  }

  :last-child {
    float: right;
  }
}
</style>
