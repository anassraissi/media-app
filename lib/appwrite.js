import { Client, Account, ID, Avatars, Databases, Query,Storage } from "react-native-appwrite";

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
const storage = new Storage(client);


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
            [Query.orderDesc('$createdAt')]
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
      [Query.equal("users", userId),Query.orderDesc('$createdAt')]
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

// Upload File
export async function uploadFile(file, type) {
  if (!file) return; // If no file is provided, exit the function

  const { mimeType, ...rest } = file; // Destructure mimeType from the file object and keep the rest of the properties
const asset={
        name:file.fileName,
        type:file.mimeType,
        size:file.fileSize,
        uri:file.uri
}    
  try {
    const uploadedFile = await storage.createFile(
      config.storageId, // The ID of the storage system
      ID.unique(), // Generate a unique ID for the file
      asset // The file object to upload
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type); // Get the preview URL of the uploaded file
    return fileUrl; // Return the preview URL
  } catch (error) {
    throw new Error(error); // If an error occurs, throw a new error
  }
}


// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId); // Get the view URL for a video file
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId, // The ID of the storage system
        fileId, // The ID of the file
        2000, // Width of the image preview
        2000, // Height of the image preview
        "top", // Crop position
        100 // Quality of the image preview
      );
    } else {
      throw new Error("Invalid file type"); // Throw an error if the file type is neither video nor image
    }
    if (!fileUrl) throw Error; // If no URL is returned, throw an error

    return fileUrl; // Return the file URL
  } catch (error) {
    throw new Error(error); // If an error occurs, throw a new error
  }
}


// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"), // Upload the thumbnail image
      uploadFile(form.video, "video"), // Upload the video file
    ]);

    const newPost = await databases.createDocument(
      config.databaseId, // The ID of the database
      config.videoCollectionId, // The ID of the video collection
      ID.unique(), // Generate a unique ID for the new post
      {
        title: form.title, // Title of the video post
        thumbnail: thumbnailUrl, // URL of the thumbnail image
        video: videoUrl, // URL of the video file
        prompt: form.prompt, // Additional information or description
        users: form.userId, // User ID associated with the post
      }
    );

    return newPost; // Return the newly created post
  } catch (error) {
    throw new Error(error); // If an error occurs, throw a new error
  }
}

