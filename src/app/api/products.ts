export const fetchListProducts = async () => {
  try {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddProduct = async (body: any) => {
  try {
    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDetailProduct = async (id: string) => {
  try {
    const res = await fetch("http://localhost:3001/products/" + id);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchEditProduct = async (id: string, body: any) => {
  try {
    const res = await fetch("http://localhost:3001/products/" + id, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteProduct = async (id: string) => {
  try {
    const res = await fetch("http://localhost:3001/products/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
