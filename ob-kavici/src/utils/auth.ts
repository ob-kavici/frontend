import { supabase } from './supabase';

export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error;
};

export const register = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({ email, password });
  return error;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
