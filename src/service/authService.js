import SummaryApi from "../common";

//////////////////////////////////////////////
export const signup = async (data) => {
  try {
    const res = await fetch(SummaryApi.signUp.ulr, {
      method: SummaryApi.signUp.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const login = async (data) => {
  try {
    const res = await fetch(SummaryApi.login.ulr, {
      method: SummaryApi.login.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const fetchUserDetails = async () => {
  try {
    const res = await fetch(SummaryApi.currentUser.ulr, {
      method: SummaryApi.currentUser.method,
      credentials: "include",
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const logout = async () => {
  try {
    const res = await fetch(SummaryApi.logout.ulr, {
      method: SummaryApi.logout.method,
      credentials: "include",
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
