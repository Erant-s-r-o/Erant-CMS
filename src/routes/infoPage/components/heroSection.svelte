<script>
    import { onMount } from 'svelte';
    import { Banner } from 'flowbite-svelte';

    let banner;

    onMount(() => {
        banner = new Banner('signup-banner');
    });

    function showBanner() {
        banner.show();
    }

    function hideBanner() { 
        banner.hide();
    }
</script>

<section>
    <div class=""></div>
</section>