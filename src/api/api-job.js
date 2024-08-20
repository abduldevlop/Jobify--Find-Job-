import supabaseCilent from "@/utils/supabse";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseCilent(token);

  let query = supabase
    .from("jobs")
    .select("*, save-jobs(id), companies(Name,logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("companie_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;

  if (error) {
    console.error("Error featching Jobs", error);
    return null;
  }
  return data;
}
