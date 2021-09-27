/*global Vue, */
import ListItem from './ListItem.js';
import { process } from './helpers.js';

// https://www.mediawiki.org/wiki/API:Images

Vue.createApp({
  template: /*html*/ `
  <form @submit.prevent>
    <input placeholder="Search Wikipedia" v-model.lazy="title">
    <button>Search</button> [max 50]
  </form>

  <ol>
    <ListItem v-for="item in list" :data="item"></ListItem>
  </ol>
  `,
  data() {
    return {
      title: '',
      list: [],
    };
  },
  components: {
    ListItem,
  },
  mounted() {
    this.title = 'New Jersey';
  },
  watch: {
    async title() {
      if (!this.title) return;
      this.list = await process(this.title);
    },
  },
}).mount('#app');
