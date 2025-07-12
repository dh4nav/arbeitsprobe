<script>
  import ComboBox from '$lib/ComboBox.svelte'
  import { jsPDF } from 'jspdf';

  let userInput = ''
  let response = ''
  let mainTextVar = ''
  let selectedAddress;
  let enteredAddress = ''
  let enteredName = ''
  let selectedTextTemplate;
  let enteredTextTemplate = ''

  let city = '';
  let address = '';
  let text = '';
  let loading = false;

  function drawParagraph(doc, text, x, y, maxWidth, lineHeightMm) {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach(line => {
      doc.text(line, x, y);
      y += lineHeightMm;
    });
    return y; // return new y position
  }

  function downloadPdf() {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(35);
    doc.text('TITELGRAPHIK', 15, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    drawParagraph(doc, enteredAddress, 25, 45, 140, 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    drawParagraph(doc, enteredTextTemplate, 25, 90, 140, 6);

    doc.save('download.pdf');
  }

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
    const res = await fetch('/api/llms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userInput })
    })
    const data = await res.json()
    enteredTextTemplate = data.response
  }

  async function fillText() {
    mainTextVar = String(int(mainTextVar)+1)
  }

  import { onMount } from 'svelte';

  let initialized = false;
  let debounceTimeoutAddress;
  let debounceTimeoutText;

  // Reactive watcher with debounce and skip-initial logic
  $: if (initialized && selectedAddress !== undefined) {
    clearTimeout(debounceTimeoutAddress);
    debounceTimeoutAddress = setTimeout(() => {
      handleSelectionChangeAddress(selectedAddress);
    }, 300); // debounce delay in ms
  }

  $: if (initialized && selectedTextTemplate !== undefined) {
    clearTimeout(debounceTimeoutText);
    debounceTimeoutText = setTimeout(() => {
      handleSelectionChangeText(selectedTextTemplate);
    }, 300); // debounce delay in ms
  }

  // Set initialized flag after first render
  onMount(() => {
    initialized = true;
  });

  function handleSelectionChangeAddress(value) {
    console.log("Debounced selection:", value);
    enteredAddress = selectedAddress.name + "\n" + selectedAddress.street + "\n" + selectedAddress.postal_code + " " + selectedAddress.city; 
  }

  function formatAddressTemplate(value) {
    console.log("format address selection:", value);
    return value.name + "," + value.street + "\n" + value.postal_code + " " + value.city; 
  }

  function formatTextTemplate(value) {
    console.log("format text selection:", value.beschreibung);
    return value.beschreibung; 
  }

  function handleSelectionChangeText(value) {
    console.log("Debounced selection:", value);
    enteredTextTemplate = selectedTextTemplate.content.replace(/\\n/g, '\n');
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
          endpoint="/api/addresses"
          placeholder="Adresse suchen oder auswählen"
          format={formatAddressTemplate}
        />
      </div>
      <textarea
      id="address"
      class="w-full p-2 border-4 rounded mb-4"
      rows="4"
      bind:value={enteredAddress}
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
        endpoint="/api/textTemplates"
        placeholder="Textvorlage suchen oder auswählen"
        format={formatTextTemplate}
      />
    </div>
    <textarea
      id="maintext"
      class="w-full p-2 border-4 rounded "
      rows="20"
      bind:value={enteredTextTemplate}
    ></textarea>
  </div>
  <button id="makePDF" class=" text-white px-4 py-2 rounded-xl bg-blue-600  bottom-10 mb-10" on:click={downloadPdf}>
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

  <button id="sendAI" class=" text-white px-4 py-2 rounded-xl bg-blue-600" on:click={sendQuery}>
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
