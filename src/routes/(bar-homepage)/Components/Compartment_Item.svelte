<script>
	export let city = 'Home'
	export let name = 'Kawa Ijen'
	export let image = ''
</script>

<button on:click>
	<div class="image">
		{#if image !== ''}
			<img alt="" style="flex-grow: 1;" src={image} />
		{/if}
		<div class="bookmark">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<mask id="mask0_1402_894" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="12" height="15">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M2 1.33301H13.3592V15.2308H2V1.33301Z" fill="white" />
				</mask>
				<g mask="url(#mask0_1402_894)">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M5.56133 2.33301C3.862 2.33301 3 2.98767 3 4.28034V14.0963C3 14.159 3.036 14.193 3.066 14.2103C3.096 14.229 3.14333 14.2423 3.198 14.2117L7.45267 11.825C7.60467 11.7403 7.79067 11.7397 7.94333 11.8257L12.1613 14.2083C12.2167 14.2403 12.264 14.2257 12.294 14.2077C12.324 14.1897 12.3593 14.1557 12.3593 14.093V4.40234C12.3593 3.89101 12.3593 2.33301 9.80067 2.33301H5.56133ZM3.13267 15.231C2.936 15.231 2.73933 15.1783 2.56067 15.073C2.20933 14.8683 2 14.5023 2 14.0963V4.28034C2 2.40701 3.298 1.33301 5.56133 1.33301H9.80067C12.062 1.33301 13.3593 2.45234 13.3593 4.40234V14.093C13.3593 14.4997 13.15 14.8657 12.798 15.0703C12.4473 15.2757 12.0247 15.2797 11.67 15.0797L7.69667 12.835L3.68667 15.0843C3.51333 15.1817 3.32333 15.231 3.13267 15.231Z"
						fill="white"
					/>
				</g>
			</svg>
		</div>
	</div>

	<div class="info">
		<h3>{name}</h3>
		<div>
			<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M6.16667 4.66602C5.52333 4.66602 5 5.18935 5 5.83335C5 6.47668 5.52333 6.99935 6.16667 6.99935C6.81 6.99935 7.33333 6.47668 7.33333 5.83335C7.33333 5.18935 6.81 4.66602 6.16667 4.66602ZM6.16667 7.99935C4.972 7.99935 4 7.02802 4 5.83335C4 4.63802 4.972 3.66602 6.16667 3.66602C7.36133 3.66602 8.33333 4.63802 8.33333 5.83335C8.33333 7.02802 7.36133 7.99935 6.16667 7.99935Z"
					fill="#61646B"
				/>
				<mask id="mask0_1402_1007" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="14">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0.666504 0.333008H11.6662V13.333H0.666504V0.333008Z" fill="white" />
				</mask>
				<g mask="url(#mask0_1402_1007)">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M6.16602 1.33301C3.68468 1.33301 1.66602 3.37101 1.66602 5.87501C1.66602 9.06101 5.41535 12.165 6.16602 12.3303C6.91668 12.1643 10.666 9.06034 10.666 5.87501C10.666 3.37101 8.64735 1.33301 6.16602 1.33301V1.33301ZM6.16602 13.333C4.97002 13.333 0.666016 9.63167 0.666016 5.87501C0.666016 2.81901 3.13335 0.333008 6.16602 0.333008C9.19868 0.333008 11.666 2.81901 11.666 5.87501C11.666 9.63167 7.36202 13.333 6.16602 13.333V13.333Z"
						fill="#61646B"
					/>
				</g>
			</svg>

			{city}
		</div>
	</div>
</button>

<style>
	button {
		padding: 8px 8px 12px 8px;
		background-color: white;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		justify-content: space-between;

		position: relative;

		border: 1px solid #efeff0;
		border-radius: 20px;
	}

	button:hover,
	button:active {
		opacity: 70%;
		cursor: pointer;
	}

	button > .image {
		width: 240px;
		height: 152px;

		/* background */

		background-color: #efeff0;
		/* subtle-light */

		border: 2px solid #afb1b6;
		border-radius: 20px;
		background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0_1402_2000' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='20' height='20'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.000488281 0H19.9601V19.9498H0.000488281V0Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_1402_2000)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.65049 1.5C3.12949 1.5 1.50049 3.227 1.50049 5.899V14.051C1.50049 16.724 3.12949 18.45 5.65049 18.45H14.3005C16.8275 18.45 18.4605 16.724 18.4605 14.051V5.899C18.4605 3.227 16.8275 1.5 14.3005 1.5H5.65049ZM14.3005 19.95H5.65049C2.27049 19.95 0.000488281 17.579 0.000488281 14.051V5.899C0.000488281 2.371 2.27049 0 5.65049 0H14.3005C17.6855 0 19.9605 2.371 19.9605 5.899V14.051C19.9605 17.579 17.6855 19.95 14.3005 19.95Z' fill='%2361646B'/%3E%3C/g%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.28126 15.1799C3.09526 15.1799 2.91026 15.1119 2.76526 14.9739C2.46426 14.6899 2.45226 14.2139 2.73726 13.9149L4.26526 12.3019C5.07426 11.4429 6.43926 11.4009 7.30226 12.2109L8.26026 13.1829C8.52726 13.4529 8.96126 13.4579 9.22926 13.1939C9.33026 13.0749 11.5083 10.4299 11.5083 10.4299C11.9223 9.92789 12.5063 9.61789 13.1553 9.55389C13.8053 9.49689 14.4363 9.68589 14.9393 10.0989C14.9823 10.1339 15.0213 10.1679 17.2173 12.4229C17.5063 12.7189 17.5013 13.1939 17.2043 13.4829C16.9083 13.7739 16.4323 13.7649 16.1433 13.4689C16.1433 13.4689 14.0943 11.3659 13.9483 11.2239C13.7933 11.0969 13.5443 11.0229 13.2993 11.0469C13.0503 11.0719 12.8263 11.1909 12.6673 11.3839C10.3433 14.2029 10.3153 14.2299 10.2773 14.2669C9.41926 15.1089 8.03426 15.0949 7.19126 14.2349C7.19126 14.2349 6.26126 13.2909 6.24526 13.2719C6.01426 13.0579 5.60226 13.0719 5.35526 13.3329L3.82526 14.9459C3.67726 15.1019 3.47926 15.1799 3.28126 15.1799Z' fill='%2361646B'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.55769 6.12891C6.00469 6.12891 5.55469 6.57891 5.55469 7.13291C5.55469 7.68691 6.00469 8.13791 6.55869 8.13791C7.11269 8.13791 7.56369 7.68691 7.56369 7.13291C7.56369 6.57991 7.11269 6.12991 6.55769 6.12891ZM6.55869 9.63791C5.17769 9.63791 4.05469 8.51391 4.05469 7.13291C4.05469 5.75191 5.17769 4.62891 6.55869 4.62891C7.94069 4.62991 9.06369 5.75391 9.06369 7.13291C9.06369 8.51391 7.93969 9.63791 6.55869 9.63791Z' fill='%2361646B'/%3E%3C/svg%3E%0A");
		background-repeat: no-repeat;
		background-position: center;
		position: relative;

		display: flex;
		flex-direction: row;
		justify-content: stretch;
		align-items: stretch;

		overflow: hidden;
	}

	@media screen and (max-width: 390px) {
		button > .image {
			width: 61.5vw;
			height: 39vw;
		}
	}

	@media screen and (max-width: 330px) {
		button > .image {
			border-radius: 18px;
		}
	}

	button > .image > .bookmark {
		position: absolute;
		width: 28px;
		height: 28px;
		right: 12px;
		top: 12px;
		background: #4263eb;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media screen and (max-width: 370px) {
		button > .image > .bookmark {
			width: 8vw;
			height: 8vw;
			right: 3vw;
			top: 3vw;
			border-radius: 2vw;
		}
	}

	button > .info {
		text-align: left;
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	button > .info > h3 {
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		color: #19191b;
	}

	button > .info > div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;

		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
		line-height: 20px;
		color: #61646b;
	}
</style>
