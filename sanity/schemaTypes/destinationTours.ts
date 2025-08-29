export default {
  name: 'country',
  title: 'Country Tours',
  type: 'document',
  fields: [
    { name: 'name', title: 'Country Name', type: 'string' },
    {
      name: 'tours',
      title: 'Tours',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tour' }] }]
    }
  ]
}