import supabaseCilent from "@/utils/supabse";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseCilent(token);

  let query = supabase
    .from("jobs")
    .select("*, saved_jobs(id), companies(Name,logo_url)");

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

export async function saveJob(token, { alredySave }, saveData) {
  const supabase = await supabaseCilent(token);

  if (alredySave) {
    let { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);
    if (deleteError) {
      console.error("Error Deleting save Job", error);
      return null;
    }
    return data;
  } else {
    let { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error inerting Job", error);
      return null;
    }

    return data;
  }
}
