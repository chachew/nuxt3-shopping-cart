<template>
  <div class="w-100">
    <div class="d-flex flex-column px-10">
      <!-- <h1 class="text-h6 font-weight-bold text-center">EDIT PRODUCT</h1> -->
      <v-sheet class="d-flex align-center">
        <v-spacer />
        <h1 class="text-h6 font-weight-bold text-center">EDIT PRODUCT</h1>
        <v-spacer />
        <!-- <v-card flat :disabled="false"> -->
        <v-btn class="mr-3" color="primary" :disabled="!hasFormChanged">Save</v-btn>
        <v-btn color="error" :disabled="!hasFormChanged" @click="revertChanges">Cancel</v-btn>
        <!-- </v-card> -->
      </v-sheet>
      <v-sheet>
        <v-form>
          <v-text-field
            v-model="productData.name"
            class="mt-6"
            label="Title"
            hide-details
            variant="underlined"
            color="grey-lighten-1"
            base-color="grey-lighten-1"
          />
          <v-text-field
            v-model="productData.brand"
            class="mt-6"
            label="Brand"
            hide-details
            variant="underlined"
            color="grey-lighten-1"
            base-color="grey-lighten-1"
          />
          <v-text-field
            v-model="productData.category"
            class="mt-6"
            label="Category"
            hide-details
            variant="underlined"
            color="grey-lighten-1"
            base-color="grey-lighten-1"
          />
          <v-text-field
            v-model="productData.description"
            class="mt-6"
            label="Description"
            hide-details
            variant="underlined"
            color="grey-lighten-1"
            base-color="grey-lighten-1"
          />
          <div class="d-flex flex-row mt-6">
            <v-text-field
              v-model="productData.price"
              class="mr-6"
              label="Price"
              hide-details
              variant="underlined"
              color="grey-lighten-1"
              base-color="grey-lighten-1"
            />
            <v-text-field
              v-model="productData.inventory"
              label="Inventory"
              hide-details
              variant="underlined"
              color="grey-lighten-1"
              base-color="grey-lighten-1"
            />
          </div>
          <v-btn class="mt-6" rounded :disabled="isSelecting" @click="handleFileImport">Upload Image</v-btn>
          <input
            class="d-none"
            ref="uploader"
            type="file"
            accept="image/png, image/jpeg"
            @change="updateFormWithFile"
          />
          <v-sheet class="d-flex justify-center align-center mt-5" :border="true" height="250" width="250">
            <span v-if="!imgUrl">No Image</span>
            <!-- // FIXME: Need a way to close/cancel out a pending image. Also a way to delete existing images from the db -->
            <v-img v-else :src="imgUrl" />
          </v-sheet>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'super-admin'
  // middleware: 'auth'
});

const productData = ref<any>({}); // FIXME: This needs to be typed
const productImage = ref<File | null>(null);
const formDataLoaded = ref<string | null>(null);
const isSelecting = ref(false);
const uploader = ref();
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();
const imgUrl = ref<string | null>(null);

const hasFormChanged = computed(() => (formDataLoaded.value === stringifyData(productData.value) ? false : true)); // FIXME: This doesn't do anything for the File to upload

const loadProduct = async () => {
  const { data: response, error } = await useFetch(`/api/products/${route.params.id}`);

  if (error.value) {
    console.log(error.value);
    formDataLoaded.value = null;
  } else {
    if (response.value) {
      productData.value = response.value.data;
      formDataLoaded.value = stringifyData(productData.value);
    }
  }
};

const stringifyData = (data: any) => {
  return JSON.stringify(data);
};

const editProduct = async () => {
  const { error } = await supabase
    .from('products')
    .update({ ...productData.value })
    .eq('product_id', route.params.id)
    .select();
  if (error) {
    console.log(error);
  } else {
    await router.push('/dashboard/product/list');
  }
};

const handleFileImport = () => {
  isSelecting.value = true;

  // After obtaining the focus when closing the FilePicker, return the button state to normal
  window.addEventListener(
    'focus',
    () => {
      isSelecting.value = false;
    },
    { once: true }
  );

  // Trigger click on the FileInput
  uploader.value.click();
};

const updateFormWithFile = async (e: any) => {
  const file = e.target.files[0] as File;

  // Show the image to the user before its uploaded.
  if (file) {
    productImage.value = file;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.addEventListener('load', function () {
      imgUrl.value = this.result as string;
    });
  }
};

const uploadFile = async (file: File) => {
  const fileNameLong = file.name.split(/[\s.]+/);
  const _fileName = [...fileNameLong];
  const fileName = _fileName.join('_');

  const body = new FormData();
  body.append('id', route.params.id.toString());
  body.append('file', file, fileName);

  const response = await $fetch('/api/files/upload', {
    method: 'POST',
    body
  });

  console.log('response', response);
};

const revertChanges = () => {
  // FIXME: This doesn't do anything for the File to upload
  productData.value = JSON.parse(formDataLoaded.value!);
};

await loadProduct();
</script>
