<script lang="ts">
	import { each } from "svelte/internal"
	import { Html } from "./Meta"


    export let headline:string= "";
    export let options:any[] = [];
    export let on_return:Function  = () => {};
    export let default_ans:string = undefined

    let selected:string = default_ans

    function change_answer(){
        const container = (event.currentTarget as HTMLInputElement).parentElement.parentElement

        selected = (container.querySelector("input:checked") as HTMLInputElement).parentElement.querySelector("p").innerText
    }

    function cancel_popUp(){
        on_return(undefined)
    }
    function save_popUp(){
        on_return(selected)
    }
</script>

<div class="pop-up-container">
    <div class="pop-up">
        <h1 class="headline">
            {headline}
        </h1>
        
        <div class="options">
            {#each options as option}
                <label class="option">
                    {#if option === selected}
                    <input type="radio" on:change={change_answer} name="input" hidden checked/>
                    {:else}
                    <input type="radio" on:change={change_answer} name="input" hidden/>
                    {/if}
                    <div class="option-content">
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.26667 1.66671L6.10667 0.866707C6.04667 0.560041 5.77333 0.333374 5.45333 0.333374H0.666667C0.3 0.333374 0 0.633374 0 1.00004V11C0 11.3667 0.3 11.6667 0.666667 11.6667C1.03333 11.6667 1.33333 11.3667 1.33333 11V7.00004H5.06667L5.22667 7.80004C5.28667 8.11337 5.56 8.33337 5.88 8.33337H9.33333C9.7 8.33337 10 8.03337 10 7.66671V2.33337C10 1.96671 9.7 1.66671 9.33333 1.66671H6.26667Z" fill="white"/>
                        </svg>
                        <p>{option}</p>
                    </div>
                </label>
            {/each}
        </div>

        <div class="actions">
            <button on:click={cancel_popUp} class="cancel">
                Cancel
            </button>
            <button on:click={save_popUp} class="save">
                Save
            </button>
        </div>
    </div>
</div>

<style lang="scss">
    .pop-up-container{
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        backdrop-filter: blur(5px) brightness(60%);
        width: 100%;
        height: 100%;
        .pop-up{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            gap: 16px;

            position: absolute;
            top: 50%;
            left: 50%;

            transform: translate(-50%, -50%);

            width: 80%;

            background: #FFFFFF;
            border-radius: 8px;

            .headline{
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-size: 22px;

                letter-spacing: 0.004em;

                /* Black */

                color: #212529;
                margin: 0;
            }

            .options{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;
                gap:16px;
                .option{
                    .option-content{
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        padding: 8px 12px;
                        gap: 7px;

                        background: #F7F5FF;
                        

                        svg, p{
                            color: #4263EB;
                            path{
                                fill: #4263EB
                            }
                            
                        }
                        border-radius: 16px;
                    }
                    &:has(input:checked){
                        .option-content{
                            background:#4263EB;
                            
                            svg, p{
                                color:#F7F5FF;
                                path{
                                    fill: #F7F5FF
                                }
                            }
                        }
                    }
                }

                
            }

            .actions{
                width: 100%;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
                gap: 16px;
                button {
                    border-radius: 12px;
                    padding: 12px 16px;
                    text-align: center;
                    /* label medium */

                    font-family: 'Work Sans';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    /* identical to box height, or 143% */

                    display: flex;
                    align-items: center;
                    letter-spacing: 0.4px;

                    &:hover{
                        opacity: 50%;
                    }
                }
                .save{
                    background: #4263EB;
                    color: white;
                }
                .cancel{
                    color: #4263EB;
                    background: #F7F5FF;
                }
            }   
        }
    }


</style>