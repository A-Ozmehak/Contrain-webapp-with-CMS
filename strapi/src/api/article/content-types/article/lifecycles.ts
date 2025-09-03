import slugify from 'slugify';

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.Title && !data.Slug) {
      const slug = slugify(data.Title, { lower: true, strict: true });
      data.Slug = `/articles/${slug}`;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.Title && !data.Slug) {
      const slug = slugify(data.Title, { lower: true, strict: true });
      data.Slug = `/articles/${slug}`;
    }
  },
};
