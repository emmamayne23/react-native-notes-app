import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://anlofoqxfkauehgshiaz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubG9mb3F4ZmthdWVoZ3NoaWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDI5OTMsImV4cCI6MjA2MDIxODk5M30.UcoiIKt2p4Iki_zN68LwW_rIZkCb3n8B30HjQgIKVj4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
