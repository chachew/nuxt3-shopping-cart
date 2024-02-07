import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Check if the authenticated user is a Super Admin
 * @param supabaseClient Supabase client instance or undefined.
 * @returns true/false if user is a super admin
 */
export const isSuperAdmin = async (supabaseClient?: SupabaseClient) => {
  try {
    if (supabaseClient) {
      const auth = await supabaseClient.auth.getSession();

      return auth.data.session?.user.user_metadata['is_super_admin'] || false;
    } else {
      const user = useSupabaseUser();
      return user.value?.user_metadata['is_super_admin'] || false;
    }
  } catch (error) {
    return false;
  }
};
