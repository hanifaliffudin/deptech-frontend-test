export const fetchListAdmins = async () => {
  try {
    const res = await fetch("http://localhost:3001/admins");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddAdmin = async (body: any) => {
  try {
    const res = await fetch("http://localhost:3001/admins", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDetailAdmin = async (id: string) => {
  try {
    const res = await fetch("http://localhost:3001/admins/" + id);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchEditAdmin = async (id: string, body: any) => {
  try {
    const res = await fetch("http://localhost:3001/admins/" + id, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteAdmin = async (id: string) => {
  try {
    const res = await fetch("http://localhost:3001/admins/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
