<template>
  <v-app-bar class="bg-white" flat height="76" style="border-bottom: 1px solid #d4d4d4">
    <v-sheet
      class="d-flex flex-wrap w-100 pa-5 justify-center align-center justify-space-between"
      max-width="1280"
      style="margin: 0 160px"
    >
      <!-- Title -->
      <NuxtLink class="text-black" to="/">
        <v-sheet class="d-flex flex-column">
          <h1 class="title-line-1">Online</h1>
          <p class="title-line-2">Shop</p>
        </v-sheet>
      </NuxtLink>

      <!-- Links -->
      <v-sheet class="d-flex ga-8">
        <template v-for="link in links" :key="link.name">
          <NuxtLink class="text-black" :to="link.link">{{ link.name }}</NuxtLink>
        </template>
      </v-sheet>

      <!-- Search Bar -->
      <v-sheet class="d-flex w-100" max-width="32rem" style="position: relative">
        <v-text-field
          placeholder="Search"
          bg-color="grey-lighten-3"
          single-line
          rounded
          clearable
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
        />
      </v-sheet>

      <!-- Shopping cart icon-->
      <v-sheet class="d-flex ga-4 align-center">
        <NuxtLink to="/cart">
          <v-icon icon="mdi-shopping-outline" size="large"></v-icon>
        </NuxtLink>
      </v-sheet>
    </v-sheet>

    <v-spacer />

    <!-- Guest Login/Register link -->
    <NuxtLink v-if="!user" class="text-black mr-5" to="/login">Login/Register</NuxtLink>

    <!-- User Menu -->
    <v-menu v-else :close-on-content-click="true">
      <template v-slot:activator="{ props }">
        <v-btn class="mr-3" variant="plain" v-bind="props">
          <v-avatar color="red">
            <h3>{{ userInitials }}</h3>
          </v-avatar>
        </v-btn>
      </template>
      <v-list min-width="150" max-width="250">
        <v-list-item class="mb-1" density="compact" to="/user/profile">
          <v-list-item-title class="text-subtitle-2">
            {{ user?.user_metadata.first_name }} {{ user?.user_metadata.last_name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user?.email }}
          </v-list-item-subtitle>
        </v-list-item>
        <!-- <v-list-item v-if="userIsSuperAdmin" class="my-1" density="compact" to="/dashboard/product/list"> -->
        <v-list-item class="my-1" density="compact" to="/dashboard/product/list">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item class="mt-2" density="compact" @click="signOut()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const userIsSuperAdmin = user.value?.user_metadata.is_super_admin || false;
const userInitials = computed((): string | null => {
  if (!user.value) return null;
  return [
    user.value.user_metadata.first_name.charAt(0).toUpperCase() || null,
    user.value.user_metadata.last_name.charAt(0).toUpperCase() || null
  ].join('') || '--';
});

const links = [
  { name: 'Shop', link: '/shop' },
  { name: 'New Arrivals', link: '/' },
  { name: 'Category', link: '/' }
];

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  await router.push('/');
};
</script>

<style scoped>
.title-line-1 {
  font-weight: 900;
  line-height: 1;
  font-size: 1.5rem;
}
.title-line-2 {
  font-weight: 500;
  line-height: 1;
}
</style>
