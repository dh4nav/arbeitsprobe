<script>
  export let endpoint = ''
  export let placeholder = 'Select...'
  export let label = ''
  export let selected = ''

  let items = []
  let search = selected
  let isOpen = false

  // Load options from the API endpoint
  async function loadItems() {
    try {
      const res = await fetch(endpoint)
      items = await res.json()
    } catch (e) {
      console.error('Failed to load items from', endpoint, e)
    }
  }

  // Automatically load on first open
  function open() {
    if (items.length === 0) {
      loadItems()
    }
    isOpen = true
  }

  $: filtered = search
    ? items.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    : items

  function selectItem(item) {
    selected = item
    search = item
    isOpen = false
  }
</script>

<div class="relative w-full">
  {#if label}
    <label class="block mb-1 text-sm font-medium text-gray-700">{label}</label>
  {/if}
  <div class="flex border rounded items-center overflow-hidden">
    <input
      type="text"
      class="w-full px-3 py-2 outline-none"
      placeholder={placeholder}
      bind:value={search}
      on:focus={open}
      on:input={() => (isOpen = true)}
    />
    <button
      type="button"
      class="px-3 text-gray-500 hover:text-black"
      on:click={() => (isOpen = !isOpen)}
    >
      ▼
    </button>
  </div>

  {#if isOpen}
    <ul
      class="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto border bg-white rounded shadow"
    >
      {#each filtered as item}
        <li
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
          on:click={() => selectItem(item)}
        >
          {item}
        </li>
      {/each}

      {#if filtered.length === 0}
        <li class="px-3 py-2 text-gray-400">No results</li>
      {/if}
    </ul>
  {/if}
</div>
