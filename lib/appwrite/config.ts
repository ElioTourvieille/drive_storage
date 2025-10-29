export const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    apiKey: process.env.NEXT_PUBLIC_APPWRITE_SECRET!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
    fileCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILE_COLLECTION!,
    sessionCollectionId: process.env.NEXT_PUBLIC_APPWRITE_SESSION_COLLECTION!,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
}