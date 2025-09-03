export default {
  routes: [
    {
      method: 'POST',
      path: '/service',
      handler: 'service.sendEmail',
      config: {
        auth: false,
      },
    },
  ],
};
