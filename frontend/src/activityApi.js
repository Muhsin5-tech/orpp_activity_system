const API_URL = "https://orpp-activity.onrender.com/api";

export async function getActivities(token) {
  const res = await fetch(`${API_URL}/activities`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch activities");
  return res.json();
}

export async function getActivity(id, token) {
  const res = await fetch(`${API_URL}/activities/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch activity");
  return res.json();
}

export async function createActivity(data, token) {
  const res = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error?.error || "Failed to create activity");}
  return res.json();
}

export async function updateActivity(id, data, token) {
  const res = await fetch(`${API_URL}/activities/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update activity");
  return res.json();
}

export async function deleteActivity(id, token) {
  const res = await fetch(`${API_URL}/activities/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete activity");
  return res.json();
}

export const searchActivities = async (query, token) => {
  const response = await fetch(
    `${API_URL}/activities/search?q=${encodeURIComponent(query)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch search results");
  return response.json();
};
