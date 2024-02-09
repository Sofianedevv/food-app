module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],

    // Pour faire fonctionner le .env
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
