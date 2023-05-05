<script lang="ts">
	import FooterItem from '../Common/NavBar_Item.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { Models } from 'node-appwrite';
	import { UserInfo } from '$lib/TStypes/experiencesTypes';

	export let data: { userInfo: UserInfo };

	$: console.log(data.userInfo?.$id);

	$: items = [
		{
			name: 'Home',
			url: '/',
			image_url:
				"data:image/svg+xml,%3Csvg width='23' height='24' viewBox='0 0 23 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.1572 22.2352V18.6679C8.1572 17.7573 8.90083 17.019 9.81813 17.019H13.1713C13.6118 17.019 14.0343 17.1928 14.3458 17.502C14.6573 17.8112 14.8323 18.2306 14.8323 18.6679V22.2352C14.8295 22.6138 14.979 22.9779 15.2477 23.2465C15.5164 23.5152 15.882 23.6663 16.2634 23.6663H18.5511C19.6195 23.6691 20.6452 23.2497 21.4017 22.5006C22.1581 21.7516 22.5833 20.7345 22.5833 19.6738V9.51101C22.5833 8.65421 22.2007 7.84149 21.5387 7.29179L13.7563 1.12152C12.4026 0.0396631 10.4629 0.0745936 9.14958 1.20448L1.54481 7.29179C0.85149 7.82529 0.437104 8.64042 0.416626 9.51101V19.6634C0.416626 21.8742 2.2219 23.6663 4.44883 23.6663H6.6843C7.47639 23.6663 8.12012 23.0319 8.12586 22.2456L8.1572 22.2352Z' fill='%2361646B'/%3E%3C/svg%3E%0A"
		},
		{
			name: 'Explore',
			url: '/explore',
			image_url:
				"data:image/svg+xml,%3Csvg width='26' height='25' viewBox='0 0 26 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.58 11.0798L10.3585 14.9846L14.2622 13.7619L15.4848 9.85711L11.58 11.0798ZM9.02384 17.1931C8.79517 17.1931 8.57117 17.1033 8.40434 16.9376C8.17451 16.7066 8.09051 16.3671 8.18851 16.0579L10.047 10.1208C10.1322 9.84545 10.3468 9.63195 10.6198 9.54678L16.557 7.68828C16.8685 7.58911 17.2068 7.67428 17.4378 7.90411C17.6677 8.13511 17.7517 8.47461 17.6537 8.78378L15.7963 14.7209C15.7112 14.9951 15.4953 15.2098 15.2223 15.2949L9.28517 17.1534C9.19884 17.1803 9.11017 17.1931 9.02384 17.1931Z' fill='%2361646B'/%3E%3Cmask id='mask0_1515_2517' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='26' height='25'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.833374 0.333008H25.0088V24.5083H0.833374V0.333008Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_1515_2517)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.921 2.08301C7.22063 2.08301 2.58313 6.72167 2.58313 12.4208C2.58313 18.1212 7.22063 22.7587 12.921 22.7587C18.6213 22.7587 23.2588 18.1212 23.2588 12.4208C23.2588 6.72167 18.6213 2.08301 12.921 2.08301M12.921 24.5087C6.2558 24.5087 0.83313 19.086 0.83313 12.4208C0.83313 5.75567 6.2558 0.333008 12.921 0.333008C19.5861 0.333008 25.0088 5.75567 25.0088 12.4208C25.0088 19.086 19.5861 24.5087 12.921 24.5087' fill='%2361646B'/%3E%3C/g%3E%3C/svg%3E "
		},
		{
			name: 'Map',
			url: '/map',
			image_url:
				"data:image/svg+xml,%3Csvg width='18' height='24' viewBox='0 0 18 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.833496 8.80925C0.833496 4.29425 4.48516 0.642578 9.00016 0.642578C13.5152 0.642578 17.1668 4.29425 17.1668 8.80925C17.1668 13.6742 12.0102 20.3826 9.8985 22.9376C9.43183 23.4976 8.58016 23.4976 8.1135 22.9376C5.99016 20.3826 0.833496 13.6742 0.833496 8.80925ZM6.0835 8.80925C6.0835 10.4192 7.39016 11.7259 9.00016 11.7259C10.6102 11.7259 11.9168 10.4192 11.9168 8.80925C11.9168 7.19924 10.6102 5.89258 9.00016 5.89258C7.39016 5.89258 6.0835 7.19924 6.0835 8.80925Z' fill='%2361646B' /%3E%3C/svg%3E%0A"
		},
		{
			name: 'Profile',
			url: `/profile/${data.userInfo?.erantId}`,
			image_url:
				"data:image/svg+xml,%3Csvg width='19' height='24' viewBox='0 0 19 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0_1515_2027' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='14' width='19' height='10'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.166626 14.9121H18.6465V23.5151H0.166626V14.9121Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_1515_2027)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.40767 16.6621C4.4365 16.6621 1.9165 17.5161 1.9165 19.2019C1.9165 20.9029 4.4365 21.7651 9.40767 21.7651C14.3777 21.7651 16.8965 20.9111 16.8965 19.2253C16.8965 17.5243 14.3777 16.6621 9.40767 16.6621ZM9.40767 23.5151C7.12217 23.5151 0.166504 23.5151 0.166504 19.2019C0.166504 15.3566 5.441 14.9121 9.40767 14.9121C11.6932 14.9121 18.6465 14.9121 18.6465 19.2253C18.6465 23.0706 13.3732 23.5151 9.40767 23.5151Z' fill='%2361646B'/%3E%3C/g%3E%3Cmask id='mask1_1515_2027' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='3' y='0' width='13' height='13'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.21143 0.333008H15.6015V12.7214H3.21143V0.333008Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask1_1515_2027)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.40763 1.99901C6.9098 1.99901 4.87746 4.03017 4.87746 6.52801C4.8693 9.01767 6.88646 11.0477 9.3738 11.057L9.40763 11.89V11.057C11.9043 11.057 13.9355 9.02467 13.9355 6.52801C13.9355 4.03017 11.9043 1.99901 9.40763 1.99901ZM9.40763 12.7218H9.3703C5.9613 12.7113 3.1998 9.93117 3.21146 6.52451C3.21146 3.11201 5.99046 0.333008 9.40763 0.333008C12.8236 0.333008 15.6015 3.11201 15.6015 6.52801C15.6015 9.94401 12.8236 12.7218 9.40763 12.7218Z' fill='%2361646B'/%3E%3C/g%3E%3C/svg%3E "
		}
	];

	let className = '';

	export { className as class };
</script>

<div class="h-full w-full absolute">
	<div class={'section w-full h-[calc(100%-100px)] overflow-auto ' + className}><slot /></div>
	<div class="footer">
		{#each items as { name, url, image_url }}
			{#if (browser && location.pathname === url) || (browser && location.pathname.includes('/' + url.split('/')[0] + '/'))}
				<FooterItem on:click={() => goto(url)} active={true} {name} {url}>
					<img
						alt=""
						style="filter: invert(44%) sepia(66%) saturate(6619%) hue-rotate(222deg) brightness(98%) contrast(88%);"
						src={image_url}
					/>
				</FooterItem>
			{:else}
				<FooterItem on:click={() => goto(url)} active={false} {name} {url}>
					<img alt="" src={image_url} />
				</FooterItem>
			{/if}
		{/each}
	</div>
</div>

<style>
	.footer {
		width: 100%;
		height: 100px;
		position: absolute;

		background: white;

		bottom: 0px;
		left: 0px;

		border-top: 1px solid #efeff0;
		display: flex;

		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding: 15px 10px 25px 10px;
	}

	@media screen and (max-width: 320px) {
		.footer {
			gap: 0px;
			justify-content: space-around;
			padding: 10px 0 15px 0;
		}
	}
</style>
