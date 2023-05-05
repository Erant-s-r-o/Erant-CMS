<script>
    import { onMount } from "svelte";
    import { client } from "$lib/appwrite";
    import { navigate } from "svelte-routing";
    import collections from "$lib/collections";
    import { getInterests, getRecommendations, getTravelBuddies, addSelectedPreferences } from '$lib/utils/database/preferences';
    import preference from "$lib/components/Categories/preference.svelte";
  
  
    let preferences = [];
  
    let selectedPrefId = 1;
  
    const handleOptionClick = (pref, option) => {
      pref.selectedOption = option;
    };
  
    const handleNextClick = () => {
      selectedPrefId += 1;
    };
  
    onMount(async () => {
      try {
        const [interests, travelBuddies, recommendedBy] = await Promise.all([
            getInterests(), 
            getTravelBuddies(),
            getRecommendations(),
        ]);
        preferences = [
          {
            id: 1,
            title: "Select your interests",
            options: interests,
            selectedOption: null,
          },
          {
            id: 2,
            title: "Select your travel buddies",
            options: travelBuddies,
            selectedOption: null,
          },
          {
            id: 3,
            title: "Who recommended you to this app?",
            options: recommendedBy,
            selectedOption: null,
          },
        ];
        const userPreferences = {
        userInterests: interests.map((interest) => interest.name),
        userTravelBuddy: travelBuddies.map((travelBuddy) => travelBuddy.name),
        userRecommended: recommendedBy.map((recommendations) => recommendations.name),
      };

      try {
        await addSelectedPreferences(userPreferences);
        navigate("/");
      } catch (error) {
        console.error(error);
      }

      } catch (error) {
        console.error(error);
        console.log(await collections.interests.listDocuments());
      }
    
      
    }); 
    setContext("selectedPrefIndex", selectedPrefIndex);
  </script>

    {#each preferences as pref}
      {#if pref.id === selectedPrefId}
        <div class="container">
          <div class="container_page">
            <h2>{pref.title}</h2>
            <div class="radio_container">
              {#each pref.options as option}
              <label class="item {selected: preferences[selectedPrefIndex].selectedOption === option}">
                    <input type="radio" name={`pref-${preferences[selectedPrefIndex].id}`} value={option.id} on:change={() => handleOptionClick(preferences[selectedPrefIndex], option)} checked={preferences[selectedPrefIndex].selectedOption === option} />
                  <div>
                    <img src={option.img} alt={option.name} />
                    <p>{option.name}</p>
                  </div>
                </label>
              {/each}
            </div>
            {#if pref.selectedOption}
              <button on:click={handleNextClick}>Next</button>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
    {#if selectedPrefId === preferences.length && preferences.every(pref => pref.selectedOption)}
      <button on:click={addSelectedPreferences}>Save Preferences</button>
    {/if}
  
<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    position: relative;
    scroll-snap-type: x mandatory;
    height: 100%;
  
    &::-webkit-scrollbar {
      display: none;
    }
  
    .container_page {
      min-width: 100%;
      min-height: 100%;
      padding: 0px 22px;
      scroll-snap-align: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
  
      h2 {
        text-align: center;
        font-weight: 600;
        font-size: 18px;
      }
  
      .radio_container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
  
        .item {
          input {
            display: none;
          }
  
          div {
            display: flex;
            flex-direction: column;
            align-self: center;
            text-align: center;
            position: relative;
            gap: 8px;
            padding: 7px;
            width: 145px;
            border-radius: 20px;
            border: 1px solid #4264eb00;
  
            
  
            p {
              font-weight: 700;
              font-size: 17px;
              padding: 0;
            }
          }
  
            
        }
      }
    }
  }
</style>