<script lang="ts">
  import { Button, Dropzone, Fileupload, Input, Textarea, Toolbar, ToolbarGroup, ToolbarButton, Label  } from 'flowbite-svelte';
  import { createEventDispatcher, onMount } from 'svelte';  
  import Sidebar from '$lib/components/CMS/sidebar.svelte';
  import UploadWidget from '$lib/components/CMS/uploadWidget.svelte';
  import { databases, client } from '$lib/appwriteNode/appwrite_node';
  import database from '$lib/appwriteNode/database';
  import { goto } from '$app/navigation';
  import { getCloudinary } from '$lib/components/CMS';
  


// function handleClick(event) {
//   const name = {name};
//   const description = {description}; 
//   const media = {media}

// const data = {

// }
// }

//Function to handle save
//Function to handle update
//Function to handle delete

//Function to handle media upload
  //Get back Public URL


let name = '';
let description = '';
let media = '';

  function handleCancel() {
    alert('Cancel');
  }

  function handleSave() {
    alert('Save');
    // event.preventDefault();

    // // Create the data object
    // const data = {
    //   ExpName: {name};
    //   ExpURL: ;
    //   ExpDesc: {description};
    //   ExpImg: {media};
    // };
    // let DocumentID = name

    // const handleCheck = databases.getDocument(

    // )
    // // const uploadMedia = cloudinary
    // // Send the data to the Appwrite server
    // const handleSave = databases.createDocument(
    //   client,
    //   null, // No document ID provided, Appwrite will generate one automatically
    //   data
    // );

    // handleSave.then(response => {
    //   console.log('Data saved successfully:', response);
    // }).catch(error => {
    //   console.error('Failed to save data:', error);
    // });
    // const handleUpdate = appwrite.database.createDocument(
    //   client,
    //   null, // No document ID provided, Appwrite will generate one automatically
    //   data
    // );

    // handleSave.then(response => {
    //   console.log('Data saved successfully:', response);
    // }).catch(error => {
    //   console.error('Failed to save data:', error);
    // });
  }
  
// // "https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">  
		
</script>

<Sidebar />

<!--      Name Input      -->
<Input
    label="Name"
    placeholder="Name"
    bind:value={name}
    type="text"
    required>
</Input>

<!--      Description Input      -->

<form>
    <label for="editor" class="sr-only">Publish post</label>
    <Textarea
      label="Description"
      placeholder="Write a description"
      bind:value={description}
      type="text"
      required 
      id="editor" 
      rows="8" 
      class="mb-4">
      <Toolbar slot="header" embedded>
        <ToolbarGroup>
          <ToolbarButton name="Embed map"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg></ToolbarButton>
          <ToolbarButton name="Upload image"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg></ToolbarButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton name="Format code"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg></ToolbarButton>
          <ToolbarButton name="Add emoji"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg></ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    </Textarea>
</form>

<!--      Media Input      -->

<Fileupload
    label="Media"
    placeholder="Media"
    bind:value={media}
    type="file"
    error={errors.media}
    on:blur={() => {
        errors.media = validateMedia(media);
    }}>
</Fileupload>

<Dropzone
    label="Media"
    placeholder="Media"
    bind:value={media}
    type="file"
    class="">
</Dropzone>

<Label class="space-y-2">
    <span>Default icon input</span>
    <Input type="email" placeholder="Default input" size="md" />
</Label>

<!--      Save button      -->

<Button on:click={() => handleSave} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Save
</Button>

<!--      Cancel button      -->

<Button on:click={() => handleCancel} class="bg-grey-500 hover:bg-grey-700 text-white font-bold py-2 px-4 rounded">
    Cancel
</Button>