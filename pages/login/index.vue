<template>
  <v-card class="bg-white px-6 pt-10 pb-8 rounded-lg" min-width="28rem" elevation="10">
    <v-sheet>
      <v-sheet class="text-center">
        <h1 class="text-3xl font-weight-black text-gray">SIGN IN</h1>
        <p class="mt-1 font-weight-medium text-gray">Sign in below to access your account</p>
      </v-sheet>
      <v-sheet class="mt-5">
        <v-form ref="form" v-model="valid" validate-on="submit lazy">
          <v-text-field
            class="mt-6"
            v-model="email"
            label="Email Address"
            hide-details
            variant="underlined"
            @keyup.enter="signIn"
          />
          <v-text-field
            class="mt-6"
            v-model="password"
            label="Password"
            hide-details
            type="password"
            variant="underlined"
            @keyup.enter="signIn"
          />
          <p class="text-red text-center my-6">{{ errorMsg }}</p>
          <div class="my-6">
            <v-btn class="mt-6 text-white py-4" block color="black" height="56" :loading="isLoading" @click="signIn">
              Sign in
            </v-btn>
          </div>
          <p class="text-center">
            Don't have an account yet?
            <NuxtLink class="text-decoration-none text-black font-weight-bold" to="/register">Register</NuxtLink>.
          </p>
        </v-form>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'no-auth'
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();
const form = ref();
const valid = ref(false);
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMsg = ref<string | null>(null);

const signIn = async () => {
  // Validate form inputs.
  const isFormValid = (await form.value.validate()).valid;
  if (isFormValid) {
    isLoading.value = true;

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (error) {
      errorMsg.value = error.message;
      isLoading.value = false;
      return;
    }

    await router.push('/');

    isLoading.value = false;
  }
};
</script>
