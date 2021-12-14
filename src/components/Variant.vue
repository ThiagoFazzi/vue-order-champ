<template>
  <b-container class="bv-example-row">
    <b-row class="mb-2 pb-3 line">
      <b-col cols="3">
        Quantity
      </b-col>
      <b-col cols="4">Variant</b-col>
      <b-col cols="2">Price</b-col>
      <b-col cols="1">MSRP</b-col>
      <b-col cols="1">Stock</b-col>
    </b-row>

    <b-row v-for="variant in getVariants" :key="variant.id" class="mb-2 pb-2 line">
      <b-col cols="3">
        <b-row align-h="between">
        <b-col><b-icon-dash @click="decreaseVariantQuantity({ id: variant.id })"/></b-col>
        <b-col><b-input :value="getCartVariantQuantity(variant.id)"/></b-col>
        <b-col><b-icon-plus @click="increaseVariantQuantity({ id: variant.id })"/></b-col>
        </b-row>
      </b-col>
      <b-col cols="4">{{ getVariant(variant.id).options[0].value || '' }}</b-col>
      <b-col cols="2">{{ variant.price }}</b-col>
      <b-col cols="1">{{ variant.msrp }}</b-col>
      <b-col cols="1">
        <b-icon-check v-if="getVariant(variant.id).inventory > 0" class="available"/>
        <b-icon-x v-else class="not-available"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Variant',
  computed: {
    ...mapGetters([
      'getVariants',
      'getCartVariantQuantity',
      'getVariant',
    ]),
  },
  methods: {
    ...mapActions([
      'increaseVariantQuantity',
      'decreaseVariantQuantity',
    ]),
  },
};
</script>

<style lang="scss">
.available {
  color: green;
}
.not-available {
  color: red;
}
.line {
  border-bottom: lightgray solid 1px;
}
</style>
