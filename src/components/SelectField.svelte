<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  function emitSelect() {
    if (state.value && (state.value.value || state.value.length)) dispatch("select"); // watch out can cause troubs for array value
  }
  import Select from "svelte-select";
  export let state;
  $: emitSelect(state); // without mentioning state in wouldn't run :)))
  export let label = "";
  export let name = "";
  export let isMulti = false;
</script>

<div class="field {state.isRequired ? ' required' : ''}">
  {#if label}<label for={name}>{label}</label>{/if}
  <Select
    items={state.options}
    bind:selectedValue={state.value}
    isCreatable
    {isMulti} />
</div>
