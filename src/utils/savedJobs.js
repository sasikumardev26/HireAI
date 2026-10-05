const STORAGE_KEY = "hireaiSavedJobs";

// Get saved jobs
export const getSavedJobs = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error reading saved jobs:", error);
    return [];
  }
};

// Check whether a job is saved
export const isJobSaved = (jobId) => {
  const savedJobs = getSavedJobs();

  return savedJobs.some(
    (job) => String(job.id) === String(jobId)
  );
};

// Save a job
export const saveJob = (job) => {
  const savedJobs = getSavedJobs();

  const alreadySaved = savedJobs.some(
    (item) => String(item.id) === String(job.id)
  );

  if (alreadySaved) {
    return savedJobs;
  }

  const updatedJobs = [...savedJobs, job];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedJobs)
  );

  return updatedJobs;
};

// Remove a saved job
export const removeSavedJob = (jobId) => {
  const savedJobs = getSavedJobs();

  const updatedJobs = savedJobs.filter(
    (job) => String(job.id) !== String(jobId)
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedJobs)
  );

  return updatedJobs;
};

// Toggle save / unsave
export const toggleSavedJob = (job) => {
  if (isJobSaved(job.id)) {
    return removeSavedJob(job.id);
  }

  return saveJob(job);
};

// Clear all saved jobs
export const clearSavedJobs = () => {
  localStorage.removeItem(STORAGE_KEY);
};