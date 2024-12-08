import { supabase } from './supabase-service';

export const login = async (identifier: string, password: string) => {
  let email = identifier;

  if (!identifier.includes('@')) {
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', identifier)
      .single();
    console.log(error)
    if (error || !data) {
      console.log(error)
      return error;
    }

    email = data.email;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error;
};

export const register = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return error;
  }

  if (data.user) {
    const { error } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id, username, email }]);

    if (error) {
      return error;
    }
  }
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
