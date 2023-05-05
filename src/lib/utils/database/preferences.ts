import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';
import { writable } from 'svelte/store'

// typescript interfaces for objects return definitions
interface Interest {
    name: string;
    img: string;
  }
  interface TravelBuddies {
    name: string;
    img: string;
  }
interface Recommendations {
    name: string;
    img: string;
  }

  // Define a variable to store the selected preferences
  // let selectedInterests = [];
  // let selectedTravelBuddies = [];
  // let selectedRecommendations = [];

// fetch interests

    export const getInterests = () => {
      const store = writable<Interest[]>([]) 
      databases.listDocuments('6417cf1de159d094b370', '6417cf29f2118829b3b4').then(({ documents }) => {
        // @ts-ignore
        store.set(documents)
      })
    
      
      return [store] as const
    } 

// fetch travel buddies
export const getTravelBuddies = async (): Promise<TravelBuddies[]> => {
    return ((await databases.listDocuments('6417cf1de159d094b370', '6417d0429843609a2f49')).documents as unknown as TravelBuddies[])};

// fetch recommendations
export const getRecommendations = async (): Promise<Recommendations[]> => {
    return ((await databases.listDocuments('6417cf1de159d094b370', '6417d00e40701375978b')).documents as unknown as Recommendations[])};

    // add selected preferences to user
export const addSelectedPreferences = async (userId, interests, travelBuddies, recommendations) => {
    const { document: user } = await databases.getDocument('63ded6c18e8493bffc83', 'Users', userId);
  
    const updatedUser = {
      ...user,
      userInterests: interests,
      userTravelBuddy: travelBuddies,
      userRecommended: recommendations
    };
  
    await databases.updateDocument('63ded6c18e8493bffc83', 'Users', user.$id, updatedUser);
  
    return updatedUser;
  };


//   // Function to update Interests
//   function updateSelectedInterests(preference) {
//     if (selectedInterests.includes(preference)) {
//       selectedInterests = selectedInterests.filter((item) => item !== preference);
//     } else {
//       selectedInterests = [...selectedInterests, preference];
//     }
//   }
//   // Function to update Travel Buddies
//   function updateSelectedTravelBuddies(preference) {
//     if (selectedTravelBuddies.includes(preference)) {
//       selectedTravelBuddies = selectedTravelBuddies.filter((item) => item !== preference);
//     } else {
//       selectedTravelBuddies = [...selectedTravelBuddies, preference];
//     }
//   }
//   // Function to update Recommendations
//   function updateSelectedRecommendations(preference) {
//     if (selectedRecommendations.includes(preference)) {
//       selectedRecommendations = selectedRecommendations.filter((item) => item !== preference);
//     } else {
//       selectedRecommendations = [...selectedRecommendations, preference];
//     }
//   }

