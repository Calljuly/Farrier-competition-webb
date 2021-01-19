export const createClass = async (token, newClass, id) => {
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/classes/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newClass),
    }
  );

  return response.json();
};
export const createCompetition = async (token, comp) => {
  const response = await fetch(
    "https://us-central1-farrier-project.cloudfunctions.net/app/competitions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comp),
    }
  );

  return response.json();
};

export const editClass = async (token, id, className, classes) => {
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/classes/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ className: className, classes: classes }),
    }
  );

  return response.json();
};

export const editCompetition = async (token, id, comp) => {
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/competitions/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comp),
    }
  );

  return response.json();
};
