export const fetchListCategories = async () => {
  try {
    const res = await fetch("http://localhost:3001/productCategories");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddCategory = async (body: any) => {
  try {
    const res = await fetch("http://localhost:3001/productCategories", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDetailCategory = async (id: string) => {
  try {
    const res = await fetch("http://localhost:3001/productCategories/" + id);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchEditCategory = async (id: string, body: any) => {
  try {
    const res = await fetch("http://localhost:3001/productCategories/" + id, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteCategory = async (id: string) => {
  try {
    const res = await fetch("http://localhost:3001/productCategories/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
