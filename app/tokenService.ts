export async function loginWithPassword(username, password, clientId, clientSecret) {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", clientId);
  params.append("username", username);
  params.append("password", password);
  if (clientSecret) params.append("client_secret", clientSecret);

  const response = await fetch("http://<KEYCLOAK>/realms/ERP_Project/protocol/openid-connect/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  }
  return data;
}

export async function refreshAccessToken(refreshToken, clientId, clientSecret) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", clientId);
  params.append("refresh_token", refreshToken);
  if (clientSecret) params.append("client_secret", clientSecret);

  const response = await fetch("http://<KEYCLOAK>/realms/ERP_Project/protocol/openid-connect/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  }
  return data;
}
