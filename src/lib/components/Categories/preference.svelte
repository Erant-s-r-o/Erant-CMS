<script lang="ts">
	import { Img } from "flowbite-svelte"
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();


    export let name;
    export let img;

  </script>

  <div class="preference">
      <div
        on:click={() => dispatch('selected')}
      >
          <Img alt="sample 1" size="max-w-lg" class="rounded-lg abcd" src={img}/>
        <span>{name}</span>
      </div>
  </div>

<style lang="scss">
  div
            &.selected {
                div {
                    border: 1px dashed #4263eb;
                    p {
                    color: #4263eb;
                    }
                }
            }
</style>
  