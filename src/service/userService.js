import SummaryApi from "../common";
//////////////////////////////////////////////
export const allUsers = async () => {
  try {
    const res = await fetch(SummaryApi.allUsers.ulr, {
      method: SummaryApi.allUsers.method,
      credentials: "include",
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const updateUser = async (userId, userRole) => {
  try {
    const res = await fetch(SummaryApi.updateUser.ulr, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
