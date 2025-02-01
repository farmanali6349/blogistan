const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteBlogsCollectionId: String(
    import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID
  ),
  appwriteAuthorsCollectionId: String(
    import.meta.env.VITE_APPWRITE_AUTHORS_COLLECTION_ID
  ),
  appwriteCategoriesCollectionId: String(
    import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID
  ),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export { config };
