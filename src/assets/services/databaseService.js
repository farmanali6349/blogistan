import { Client, ID, Databases, Query } from "appwrite";
import { config } from "../../../config/config";

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.url)
            .setProject(config.projectId);
        this.databases = new Databases(this.client);
        
    }

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

    async deleteBlog($id) {

        const databaseId = config.databaseId;
        const blogCollectionId = config.blogsCollectionId;
        const documentId = $id;

        try {
            return await this.databases.deleteDocument((databaseId, blogCollectionId, documentId));
        } catch (error) {
            console.log("DatabaseService :: updateBlog() :: Error ", error);
            return false;
        }
    }

    async getBlogs(query = [Query.equal("status", true)]) {

        const databaseId = config.databaseId;
        const blogCollectionId = config.blogsCollectionId;

        try {
            return await this.databases.deleteDocument((databaseId, blogCollectionId, query));
        } catch (error) {
            console.log("DatabaseService :: getBlogs() :: Error ", error);
            return false;
        }
    }

    async getBlog($id) {

        const databaseId = config.databaseId;
        const blogCollectionId = config.blogsCollectionId;
        const documentId = $id;

        try {
            return await this.databases.deleteDocument((databaseId, blogCollectionId, documentId));
        } catch (error) {
            console.log("DatabaseService :: getBlogs() :: Error ", error);
            return false;
        }
    }
}