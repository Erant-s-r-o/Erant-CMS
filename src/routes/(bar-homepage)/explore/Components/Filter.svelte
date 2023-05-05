<script lang="ts">
    export let name:string
</script>

<button class="filter">
    {name}
</button>

<style lang="scss">
    .filter{
        display: block;
        min-width: fit-content;
        height: 36px;
        /* surface */

        background: #FAFAFA;
        /* normal */

        border: 2px solid #19191B;
        border-radius: 20px;
        padding: 8px 16px;

        font-style: normal;
        font-weight: 400;
        font-size: 14px;


        &:hover{
            opacity: 50%;
        }
    }
</style>