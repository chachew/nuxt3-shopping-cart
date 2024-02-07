import { isSuperAdmin } from '@/utils/auth';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const isUserSuperAdmin = await isSuperAdmin();

  if (!isUserSuperAdmin) {
    throw createError({ statusCode: 404, statusMessage: `Page not found: ${to.path}` });
  }
});
