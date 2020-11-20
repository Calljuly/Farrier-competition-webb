export const createCompetition = async (competition) => {
  fetch("http://localhost:5001/farrier-project/us-central1/app/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(competition),
  })
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
    `http://localhost:5001/farrier-project/us-central1/app/delete/${competitionId}`,
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
    `http://localhost:5001/farrier-project/us-central1/app/competitions/${competitionId}`,
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
  fetch(`http://localhost:5001/farrier-project/us-central1/app/competitions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
