import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.company.aora',
  projectId:'663cdbaf0033a94178df',
  databaseId: '663d2ebf000db4d9d268',
  userCollectionId: '663d2ee2000293515960',
  videoCollectionId: '663d2fb2001ca70f3c71',
  storageId: '663d315a001484c80cc9',
};
// Init your react-native SDK
const client = new Client();  
client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform);  // Your application ID or bundle ID (if applicable)
// Register User
const account = new Account(client);  
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument( 
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
  
    console.log(newUser);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    let session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error; 
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    console.log('currentAccount : ',currentAccount);
    
    if (!currentUser) throw Error;
    
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllPosts(){
    try { 
          const posts=await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
          )
          return posts.documents;
      
    } catch (error) {
      throw new Error(error)
    }
}
export async function getLatestPosts(){
    try { 
          const posts=await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
          )
          return posts.documents;
      
    } catch (error) {
      throw new Error(error)
    }
}
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );
    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("users", userId)]
    );
    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export const signOut=async()=>{
  try {
        const session=await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
