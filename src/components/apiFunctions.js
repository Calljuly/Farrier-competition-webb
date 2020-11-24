export const createCompetition = async (competition) => {
  fetch(
    "https://us-central1-farrier-project.cloudfunctions.net/app/competitions/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(competition),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", competition);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

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

export const getCompetition = async (competitionId) => {
  fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/competitions/${competitionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success" + data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const getCompetitions = async () => {
  fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/competitions/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success");
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
