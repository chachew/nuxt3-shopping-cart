import { serverSupabaseClient } from '#supabase/server';
import { Database } from '@/types/database.types';
import { isSuperAdmin } from '@/utils/auth';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const isUserSuperAdmin = await isSuperAdmin(supabase);

  if (!isUserSuperAdmin) {
    throw createError({
      statusCode: 401
      // statusMessage: 'Unauthorized'
    });
  }

  const { id } = getRouterParams(event);

  return await supabase.from('products').delete().eq('id', id);
});
