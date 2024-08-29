import supabaseCilent from "@/utils/supabase";

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

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseCilent(token);

  let query = supabase
    .from("jobs")
    .select("*, companies(Name,logo_url), applications: applications(*)")
    .eq("id", job_id)
    .single();
  const { data, error } = await query;
  if (error) {
    console.error("Error featching job", error);
    return null;
  }
  return data;
}
// - job isOpen toggle - (recruiter_id = auth.uid())
export async function updateHiringStatus(token, { job_id }, is_open) {
  const supabase = await supabaseCilent(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ is_open })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}

// - post job
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseCilent(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}
// Read Saved Jobs
export async function getSavedJobs(token) {
  const supabase = await supabaseCilent(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(Name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}

// get my created jobs
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseCilent(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies(Name,logo_url)")
    .eq("recruter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// Delete job
export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseCilent(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}
