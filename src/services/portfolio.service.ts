import { supabase } from '@/lib/supabase';
import { Project, Education, Experience } from '@/types';

export const PortfolioService = {
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_visible', true)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data as Project[];
  },

  async getEducation() {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .eq('is_visible', true)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data as Education[];
  },

  async getExperience() {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .eq('is_visible', true)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data as Experience[];
  },

  subscribeToChanges(callback: () => void) {
    const channel = supabase
      .channel('public-website-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'education' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'experience' }, callback)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
