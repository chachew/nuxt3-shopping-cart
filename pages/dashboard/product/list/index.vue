<template>
  <v-sheet class="w-100">
    <v-sheet class="d-flex flex-column px-10" max-width="90%">
      <h1 class="text-h6 font-weight-bold text-center">PRODUCTS</h1>
      <div v-if="items" class="d-flex flex-column ga-4 pt-4">
        <v-card v-for="item in items" class="d-flex rounded-sm" elevation="4" :key="item.id">
          <!-- <figure class="overflow-hidden p-2">
            <img
              :alt="item.name"
              :src="imageUrl + item.img_file"
              class="object-cover object-center w-32 rounded-md"
            />
          </figure> -->
          <div class="d-flex mt-4 p-4 flex-column ga-2 flex-1-1">
            <div class="flex flex-col gap-0">
              <h2 class="text-neutral-700 tracking-tighter uppercase font-semibold">
                {{ item?.brand }}
              </h2>
              <h2 class="text-neutral-700">
                {{ item?.name?.substring(0, 50) }}
              </h2>
            </div>
            <div class="d-flex justify-space-between align-center">
              <p class="font-bold">${{ convertCost(item.price) }}</p>
              <div class="d-flex ga-2">
                <!-- <NuxtLink class="border border-black p-2 rounded-lg text-decoration-none" :to="`/dashboard/product/edit/${item.id}`">
                  Edit
                </NuxtLink>
                <button @click="deleteProduct(item.id)" class="bg-black text-white p-2 rounded-lg">Delete</button> -->
                <v-btn variant="outlined" :to="`/dashboard/product/edit/${item.id}`">Edit</v-btn>
                <v-btn color="black" @click="deleteProduct(item.id)">Delete</v-btn>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'super-admin'
});

const runtimeConfig = useRuntimeConfig();
const imageUrl = runtimeConfig.public.baseImageUrl;

const items = ref<Array<any> | null | undefined>([]);

const loadProducts = async () => {
  const { data: response, error } = await useFetch('/api/products/list');
  // console.log('loadProducts', response.value?.data);

  if (error.value) {
    console.log(error.value);
  } else {
    if (items.value) items.value = response.value?.data;
  }
};

const deleteProduct = async (id: string) => {
  try {
    // Why cant i use the useFetch method on the client-side? Throws console errors
    const response = await $fetch('/api/products/' + id, { method: 'delete' });

    if (items.value) items.value = items.value.filter((product) => product.id !== id);
  } catch (error) {
    console.error('Error:', error);
  }
};

const convertCost = (cost: number) => {
  return (cost / 100).toFixed(2);
};

// Load product data from db
await loadProducts();
</script>
