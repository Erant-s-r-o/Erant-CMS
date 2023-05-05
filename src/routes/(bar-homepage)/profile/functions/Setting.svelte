<script lang="ts">
    import Line from '$lib/components/Common/Line.svelte';
	import SettingRow from '$lib/components/Common/SettingRow.svelte';
	import { Link } from 'svelte-routing';
	import Earth from '$lib/svg/Earth.svelte';
    import Sun from '$lib/svg/Sun.svelte';
	import PopUp from '$lib/components/Common/PopUp.svelte'
    

    let popUp_Active = false
    let popUp_Options = []
    let popUp_Curent = ""

    function popUp_save(answer:string) {
        if (answer === undefined){
            popUp_Active = false
        }
        else{
            popUp_Active = false
        }
    }

    function PopUp_open(options:any[]){
        popUp_Options = options
        popUp_Active=true
    }

    const items = [
		{
			title: '',
			itms: [{ icon: Sun, text: 'Theme', options:["Dark", "Light"]}, { icon: Earth, text: 'Language', options:["Czech", "English"]}],
		}
	]

</script>

<Line />
<div class="w-full h-auto flex flex-wrap flex-row mt-4 gap-4">
    {#each items as { title, itms }}
        {#if title !== ""}
            <div class="mb-4 text-[18px] text-[#61646B]">{title}</div>
        {/if}
        {#each itms as { icon, text, options}}
            <SettingRow>
                <svelte:component this={icon} />
                <button class="font-semibold text-[18px]" on:click={() => PopUp_open(options)} >{text}</button>
            </SettingRow>
        {/each}
    {/each}
    {#if popUp_Active}
        <PopUp headline="Which language would you like to choose?" options={popUp_Options} on_return={popUp_save} default_ans={popUp_Curent}/>
    {/if}
</div>

