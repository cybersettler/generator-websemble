module.exports = {
  persistence: {
    catalog: [
      {
        // supported attributes include NeDB options object
        // see https://github.com/louischatriot/nedb#creatingloading-a-database
        collectionName: "demo"
      }
    ]
  },
  resources: {
    i18n: "frontend/assets/locales"
  }
};
