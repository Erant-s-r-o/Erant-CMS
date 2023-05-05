<script lang="ts">
	import Interests from './../../lib/components/Categories/interests.svelte';
  // Import necessary modules and components
  import { user } from '$lib/appwrite';
  import collections from '$lib/collections';
  import Loading from '$lib/components/Common/Loading.svelte';
  import Category2InRow from '$lib/components/categories/Category2InRow.svelte';
  import Category3InRow from '$lib/components/Categories/preference.svelte';
  import { getInterests, getTravelBuddies, getRecommendations, addSelectedPreferences } from '$lib/utils/database/preferences';
  import { navigate } from '$lib/router'
  import { onMount } from 'svelte';

  interface Preference {
    name: string;
    img: string;
  }

  //define changing state for displaying different categories
  let current_state = 0;
  
  // Define variables to store the preferences
  let interests: Array<Preference> | undefined;
  let travelBuddies: Array<Preference> | undefined;
  let recommendations: Array<Preference> | undefined;

  // Define a variable to store the selected preferences
  let selectedInterests = [];
  let selectedTravelBuddies = [];
  let selectedRecommendations = [];

  onMount(async () => {
    interests = await getInterests();
    travelBuddies = await getTravelBuddies();
    recommendations = await getRecommendations();
  });

  // Define a function to handle the form submission
  async function submitPreferences() {
    await addSelectedPreferences(user, selectedInterests, selectedTravelBuddies, selectedRecommendations);
    selectedInterests = [];
  }
</script>

{#if preferences.length > 0}
  <div class="preferences-page">
    <div class="progress-bar"></div>
    <h2>What are your interests?</h2>
    <Category3InRow
      interests={interests.slice(0, 3)}
      onPreferenceSelect={updateSelectedInterests}
    />
    <h2>Who do you like to travel with?</h2>
    <Category2InRow
      preferences={preferences.slice(3, 5)}
      onPreferenceSelect={updateSelectedInterests[Symbol]...}
    />
    <h2>What brought you to our app?</h2>
    <Category3InRow
      preferences={preferences.slice(5)}
      onPreferenceSelect={updateSelected..........}
    />
    <button on:click={submitPreferences}>Submit Preferences</button>
  </div>
{:else}
  <Loading />
{/if}
