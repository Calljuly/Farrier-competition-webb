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

export const startCompetitions = async (token, id, comp, result) => {
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/startCompetition/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        divisions: comp.divisions,
        className: comp.className,
        result: result,
      }),
    }
  );

  return response.json();
};
export const openCompetition = async (token, id, checked) => {
  console.log(checked)
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/openCompetition/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        value: checked,
      }),
    }
  );

  return response.json();
};
export const saveClassResult = async (token, id, divisions, className) => {
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/saveClassResult/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        divisions: divisions,
        className: className,
      }),
    }
  );

  return response.json();
};
export const createAdmin = (token, email) => {
  fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/createAdmin/hoastimmy@gmail.com`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: email }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const enterCompetitions = async (token, updatedState, id) => {
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/enter/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentEntries: updatedState.currentEntries,
        anvils: updatedState.anvils,
        entries: updatedState.entries,
      }),
    }
  );
  return response.json();
};

export const addNewPoint = async (compIndex, token, state) => {
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/addPoint/${compIndex}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        divisions: state.divisions,
        className: state.className,
        class: state,
      }),
    }
  );
  return response.json();
};
export const fetchAllCompetitions = async () => {
  const response = await fetch(
    "https://us-central1-farrier-project.cloudfunctions.net/app/competitions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const resgisterNewUser = async (newUser) => {
  const response = await fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/user/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }
  );
  return response.json();
};

export const signUserOut = () => {};

export const updateUser = () => {};
