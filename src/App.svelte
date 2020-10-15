<script>
	import { onMount } from "svelte";
	import {
groupFormRequest,
		groupRequest,
		selectFieldDefaultState,
		senderRequest,
	} from "./transactionsFuncs";
	import SelectField from "./components/SelectField.svelte";
	import TextField from "./components/TextField.svelte";
	import { each } from "svelte/internal";
	import Investor from "./components/Investor.svelte";

	if (window.WS === undefined) window.WS = null;
	let WS = window.WS;

	// Group
	let groupField = { ...selectFieldDefaultState };
	let senderField = { ...selectFieldDefaultState };
	let testo = "initValue";
	async function groupSelected() {
		const response = await senderRequest(WS, groupField.value.value);
		console.log(response);
		senderField.options = response.options;
		senderField.value = response.value;
	}
	function onSubmit() {
		console.log({ testo, groupField });
	}
	// Investorsz
	let investorsField = {
		...selectFieldDefaultState,
		investors: [{ name: "", share: 100 }],
	};	
  function addField() {		
    const investors = [
      ...investorsField.investors,
      { name: "", share: 100 },
    ];
    investorsField = { ...investorsField, investors };
  }
	function onSubmitInvestors() {
		console.log(investorsField.investors);
	}

	onMount(async () => {
		if (!WS) {
			WS = new WebsocketPromiseLiteClient({
				url: "ws://localhost:5555",
			});
			window.WS = WS;
		}
		await WS.connectionEstablished();
		const response = await groupRequest(WS);
		groupField.options = response.options;
		groupField.value = response.value;
		const response2 = await groupFormRequest(WS);
		console.log(response2.investorsFieldMeta)
		investorsField = response2.investorsFieldMeta
	});
</script>

<main>
	<h2>@(Транзакции)</h2>
	<form on:submit|preventDefault={onSubmit}>
		<SelectField
			bind:state={groupField}
			label="@(Группы)"
			name="groups"
			on:select={groupSelected} />
		{#if groupField.value}
			<SelectField
				bind:state={senderField}
				label="@(Отправитель)"
				name="sender" />
		{/if}
		<TextField bind:value={testo} />

		<button type="submit">@(Отправить)</button>
	</form>
	<h2>Investors</h2>
	<form on:submit|preventDefault={onSubmitInvestors}>
		{#each investorsField.investors as { name, share }, index}
			<Investor bind:name bind:share {index} bind:fieldMeta={investorsField} />
		{/each}
		<button type="button" on:click="{addField}">Add field</button>
		<button type="submit">Submit investors</button>
	</form>
</main>
