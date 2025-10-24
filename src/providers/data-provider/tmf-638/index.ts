"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";
import axios from "axios";

const API_URL = "https://maestro.euprojects.net/tmf-api"; //"http://localhost:4000";

const httpClient = axios.create({
  headers: {},
});

httpClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken(); // or from cookies, etc.
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export const tmf638DataProvider = dataProviderSimpleRest(
  "/maestro/serviceInventory/v4",
  httpClient
);

async function getAccessToken() {
  console.log("get access token...");
  const tokenUrl =
    "https://maestro-keycloak.euprojects.net/realms/tmf/protocol/openid-connect/token";

  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", "tmf-api");
  params.append("client_secret", "supersecret");
  params.append("username", "age");
  params.append("password", "supersecret");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();
  console.log(data);
  return data.access_token;
}
