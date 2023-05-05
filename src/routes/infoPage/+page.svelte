<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, ImagePlaceholder, Skeleton, TextPlaceholder, Input, Banner } from 'flowbite-svelte'

 
</script>

<!-- Navbar -->
<div class="relative px-8">
    <Navbar
    navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b"
    let:hidden
    let:toggle>

        <NavBrand href="/">
            <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
            />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Flowbite
            </span>
        </NavBrand>

        <div class="flex md:order-2">
            <Button size="sm">Get started</Button>
            <NavHamburger on:click={toggle} />
        </div>
        <NavUl {hidden} class="order-1">
            <NavLi href="/about">About Us</NavLi>
            <NavLi href="/services">App</NavLi>
            <NavLi href="/pricing">News</NavLi>
            <NavLi href="/contact">Contact</NavLi>
        </NavUl>
    </Navbar>
    <div style="height:300px;" class="overflow-scroll pb-16">
        <Skeleton class="mt-16 mb-8" />
        <ImagePlaceholder class="my-8" />
        <TextPlaceholder class="my-8" />
    </div>
</div>
<!-- Hero Header -->
<div>
    <sect
</div>

<!-- Newsletter popup banner -->
<Banner id="signup-banner" position="absolute" bannerType="signup">
    <form action="/" class="flex flex-col items-center w-full md:flex-row">
      <label for="email" class="flex-shrink-0 mb-2 mr-auto text-sm font-medium text-gray-500 md:mb-0 md:mr-4 dark:text-gray-400 md:m-0">Sign up for our newsletter</label>
      <input type="email" id="email" placeholder="Enter your email" class="bg-white border border-gray-300 text-gray-900 md:w-64 mb-2 md:mb-0 md:mr-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</button>
    </form>
</Banner>

<iframe src="https://cdn.forms-content.sg-form.com/99ca4925-dc51-11ed-9840-46cf61c223ab" title="Newsletter form"/>