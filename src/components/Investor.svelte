<script>
  import Select from "svelte-select";
  export let name = "";
  export let share = 100;
  export let fieldMeta;
  export let index = 0;

  function deleteField() {
    const investors = [...fieldMeta.investors];
    investors.splice(index, 1);
    fieldMeta = { ...fieldMeta, investors };
  }
</script>

<div class="container">
  <Select items={fieldMeta.options} bind:selectedValue={name}/>
  <br />
  <div class="inline">
    <input type="number" bind:value={share} />
    <input type="range" bind:value={share} />
  </div>
  <br />
  <button on:click={deleteField}>x</button>
</div>
