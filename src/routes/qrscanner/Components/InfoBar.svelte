<script>
	let className = ''
	export { className as class }
</script>

<div class={'h-[80px] w-[450px] max-w-[90%] p-6 bg-[#282828] flex flex-wrap flex-col m-3 gap-[5px] rounded-[30px] ' + className}>
	<button on:click class="h-full w-auto">
		<svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="24.2192" height="6.08178" rx="3.04089" transform="matrix(0.716773 -0.697307 -0.716773 -0.697307 4.35938 21.1992)" fill="#4263EB" />
			<rect width="24.3271" height="6.0548" rx="3.0274" transform="matrix(-0.716773 -0.697307 -0.716773 0.697307 21.791 29.7002)" fill="#4263EB" />
		</svg>
	</button>
	<span class="text-[#8A8A8A] flex text-center items-center h-full w-[85%]">
		<slot />
	</span>
</div>
