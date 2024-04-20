import { Client, ID, Databases, Query } from "appwrite";
import config from "../config/config";

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.url)
            .setProject(config.projectId);
        this.databases = new Databases(this.client);
        
    }

    // 1.0 DATABASE BLOGS COLLECTION

    // 1.1 Create Blog
    async createBlog({title, slug, content, status, featuredImageSource, status, author}) {
        const publishDate = new Date();
        const updateDate = null;
        const comments = null;
        const likes = 0;
        const dislikes = 0;
        const databaseId = config.databaseId;
        const blogCollectionId = config.blogsCollectionId;
        const documentId = ID.unique();

        try {
            return await this.databases.createDocument(databaseId, blogCollectionId, documentId, {title, slug, content, status, featuredImageSource, likes, dislikes, status, author, publishDate, updateDate, comments})
        } catch (error) {
            console.log("DatabaseService :: createBlog() :: Error ", error);
            return false;
        }
    }

    // 1.2 Update Blog
    async updateBlog($id, {title, slug, content, status, featuredImageSource, likes, dislikes, status, author, publishDate, comments}) {

        const updateDate = new Date();
        
        const databaseId = config.databaseId;
        const blogCollectionId = config.blogsCollectionId;
        const documentId = $id;

        try {
            return await this.databases.updateDocument(databaseId, blogCollectionId, documentId, {title, slug, content, status, featuredImageSource, likes, dislikes, status, author, publishDate, updateDate, comments})
        } catch (error) {
            console.log("DatabaseService :: updateBlog() :: Error ", error);
            return false;
        }
    }

    // 1.3 Delete Blog
    async deleteBlog($id) {

        const databaseId = config.databaseId;
        const blogCollectionId = config.blogsCollectionId;
        const documentId = $id;

        try {
            return await this.databases.deleteDocument(databaseId, blogCollectionId, documentId);
        } catch (error) {
            console.log("DatabaseService :: updateBlog() :: Error ", error);
            return false;
        }
    }

    // 1.4 Get Blogs
    async getBlogs(query = [Query.equal("status", true)]) {

        const databaseId = config.databaseId;
        const blogCollectionId = config.blogsCollectionId;

        try {
            return await this.databases.listDocuments(databaseId, blogCollectionId, query);
        } catch (error) {
            console.log("DatabaseService :: getBlogs() :: Error ", error);
            return false;
        }
    }

    // 1.5 Get Blog
    async getBlog($id) {

        const databaseId = config.databaseId;
        const blogCollectionId = config.blogsCollectionId;
        const documentId = $id;

        try {
            return await this.databases.getDocument(databaseId, blogCollectionId, documentId);
        } catch (error) {
            console.log("DatabaseService :: getBlogs() :: Error ", error);
            return false;
        }
    }

    // 2.0 DATABASE AUTHORS COLLECTION

    // 2.1 Create Author
    async createAuthor({name, email, bio, contact, facebook, instagram, linkedIn, medium, twitter, blogs, categories}) {
        const databaseId = config.databaseId;
        const authorsCollectionId = config.authorsCollectionId;
        const documentId = ID.unique();

        try {
            return await this.databases.createDocument(databaseId, authorsCollectionId, databaseId, {name, email, bio, contact, facebook, instagram, linkedIn, medium, twitter, blogs, categories})
        } catch (error) {
            console.log("DatabaseService :: createAuthor() :: Error ", error);
            return false;
        }
    }

    // 2.2 Update Author
    async updateAuthor({$id, name, email, bio, contact, facebook, instagram, linkedIn, medium, twitter, blogs, categories}) {
        const databaseId = config.databaseId;
        const authorsCollectionId = config.authorsCollectionId;
        const documentId = $id;

        try {
            return await this.databases.updateDocument(databaseId, authorsCollectionId, databaseId, {name, email, bio, contact, facebook, instagram, linkedIn, medium, twitter, blogs, categories})
        } catch (error) {
            console.log("DatabaseService :: updateAuthor() :: Error ", error);
            return false;
        }
    }

    // 2.3 Delete Author
    async deleteAuthor($id) {
        const databaseId = config.databaseId;
        const authorsCollectionId = config.authorsCollectionId;
        const documentId = $id;

        try {
            return await this.databases.deleteDocument(databaseId,authorsCollectionId, databaseId);
        } catch (error) {
            console.log("DatabaseService :: deleteAuthor() :: Error ", error);
            return false;
        }
    }

    // 2.4 Get Author
    async getAuthor($id) {
        const databaseId = config.databaseId;
        const authorsCollectionId = config.authorsCollectionId;
        const documentId = $id;

        try {
            return await this.databases.getDocument(databaseId, authorsCollectionId, documentId);
        } catch (error) {
            console.log("DatabaseService :: getAuthor() :: Error ", error);
            return false;
        }
    }

    // 2.5 Get Author-s
    async getAuthors() {
        const databaseId = config.databaseId;
        const authorsCollectionId = config.authorsCollectionId;

        try {
            return await this.databases.getDocument(databaseId, authorsCollectionId);
        } catch (error) {
            console.log("DatabaseService :: getAuthors() :: Error ", error);
            return false;
        }
    }


    // 3.0 DATABASE COMMENTS COLLECTION

    // 3.1 Create Comment
    async createComment({comment, likes = 0, dislikes = 0, authors, blogs}) {
        const databaseId = config.databaseId;
        const commentsCollectionId = config.commentsCollectionId;
        const documentId = ID.unique();
        
        try {
            return await this.databases.createDocument(databaseId, commentsCollectionId, documentId, {comment, likes, dislikes, authors, blogs})
        } catch (error) {
            console.log("DatabaseService :: createComment() :: Error ", error);
            return false;
        }
    }

    // 3.2 Update Comment
    async updateComment({$id, comment, likes, dislikes, authors, blogs}) {
        const databaseId = config.databaseId;
        const commentsCollectionId = config.commentsCollectionId;
        const documentId = $id;
        
        try {
            return await this.databases.updateDocument(databaseId, commentsCollectionId, documentId, {comment, likes, dislikes, authors, blogs})
        } catch (error) {
            console.log("DatabaseService :: updateComment() :: Error ", error);
            return false;
        }
    }

    // 3.3 Delete Comment
    async deleteComment($id) {
        const databaseId = config.databaseId;
        const commentsCollectionId = config.commentsCollectionId;
        const documentId = $id;
        
        try {
            return await this.databases.deleteDocument(databaseId, commentsCollectionId, documentId);
        } catch (error) {
            console.log("DatabaseService :: deleteComment() :: Error ", error);
            return false;
        }
    }

    // 3.4 Get Comments
   async getComments() {
    const databaseId = config.databaseId;
    const commentsCollectionId = config.commentsCollectionId;
    
    try {
        return await this.databases.listDocuments(databaseId, commentsCollectionId)
    } catch (error) {
        console.log("DatabaseService :: getComments() :: Error ", error);
            return false;
    }
   }

    // 3.5 Get Comment
    async getComment($id) {
        const databaseId = config.databaseId;
        const commentsCollectionId = config.commentsCollectionId;
        const documentId = $id;
        
        try {
            return await this.databases.getDocument(databaseId, commentsCollectionId, documentId);
        } catch (error) {
            console.log("DatabaseService :: getComment() :: Error ", error);
            return false;
        }
    }

    // 4.0 DATABASE CATEGORIES COLLECTION
    
    // 4.1 Create Category
    async createCategory({category, isparent = true, blogs, author}) {
        const databaseId = config.databaseId;
        const categoriesCollectionId = config.categoriesCollectionId;
        const documentId = ID.unique();

        try {
            return await this.databases.createDocument(databaseId, categoriesCollectionId, databaseId, {category, isparent, blogs, author})
        } catch (error) {
            console.log("DatabaseService :: createCategory() :: Error ", error);
            return false;
        }
    }

    // 4.2 Update Category
    async updateCategory({$id, category, isparent, blogs, author}) {
        const databaseId = config.databaseId;
        const categoriesCollectionId = config.categoriesCollectionId;
        const documentId = $id;

        try {
            return await this.databases.updateDocument(databaseId, categoriesCollectionId, documentId, {category, isparent, blogs, author})
        } catch (error) {
            console.log("DatabaseService :: updateCategory() :: Error ", error);
            return false;
        }
    }

    // 4.3 Delete Category
    async deleteCategory($id) {
        const databaseId = config.databaseId;
        const categoriesCollectionId = config.categoriesCollectionId;
        const documentId = $id;

        try {
            return await this.databases.createDocument(databaseId, categoriesCollectionId, documentId)
        } catch (error) {
            console.log("DatabaseService :: deleteCategory() :: Error ", error);
            return false;
        }
    }

    // 4.4 Get Categories
    async getCategories() {
        const databaseId = config.databaseId;
        const categoriesCollectionId = config.categoriesCollectionId;
        
        try {
            return await this.databases.listDocuments(databaseId, categoriesCollectionId);
        } catch (error) {
            console.log("DatabaseService :: getCategories() :: Error ", error);
            return false;
        }
    }

    // 4.5 Get Category
    async getCategory($id) {
        const databaseId = config.databaseId;
        const categoriesCollectionId = config.categoriesCollectionId;
        const documentId = $id;
        
        try {
            return await this.databases.getDocument(databaseId, categoriesCollectionId, documentId);
        } catch (error) {
            console.log("DatabaseService :: getCategory() :: Error ", error);
            return false;
        }
    }
}