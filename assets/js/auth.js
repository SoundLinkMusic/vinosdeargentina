/**
 * Auth Module - Manejo de autenticación y usuarios
 * Estructura base para integración futura con Supabase
 */

const AuthModule = (() => {
  let currentUser = null;
  const STORAGE_KEY = 'de_altura_user';

  // Obtener usuario actual del localStorage
  const getUser = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  // Guardar usuario
  const saveUser = (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    currentUser = user;
    return user;
  };

  // Limpiar usuario (logout)
  const clearUser = () => {
    localStorage.removeItem(STORAGE_KEY);
    currentUser = null;
  };

  // Validar email
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Login simple (preparado para Supabase)
  const login = async (email, password) => {
    if (!isValidEmail(email) || password.length < 6) {
      return { error: 'Credenciales inválidas' };
    }

    // TODO: Conectar a Supabase
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    const user = {
      email,
      role: 'customer',
      discount_percent: 0,
      created_at: new Date().toISOString()
    };

    saveUser(user);
    return { user };
  };

  // Signup simple
  const signup = async (email, password) => {
    if (!isValidEmail(email) || password.length < 6) {
      return { error: 'Email o contraseña inválidos' };
    }

    // TODO: Conectar a Supabase
    const user = {
      email,
      role: 'customer',
      discount_percent: 0,
      created_at: new Date().toISOString()
    };

    saveUser(user);
    return { user };
  };

  // Logout
  const logout = () => {
    clearUser();
    return { success: true };
  };

  // Obtener usuario actual
  const getCurrentUser = () => currentUser || getUser();

  // Verificar si usuario está autenticado
  const isAuthenticated = () => !!getCurrentUser();

  // Obtener descuento del usuario
  const getUserDiscount = () => {
    const user = getCurrentUser();
    return user?.discount_percent || 0;
  };

  return {
    login,
    signup,
    logout,
    getUser,
    saveUser,
    clearUser,
    getCurrentUser,
    isAuthenticated,
    getUserDiscount,
    isValidEmail
  };
})();
