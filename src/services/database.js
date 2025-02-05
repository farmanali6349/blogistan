import { Client, Databases, ID, Storage, Query } from "appwrite";
import { config } from "../config/config";

class DatabaseService {
  client = new Client();
  database;
  bucket;
  databaseId = config.appwriteDatabaseId;
  blogsCollectionId = config.appwriteBlogsCollectionId;
  authorsCollectionId = config.appwriteAuthorsCollectionId;
  categoriesCollectionId = config.appwriteCategoriesCollectionId;
  bucketId = config.appwriteBucketId;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  /*****************************************************************************
   * AUTHORS
   *****************************************************************************/

  // Create Author
  async createAuthor({
    $id,
    name,
    email,
    bio,
    facebook,
    instagram,
    linkedin,
    x,
    medium,
    blogs,
    categories,
  }) {
    const documentId = $id;
    try {
      const author = this.database.createDocument(
        this.databaseId,
        this.authorsCollectionId,
        documentId,
        {
          name,
          email,
          bio,
          blogs,
          categories,
          facebook,
          instagram,
          linkedin,
          x,
          medium,
        }
      );

      if (author) {
        return author;
      }
      return null;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: createAuthor() :: Error " + error
      );
    }
  }

  // Get All Authors
  async getAllAuthors() {
    try {
      const allAuthors = await this.database.listDocuments(
        this.databaseId,
        this.authorsCollectionId
      );

      if (allAuthors) {
        return allAuthors;
      }

      return null;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: getAllAuthors() :: Error " + error
      );
    }
  }

  // Get One Author ($id)
  async getAuthor({ $id }) {
    const documentId = $id;

    try {
      const author = await this.database.getDocument(
        this.databaseId,
        this.authorsCollectionId,
        documentId
      );

      if (author) {
        return author;
      }

      return null;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: getAuthor() :: Error " + error
      );
    }
  }

  // Update Author
  async updateAuthor({
    $id,
    name,
    email,
    bio,
    facebook,
    instagram,
    linkedin,
    x,
    medium,
    blogs,
    categories,
  }) {
    try {
      const documentId = $id;
      const updatedAuthor = await this.database.updateDocument(
        this.databaseId,
        this.authorsCollectionId,
        documentId,
        {
          name,
          email,
          bio,
          facebook,
          instagram,
          linkedin,
          x,
          medium,
          blogs,
          categories,
        }
      );

      if (updatedAuthor) {
        return updatedAuthor;
      }

      return null;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: updateAuthor() :: Error " + error
      );
    }
  }

  // *****************************************************************************

  /*****************************************************************************
   * POSTS
   *****************************************************************************/

  // Create Post
  async createPost({
    title,
    content,
    featuredImage,
    featuredImagePreview,
    author,
    categories,
  }) {
    try {
      const post = await this.database.createDocument(
        this.databaseId,
        this.blogsCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          featuredImagePreview,
          author,
          categories,
        }
      );

      if (post) {
        return post;
      }

      return null;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: createPost() :: Error " + error
      );
    }
  }

  // Update Post
  async updatePost({
    $id,
    title,
    content,
    featuredImage,
    featuredImagePreview,
    author,
    categories,
  }) {
    const documentId = $id;
    try {
      const updatedPost = await this.database.updateDocument(
        this.databaseId,
        this.blogsCollectionId,
        documentId,
        {
          title,
          content,
          featuredImage,
          featuredImagePreview,
          author,
          categories,
        }
      );

      if (updatedPost) {
        return updatedPost;
      }
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: updatePost() :: Error " + error
      );
    }
  }

  // Delete Post
  async deletePost({ $id }) {
    const documentId = $id;
    try {
      const deletedPost = await this.database.deleteDocument(
        this.databaseId,
        this.blogsCollectionId,
        documentId
      );

      if (deletedPost) {
        // Post deleted
      }
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: deletePost() :: Error " + error
      );
    }
  }

  // Get All Posts
  async getAllPosts() {
    try {
      const posts = await this.database.listDocuments(
        this.databaseId,
        this.blogsCollectionId
      );

      if (posts) {
        return posts;
      }
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: getAllPosts() :: Error " + error
      );
    }
  }

  // Get One Post
  async getPost({ $id }) {
    const documentId = $id;
    try {
      const post = await this.database.getDocument(
        this.databaseId,
        this.blogsCollectionId,
        documentId
      );

      if (post) {
        return post;
      }

      return null;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: getPost() :: Error " + error
      );
    }
  }

  /*****************************************************************************
   * STORAGE
   *****************************************************************************/
  // Upload File
  async uploadFile(file) {
    try {
      const newFile = await this.bucket.createFile(
        this.bucketId,
        ID.unique(),
        file
      );

      if (newFile) {
        return newFile;
      }

      return null;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: uploadFile() :: Error " + error
      );
    }
  }

  // Get File
  async getFile(fileId) {
    try {
      const file = await this.bucket.getFile(this.bucketId, fileId);

      if (file) {
        return file;
      }
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: getFile() :: Error " + error
      );
    }
  }

  // Delete File
  async deleteFile(fileId) {
    try {
      const deletedFileResponse = await this.bucket.deleteFile(
        this.bucketId,
        fileId
      );

      console.log("file deleted");

      if (deletedFileResponse) {
        return deletedFileResponse;
      }
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: deleteFile() :: Error " + error
      );
    }
  }

  async getFilePreview(fileId) {
    try {
      const filePreview = await this.bucket.getFilePreview(
        this.bucketId,
        fileId
      );

      if (filePreview) {
        return filePreview;
      }
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: getFilePreview() :: Error " + error
      );
    }
  }

  /*****************************************************************************
   * CATEGORIES
   *****************************************************************************/

  // Create Category
  async createCategory({ name, author, blogs }) {
    try {
      console.log("ColID: ", this.categoriesCollectionId);
      const category = await this.database.createDocument(
        this.databaseId,
        this.categoriesCollectionId,
        ID.unique(),
        {
          name,
          author,
          blogs,
        }
      );

      return category;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: createCategory() :: Error " + error
      );
    }

    return null;
  }

  // Update Category
  async updateCategory({ $id, name, author, blogs }) {
    const documentId = $id;
    try {
      const updCategory = await this.database.updateDocument(
        this.databaseId,
        this.categoriesCollectionId,
        documentId,
        {
          name,
          author,
          blogs,
        }
      );

      return updCategory;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: updateCategory() :: Error " + error
      );
    }

    return null;
  }

  // Get All Categories
  async getCategories() {
    try {
      const categories = await this.database.listDocuments(
        this.databaseId,
        this.categoriesCollectionId
      );

      return categories;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: getCategories() :: Error " + error
      );
    }
  }

  // Get Specific Category
  async getCategory({ $id }) {
    const documentId = $id;

    try {
      const category = await this.database.getDocument(
        this.databaseId,
        this.categoriesCollectionId,
        documentId
      );

      return category;
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: getCategory() :: Error " + error
      );
    }

    return null;
  }

  // Delete Category
  async deleteCategory({ $id }) {
    const documentId = $id;

    try {
      const delCategory = await this.database.deleteDocument(
        this.databaseId,
        this.categoriesCollectionId,
        documentId
      );
    } catch (error) {
      console.log(
        "APPWRITE :: SERVICES :: DATABASE :: deleteCategory() :: Error " + error
      );
    }
  }
  /*****************************************************************************/
}
const databaseService = new DatabaseService();

export default databaseService;
