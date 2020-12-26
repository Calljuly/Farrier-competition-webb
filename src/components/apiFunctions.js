export const deleteCompetition = async (competitionId) => {
  fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/competitions/${competitionId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:");
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const createCompetition = async (token, competition) => {
  fetch(
    "https://us-central1-farrier-project.cloudfunctions.net/app/competitions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(competition),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
