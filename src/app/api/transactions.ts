export const fetchListTransactions = async () => {
  try {
    const res = await fetch("http://localhost:3001/transactions");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddTransaction = async (body: any) => {
  try {
    const res = await fetch("http://localhost:3001/transactions", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDetailTransaction = async (id: string) => {
  try {
    const res = await fetch("http://localhost:3001/transactions/" + id);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
