<script>
	import { client, databases } from '$lib/appwriteNode/appwrite_node';
	import { onMount } from 'svelte';

	let widget;
	onMount(() => {
		// Cloudinary upload widget script
		if ('cloudinary' in window) {
			widget = window.cloudinary.createUploadWidget(
				{
					cloudName: 'dbec8wss6',
					uploadPreset: 'dfucxohg',
					sources: ['local', 'url', 'camera', 'google_drive', 'facebook', 'instagram'],
					showAdvancedOptions: true,
					//resourceType: 'image',
					//cropping: false,
					multiple: false,
					maxFileSize: 10000000 // 10 MB Max file size in bytes
				},
				(error, result) => {
					if (!error && result && result.event === 'success') {
						const fileUrl = result.info.secure_url;
						const filePublicId = result.info.public_id;
						const document = {
							ExpImage: fileUrl // Add the file URL to the database
						};
						// Create a new document in the Appwrite database
						databases.createDocument('63cef30d6da945dd4250', '63cef4bd210fdf2e5888', document).then(
							function (response) {
								console.log(response); // Success
							},
							function (error) {
								console.log(error); // Failure
							}
						);
					}
				}
			);
		}
	});
	function handleUploadClick() {
		if (widget) {
			widget.open();
		}
	}
</script>

<button on:click|preventDefault={handleUploadClick}>Upload image</button>