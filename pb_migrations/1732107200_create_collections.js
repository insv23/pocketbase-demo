migrate(
  (db) => {
    const dao = new Dao(db);

    try {
      const authors = new Collection({
        id: "authors",
        name: "authors",
        type: "base",
        listRule: "",
        viewRule: "",
        createRule: '@request.auth.id != ""',
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""',
        schema: [
          {
            name: "name",
            type: "text",
            required: true,
          }
        ],
      });

      const posts = new Collection({
        id: "posts",
        name: "posts",
        type: "base",
        listRule: "",
        viewRule: "",
        createRule: '@request.auth.id != ""',
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""',
        schema: [
          {
            name: "title",
            type: "text",
            required: true,
          },
          {
            name: "content",
            type: "text",
            required: true,
          },
          {
            name: "author",
            type: "relation",
            required: true,
            options: {
              collectionId: "authors",
              cascadeDelete: false,
              maxSelect: 1,
              minSelect: 1,
            }
          },
        ],
      });

      console.log("[2.1] create authors");
      dao.saveCollection(authors);
      
      console.log("[2.2] create posts");
      return dao.saveCollection(posts);
    } catch (err) {
      console.error("Failed to create collections:", err);
      throw err;
    }
  },
  (db) => {
    const dao = new Dao(db);
    try {
      ["posts", "authors"].forEach(name => {
        const collection = dao.findCollectionByNameOrId(name);
        if (collection) {
          dao.deleteCollection(collection);
          console.log(`${name} collection rolled back and deleted`);
        }
      });
    } catch (err) {
      console.error("Failed to delete collections:", err);
      throw err;
    }
  }
);
