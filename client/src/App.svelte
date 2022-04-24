<script>
  import { onMount } from "svelte/internal";

  var data;
  var error;

  var vData;

  onMount(async () => {
    await fetch("http://localhost:3000/", {
      method: "GET",
    })
      .then(async (x) => x.json())
      .then((x) => (vData = x))
      .catch((err) => {
        vData = null;
        error = err.message;
        console.log(err);
      });
  });
  let questions = [
    { id: 1, text: `get` },
    { id: 2, text: `set` },
    { id: 3, text: `push` },
    { id: 4, text: `pull` },
  ];

  let selected;

  let key = "";
  let set = "";

  async function handleSubmit() {
    await fetch("http://localhost:3000/db/" + selected.text, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        key: key,
        set: set,
      }),
    })
      .then(async (x) => (data = await x.json()))
      .catch((err) => {
        data = null;
        error = err.message;
        console.log(err);
      });
  }

  function sifirla() {
    key = "";
    set = "";
  }
</script>

<h2>Insecurity questions</h2>

{#if vData}
  <p>{JSON.stringify(vData)}</p>
{:else}
  <p>vData is not active for now.</p>
{/if}

<form on:submit|preventDefault={handleSubmit}>
  <select bind:value={selected} on:change={() => sifirla()}>
    {#each questions as question}
      <option value={question}>
        {question.text}
      </option>
    {/each}
  </select>

  {#if !selected}
    "A.?"
  {:else if selected.id === 1}
    <input bind:value={key} placeholder="key" />
  {:else if selected.id === 2 || 3 || 4}
    <input bind:value={key} placeholder="key" />
    <input bind:value={set} placeholder="set" />
  {/if}

  <button disabled={!key} type="submit"> Submit </button>
</form>

<p>selected question {selected ? selected.id : "[waiting...]"}</p>

{#if data}
  <p>{JSON.stringify(data)}</p>
{:else}
  <p>Data is not active for now.</p>
{/if}

{#if error}
  <p>{error}</p>
{/if}

<style>
  input {
    display: block;
    width: 500px;
    max-width: 100%;
  }
</style>
