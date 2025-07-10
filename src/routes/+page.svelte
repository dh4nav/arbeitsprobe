<script>
  import ComboBox from '$lib/ComboBox.svelte'

  let userInput = ''
  let response = ''
  let mainTextVar = ''
  let selectedAddress = ''
  let selectedTextTemplate = ''

  let city = '';
  let address = '';
  let text = '';
  let loading = false;

  async function fetchData() {
    loading = true;
    address = text = '';
    const res = await fetch('/api/llms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: city })
    });
    const data = await res.json();
    address = data.address;
    text = data.text;
    loading = false;
  }

  async function sendQuery() {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userInput })
    })
    const data = await res.json()
    response = data.answer
  }

  async function fillText() {
    mainTextVar = String(int(mainTextVar)+1)
  }
</script>



<div class="pl-40 pr-20 pt-10 max-w-5xl mx-auto min-w-[500px]">
  <h1 class="text-3xl font-bold mb-6">Korrespondenz</h1>


  <div class="mb-5 relative  items-start">
    <div>
      <label for="address" class="absolute -top-1 right-full pr-5 text-2xl">Adresse</label>
    </div>
    <div class="flex flex-col gap-2">
      <div class="space-y-6">
        <ComboBox
          bind:selected={selectedAddress}
          endpoint="/api/cities"
          placeholder="Search or select a city"
        />
      </div>
      <textarea
      id="address"
      class="w-full p-2 border-4 rounded mb-4"
      rows="4"
      bind:value={userInput}
      placeholder="Adresse eingeben..."
      ></textarea>
    </div>
  </div>
  <div class="relative items-start">
    <div>
      <label for="maintext" class="absolute -top-1 right-full pr-5 text-2xl">Text</label>
    </div>
    <div class="space-y-6 pb-2">
      <ComboBox
        bind:selected={selectedTextTemplate}
        endpoint="/api/countries"
        placeholder="Search or select a country"
      />
    </div>
    <textarea
      id="maintext"
      class="w-full p-2 border-4 rounded "
      rows="20"
      bind:value={mainTextVar}
      placeholder="Text eingeben..."
      on:focus={fillText}
    ></textarea>
  </div>
  <button id="makePDF" class=" text-white px-4 py-2 rounded-xl bg-blue-600  bottom-10 mb-10" on:click={sendQuery}>
    PDF Erzeugen
  </button>

  <div class="relative items-start">
    <div>
      <label for="aiquery"  class="absolute -top-1 right-full pr-5 text-2xl">KI&NonBreakingSpace;Frage</label>
    </div>
    <div>
      <textarea
          id="aiquery"
          class="w-full p-2 border-4 rounded"
          rows="4"
          bind:value={userInput}
          placeholder="Frage eingeben..."
        ></textarea>
    </div>
  </div>

  <button id="sendAI" class=" text-white px-4 py-2 rounded-xl bg-purple-600" on:click={sendQuery}>
    Senden
  </button>

  {#if response}
    <div class="mt-4 p-4 bg-gray-100 rounded">{response}</div>
  {/if}

  <div class="max-w-5xl mx-auto min-w-[500px] ">
    <p class="mt-4 text-gray-600 text-sm">
      You selected: {selectedAddress || '(no address)'} / {selectedTextTemplate || '(no text template)'}
    </p>
  </div>

</div>
