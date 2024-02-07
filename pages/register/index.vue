<template>
  <v-card class="bg-white px-6 pt-10 pb-8 rounded-lg" min-width="28rem" elevation="10">
    <v-sheet>
      <v-sheet class="text-center">
        <h1 class="text-3xl font-weight-black text-gray">REGISTER</h1>
        <p class="mt-1 font-weight-medium text-gray">Create your account here</p>
      </v-sheet>
      <v-sheet class="mt-5">
        <v-form ref="form" v-model="valid" validate-on="submit lazy">
          <v-text-field
            class="mt-6"
            v-model="firstName"
            label="First Name"
            variant="underlined"
            :rules="[requiredValidator('First Name')]"
          />
          <v-text-field
            class="mt-1"
            v-model="lastName"
            label="Last Name"
            variant="underlined"
            :rules="[requiredValidator('Last Name')]"
          />
          <v-text-field
            class="mt-1"
            v-model="email"
            label="Email Address"
            variant="underlined"
            :rules="[requiredValidator('Email'), emailValidator]"
          />
          <v-text-field
            class="mt-1"
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            variant="underlined"
            :rules="[requiredValidator('Password')]"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
          />
          <p class="text-red text-center my-6">{{ errorMsg }}</p>
          <div class="my-6">
            <v-btn class="mt-6 text-white py-4" block color="black" height="56" :loading="isLoading" @click="signUp">
              Register
            </v-btn>
          </div>
          <p class="text-center">
            Already have an account?
            <NuxtLink class="text-decoration-none text-black font-weight-bold" to="/login">Sign In</NuxtLink>.
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

import { emailValidator, requiredValidator } from '@/plugins/vuetify/rules';

const supabase = useSupabaseClient();
const form = ref();
const valid = ref(false);
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const errorMsg = ref<string | null>(null);
const isLoading = ref(false);
const showPassword = ref(false);
const router = useRouter();

const signUp = async () => {
  // Validate form inputs.
  const isFormValid = (await form.value.validate()).valid;
  if (isFormValid) {
    isLoading.value = true;
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: firstName.value,
          last_name: lastName.value
        }
      }
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
