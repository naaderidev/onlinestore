import apiRequest from "@/libs/axios/configs";

export const logoutHandler = async () => {
  const response = await apiRequest.post("/auth/logout");
  if (response.status === 201) {
    localStorage.removeItem("cart");
    location.replace("/");
  }
};
