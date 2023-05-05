<script lang="ts">
	import Interests from "$lib/components/Categories/interests.svelte"

    let current_state = 1
</script>

<div class="container">
    <Interests bind:current_state={current_state} />
    
    <div class="navigation">
        {#each Array(3) as _, index (index)}
            {#if index === current_state-1}
                <div class="selected" />
            {:else}
                <div />
            {/if}   
        {/each}
    </div>
</div>

<style lang="scss">
    .container{
        flex-grow: 1;
        overflow-y: scroll;
        overflow-x: hidden;

        position: relative;

        .navigation {
            position: absolute;
            height: 12px;

            bottom: 15px;
            left: 50%;

            transform: translate(-50%, -0%);

            display: flex;
            align-items: center;
            gap: 8px;

            div{
                background-color: #BBD1C5;
                border-radius: 12px;

                width: 12px;
                height: 12px;
            }

            .selected{
                transition-delay: 0.25s;
                width: 46px;
                outline: 8px solid #BBD1C5;
                outline-color: #14A6AE;
                border-radius: 16px;
            }
        }

    }
</style>