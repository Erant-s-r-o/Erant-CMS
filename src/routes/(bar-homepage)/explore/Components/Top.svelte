<script>
	import Filter from './Filter.svelte'
	import Search from './Search.svelte'

	export let search_value
</script>

<div class="top">
	<div class="actions">
		<Search bind:search_value />

		<button class="options">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8.40006 15.4941H3.14923C2.80423 15.4941 2.52423 15.2141 2.52423 14.8691C2.52423 14.5241 2.80423 14.2441 3.14923 14.2441H8.40006C8.74506 14.2441 9.02506 14.5241 9.02506 14.8691C9.02506 15.2141 8.74506 15.4941 8.40006 15.4941Z"
					fill="black"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M15.9924 7.41699H10.7424C10.3974 7.41699 10.1174 7.13699 10.1174 6.79199C10.1174 6.44699 10.3974 6.16699 10.7424 6.16699H15.9924C16.3374 6.16699 16.6174 6.44699 16.6174 6.79199C16.6174 7.13699 16.3374 7.41699 15.9924 7.41699Z"
					fill="black"
				/>
				<mask id="mask0_1630_1934" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="4" width="6" height="6">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 4.16699H7.68817V9.32666H2.5V4.16699Z" fill="white" />
				</mask>
				<g mask="url(#mask0_1630_1934)">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M5.09398 5.4165C4.35315 5.4165 3.74982 6.01317 3.74982 6.74734C3.74982 7.48067 4.35315 8.0765 5.09398 8.0765C5.83565 8.0765 6.43815 7.48067 6.43815 6.74734C6.43815 6.01317 5.83565 5.4165 5.09398 5.4165ZM5.09398 9.3265C3.66398 9.3265 2.49982 8.16984 2.49982 6.74734C2.49982 5.32484 3.66398 4.1665 5.09398 4.1665C6.52482 4.1665 7.68815 5.32484 7.68815 6.74734C7.68815 8.16984 6.52482 9.3265 5.09398 9.3265Z"
						fill="black"
					/>
				</g>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M14.4898 13.5068C13.7481 13.5068 13.1448 14.1035 13.1448 14.8368C13.1448 15.571 13.7481 16.1668 14.4898 16.1668C15.2306 16.1668 15.8331 15.571 15.8331 14.8368C15.8331 14.1035 15.2306 13.5068 14.4898 13.5068ZM14.4898 17.4168C13.0589 17.4168 11.8948 16.2593 11.8948 14.8368C11.8948 13.4143 13.0589 12.2568 14.4898 12.2568C15.9198 12.2568 17.0831 13.4143 17.0831 14.8368C17.0831 16.2593 15.9198 17.4168 14.4898 17.4168Z"
					fill="black"
				/>
			</svg>
		</button>
	</div>
	<!--<div class="filters">
        <Filter name="Some filter" />
        <Filter name="Some filter n.2" />
    </div>-->
</div>

<style lang="scss">
	.top {
		width: 100%;

		position: relative;
		padding: 44px 16px 20px 16px;

		display: flex;
		flex-direction: column;

		gap: 20px;

		border-bottom: 1px solid #efeff0;

		.actions {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: stretch;

			gap: 16px;

			.options {
				width: 44px;
				height: 44px;

				background: #efeff0;
				border-radius: 228px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.options:hover {
				opacity: 50%;
			}
		}
	}
</style>
