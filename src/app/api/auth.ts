export const LoginAdmin = async (email: string, password: string) => {
  const listAdmins = await fetch("http://localhost:3001/admins");
  const data = await listAdmins.json();
  const findAdmin = data.find((admin: any) => admin.email === email);
  if (findAdmin) {
    if (findAdmin.password === password) {
      return { code: 200, message: "Success", user: findAdmin };
    } else {
      return { code: 401, message: "Wrong Password" };
    }
  } else {
    return { code: 404, message: "Admin Not Found" };
  }
};
