// Initialize Supabase client using the global SUPABASE_CONFIG
(() => {
  if (!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.url || !window.SUPABASE_CONFIG.anonKey) {
    console.error("Supabase config is missing. Please set url and anonKey in supabase-config.js");
    return;
  }

  const { url, anonKey } = window.SUPABASE_CONFIG;
  window.supabaseClient = window.supabase.createClient(url, anonKey);

  // Optional: quick check that the client works by fetching current time from Postgres
  // Requires a table or RPC. We'll just log the client for now.
  console.log("Supabase client initialized", { projectUrl: url });
})();

