import { toast } from '@/lib/hooks/use-toast';
import { supabase } from '@/services/supabase-service';
import { useNavigate } from 'react-router-dom';

export const login = async (identifier: string, password: string) => {
  let email = identifier;

  if (!identifier.includes('@')) {
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', identifier)
      .single();
    if (error || !data) {
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

export const getJwt = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    toast({ title: 'Napaka', description: 'Seja je potekla', variant: 'destructive' });
    const navigate = useNavigate();
    navigate('/login');
    return null;
  }
  return data?.session?.access_token || null;
};

export const getRefreshToken = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    toast({ title: 'Napaka', description: 'Seja je potekla', variant: 'destructive' });
    const navigate = useNavigate();
    navigate('/login');
    return null;
  }
  return data?.session?.refresh_token || null;
}