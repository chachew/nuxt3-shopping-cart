<template>
  <v-app>
    <Navbar />
    <!-- Adding the padding-top to match height of navbar will remove transition effect.. -->
    <v-main class="d-flex" tag="div" style="margin-left: 160px">
      <div class="d-flex flex-1-1 ga-4 my-8">
        <div class="d-flex flex-column bg-grey-lighten-3 w-25 rounded-lg ga-6 px-4 py-8">
          <v-list :lines="false" bg-color="transparent">
            <v-list-item v-for="(link, i) in links" :key="i" :to="link.link" :title="link.text" />
          </v-list>
        </div>
        <div class="d-flex flex-1-1">
          <NuxtPage />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();

const links = [
  { text: 'Products', link: '/dashboard/product/list' },
  { text: 'Add Product', link: '/dashboard/product/add' }
];

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  await router.push('/');
};
</script>
