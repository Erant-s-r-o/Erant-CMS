<!-- This component is imported to display a category to (de)select-->
<script lang="ts">
    export let name;
    export let image;
    export let selected = false;
    export let onToggle = () => {};
  
    const handleClick = () => {
      onToggle();
    };
  </script>
  
  <div class="category" class:selected={selected} on:click={handleClick}>
    <div class="image">
      <img src={image} alt={name} />
    </div>
    <div class="name">{name}</div>
  </div>
  
  <style lang="scss">
    .category {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120px;
      margin: 10px;
      cursor: pointer;
  
      .image {
        width: 100%;
        padding-top: 100%;
        position: relative;
  
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
  
      .name {
        margin-top: 5px;
        font-size: 14px;
        text-align: center;
      }
  
      &.selected {
        border: 2px solid blue;
      }
    }
  </style>
  