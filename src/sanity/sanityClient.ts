import { createClient } from "@sanity/client";

export default createClient({
  projectId: "te8jbj37", // ✅ Replace with your actual project ID
  dataset: "production", // use a specific API version
  useCdn: true, // `false` if you want fresh data
});
