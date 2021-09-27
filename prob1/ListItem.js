export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  template: /*html*/ `
    <li>
    {{ imageName }}
    <br>
    <a :href="userLink" target="external">{{data.user}}</a> |
    <a :href="imageLink" target="external">Image link</a>
  </li>
  `,
  computed: {
    imageLink() {
      return `https://en.wikipedia.org/wiki/${encodeURI(this.data.image)}`;
    },
    imageName() {
      return this.data.image.slice(5);
    },
    userLink() {
      return `https://en.wikipedia.org/wiki/User:${encodeURI(this.data.user)}`;
    },
  }
}
