import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cuisvbfxxtgldpxvblfg.supabase.co';
const supabaseAnonKey = 'sb_publishable_FGxCJj9xSpcD0TyjYZmUAA_XYubDuT6';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
