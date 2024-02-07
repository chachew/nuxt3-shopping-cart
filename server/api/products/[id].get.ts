import { serverSupabaseClient } from '#supabase/server';
import { Database } from '@/types/database.types';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const { id } = getRouterParams(event);

  // Get single product by id
  return await supabase.from('products').select('*').eq('id', id).limit(1).single();
});
