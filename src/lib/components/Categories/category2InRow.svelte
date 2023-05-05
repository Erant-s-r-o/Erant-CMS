<script lang="ts">
    export let preferences;
    export let onPreferenceSelect;
  </script>
  
  <div class="category-2-in-row">
    {#each preferences as preference}
      <div
        class="preference"
        style="background-image: url({preference.img})"
        on:click={() => onPreferenceSelect(preference)}
      >
        <span>{preference.name}</span>
      </div>
    {/each}
  </div>
  