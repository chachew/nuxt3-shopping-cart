<template>
  <div>
    <p>User profile here</p>
    <p>{{ user?.email }}</p>
    <!-- <p>
      <v-btn @click="updateUser">Update User Metadata</v-btn>
    </p> -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const user = useSupabaseUser(); // Need to get extra data from user metadata from supabase
const client = useSupabaseClient();

const updateUser = async () => {
  const metadata = user.value?.user_metadata;
  if (metadata) metadata.tisTest = null;

  const { data, error } = await client.auth.updateUser({
    data: metadata
  });

  console.log('updateUser', data);
};
</script>
