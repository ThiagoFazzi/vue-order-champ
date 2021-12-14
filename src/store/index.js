import Vue from 'vue';
import Vuex from 'vuex';
import { Product } from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: {},
    images: [],
    description: '',
    variants: [],
    cart: {},
  },
  getters: {
    getProductName: (state) => state.name,
    getImages: (state) => state.images,
    getDescription: (state) => state.description,
    getVariants: (state) => state.variants.map((variant) => variant.node),
    getCartVariantQuantity: (state) => (id) => state.cart.variants[id].quantity,
    getVariant: (state) => (id) => state.variants.reduce((acc, variant) => {
      // eslint-disable-next-line no-param-reassign
      if (variant.node.id === id) acc = variant.node;
      return acc;
    }, false),
    getTotalPrice: (state) => {
      const { variants } = state.cart;
      return variants
        ? Object.values(variants).reduce((acc, curr) => {
          // eslint-disable-next-line no-param-reassign
          acc += curr.price;
          return acc;
        }, 0) : 0;
    },
  },
  mutations: {
    setProductName(state, payload) {
      state.name = payload;
    },
    setImages(state, payload) {
      state.images = payload;
    },
    setDescription(state, payload) {
      state.description = payload;
    },
    setVariants(state, payload) {
      state.variants = payload;
    },
    setCart(state, payload) {
      state.cart = {
        ...state.cart,
        variants: payload,
      };
    },
    setVariantQuantity(state, payload) {
      const { id, quantity } = payload;
      const { variants } = state.cart;
      variants[id].quantity += quantity;
    },
    setVariantPrice(state, payload) {
      const { id, price } = payload;
      const { variants } = state.cart;
      variants[id].price += price;
    },
  },
  actions: {
    async fetchInitialData({ commit }) {
      const product = await Product.getProduct();
      const {
        name,
        listing:
          {
            images,
            variants,
            description,
          },
      } = product;

      commit('setProductName', name);
      commit('setImages', images.edges);
      commit('setDescription', description);
      commit('setVariants', variants.edges);

      const arrayVariants = variants.edges.map((variant) => variant.node);
      const objectVariants = arrayVariants.reduce((obj, item) => {
        if (item) {
          // eslint-disable-next-line no-param-reassign
          obj[item.id] = {
            quantity: 0,
            price: 0,
            msrp: 0,
          };
          return obj;
        }
        return obj;
      }, {});

      commit('setCart', objectVariants);
    },
    increaseVariantQuantity({ commit, getters }, payload) {
      const { id } = payload;
      const cartVariantQuantity = getters.getCartVariantQuantity(id);
      const variantPrice = getters.getVariant(id).price;
      const variantInventory = getters.getVariant(id).inventory;
      if (cartVariantQuantity < variantInventory) {
        commit('setVariantQuantity', { id, quantity: +1 });
        commit('setVariantPrice', { id, price: +variantPrice });
      }
    },
    decreaseVariantQuantity({ commit, getters }, payload) {
      const { id } = payload;
      const cartVariantQuantity = getters.getCartVariantQuantity(id);
      const variantPrice = getters.getVariant(id).price;
      if (cartVariantQuantity > 0) {
        commit('setVariantQuantity', { id, quantity: -1 });
        commit('setVariantPrice', { id, price: -variantPrice });
      }
    },
  },
});
