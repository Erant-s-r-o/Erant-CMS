<script lang="ts">
    import Search from "../../../lib/svg/Search.svelte"
    export let search_value
</script>

<div class="search">
    <div class="search_content">
        <Search />
        <input type="text" name="search_input" id="search_input" placeholder="Where do you want to go?" bind:value={search_value}/>
    </div>
    <label for="search_input" class="label_input">
        
    </label>
</div>

<style lang="scss">
    .search{
        flex-grow: 1;
        height: 44px;
        background: #EFEFF0;
        border-radius: 20px;

        position: relative;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .search_content{
            max-width: 100%;
            padding: 10px;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: row;
            gap: 7px;
            align-items: center;
            justify-content: stretch;

            input[type="text"]{
                font-style: normal;
                font-weight: 400;
                font-size: 16px;

                height: 100%;
                
                width: 176px;
                background: none;
                flex-grow: 0;
                transition: flex-grow 2s;
                transition-delay: 2000ms;
                
                border: none;
                
                &::placeholder{
                    color: #AFB1B6;
                }
                &:focus, &:focus-visible {
                    flex-grow: 1;
                    box-shadow: none;
                    border: none;
                    outline: none;
                }

            }
        }

        .search_content:has(input[type="text"]:focus){
            width: 100%;
        }
        .label_input{
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
</style>