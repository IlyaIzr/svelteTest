<script>
  export let value = "";
  $: console.log(value)
</script>

<label for="test">This guy</label>
<input type="text" bind:value name="test" />
