export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  const PUBLIC_PATH = ["/auth/login", "/auth/register"];
  if (PUBLIC_PATH.some((public_path) => to.path.includes(public_path))) {
    return;
  }
  if (token.value === undefined || token.value === "") {
    return 
  }
});
