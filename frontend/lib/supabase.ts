import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qccnvnnorfloxjjfkabd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjY252bm5vcmZsb3hqamZrYWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjUyMjcsImV4cCI6MjA1OTU0MTIyN30.gQ1V3ryRTQ2n5w0vHrapM-9My2X3olcPIP5MDa2RnKg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})