<script lang="ts">
	import { user } from '$lib/appwrite'
	import collections from '$lib/collections'
	import { Query } from 'appwrite'
	import { navigate } from 'svelte-routing'
	import Category from "$lib/components/Categories/category.svelte";

	export let current_state = 1

	$: [userInfo] = collections.users.getDocument([Query.equal('userId', $user?.$id || '')])
	$: console.log($user)

	let container
	let scroll_distance

	let selected_inputs = {}

	function change_state() {
		const input = event.currentTarget as HTMLInputElement

		if (input) {
			var input_type = input.parentElement.parentElement.parentElement.classList[1]
			selected_inputs[input_type] = input.parentElement.querySelector('p').innerText
			console.log(selected_inputs)
		}

		if (current_state + 1 === 4) {
			navigate(`/profile/${$userInfo?.erantId}`)
			return
		}

		setTimeout(() => {
			current_state = current_state + 1

			container.scroll({
				top: 0,
				left: scroll_distance * (current_state - 1),
				behavior: 'smooth',
			})
		}, 300)
	}
</script>

<div bind:this={container} bind:clientWidth={scroll_distance} class="container">
	<div class="container_page interests">
		<h2>What are you most interested in?</h2>

		<div class="radio_container">
			<label class="item">
				<input type="radio" on:change={change_state} name="interests" />
				<div>
					<img alt="" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
					<p>Fun</p>
				</div>
			</label>

			<label class="item">
				<input type="radio" on:change={change_state} name="interests" />
				<div>
					<img alt="" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
					<p>Fun</p>
				</div>
			</label>
		</div>
	</div>

	<div class="container_page travel">
		<h2>Who do you like to travel with?</h2>
		<div class="radio_container">
			<label class="item">
				<input type="radio" on:change={change_state} name="travel" />
				<div>
					<img alt="" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
					<p>Fun</p>
				</div>
			</label>
		</div>
	</div>

	<div class="container_page to_us">
		<h2>What brought you to our app?</h2>
		<div class="radio_container">
			<label class="item">
				<input type="radio" on:change={change_state} name="to_us" />
				<div>
					<img alt="" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
					<p>Fun</p>
				</div>
			</label>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		gap: 10px;
		overflow-x: hidden;
		overflow-y: hidden;
		white-space: nowrap;

		position: relative;
		scroll-snap-type: x mandatory;

		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */

		height: 100%;

		&::-webkit-scrollbar {
			display: none;
		}
		.container_page {
			min-width: 100%;
			min-height: 100%;

			padding: 0px 22px;
			scroll-snap-align: center;

			display: flex;
			flex-direction: column;
			gap: 20px;
			h2 {
				text-align: center;
				font-weight: 600;
				font-size: 18px;
			}

			.radio_container {
				display: flex;
				flex-wrap: wrap;
				gap: 10px;
				.item {
					input {
						display: none;
					}
					div {
						display: flex;
						flex-direction: column;
						align-self: center;
						text-align: center;

						position: relative;
						gap: 8px;
						padding: 7px;
						width: 145px;

						/* Main Blue */
						border-radius: 20px;
						position: relative;
						border: 1px solid #4264eb00;

						img {
							aspect-ratio: 1/1;
							object-fit: cover;
							border-radius: 18px;
							width: 100%;
						}

						p {
							font-weight: 700;
							font-size: 17px;
							padding: 0;
						}
					}
				}

				.item:has(input:checked) {
					div {
						border: 1px dashed #4263eb;
						p {
							color: #4263eb;
						}
					}
				}
			}
		}
	}
</style>
