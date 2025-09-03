export default {
    routes: [
      {
        method: 'POST',
        path: '/printing-form',
        handler: 'printing-form.sendEmail',
        config: {
          auth: false,
        },
      },
    ],
  };
  