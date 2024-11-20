migrate(
  (db) => {
    const dao = new Dao(db);

    // Create author records
    const authors = [
      {
        name: "George Orwell",
      },
      {
        name: "Jane Austen",
      },
      {
        name: "Ernest Hemingway",
      },
      {
        name: "Virginia Woolf",
      },
    ];

    // Save author records and store their IDs
    const authorIds = {};
    for (const author of authors) {
      const record = new Record(
        dao.findCollectionByNameOrId("authors"),
        author
      );
      dao.saveRecord(record);
      authorIds[author.name] = record.id;
    }

    console.log("[3.1] authors seeded");

    // Create post records
    const posts = [
      {
        title: "1984",
        content:
          "It was a bright cold day in April, and the clocks were striking thirteen...",
        author: authorIds["George Orwell"],
      },
      {
        title: "Animal Farm",
        content:
          "All animals are equal, but some animals are more equal than others...",
        author: authorIds["George Orwell"],
      },
      {
        title: "Pride and Prejudice",
        content:
          "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife...",
        author: authorIds["Jane Austen"],
      },
      {
        title: "The Old Man and the Sea",
        content:
          "He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish...",
        author: authorIds["Ernest Hemingway"],
      },
      {
        title: "Mrs. Dalloway",
        content: "Mrs. Dalloway said she would buy the flowers herself...",
        author: authorIds["Virginia Woolf"],
      },
    ];

    // Save all posts
    for (const post of posts) {
      const record = new Record(dao.findCollectionByNameOrId("posts"), post);
      dao.saveRecord(record);
    }

    console.log("[3.2] posts seeded");
  },
  (db) => {
    const dao = new Dao(db);

    try {
      // Delete posts first
      const posts = dao.findRecordsByExpr("posts");
      for (const post of posts) {
        dao.deleteRecord(post);
      }

      // Then delete authors
      const authors = dao.findRecordsByExpr("authors");
      for (const author of authors) {
        dao.deleteRecord(author);
      }

      console.log("All seed data removed");
    } catch (err) {
      console.error("Failed to remove seed data:", err);
      throw err;
    }
  }
);
