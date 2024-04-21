const config = {
    url: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    blogsCollectionId: String(import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID),
    authorsCollectionId: String(import.meta.env.VITE_APPWRITE_AUTHORS_COLLECTION_ID),
    commentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    categoriesCollectionId: String(import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID)
}

export { config }