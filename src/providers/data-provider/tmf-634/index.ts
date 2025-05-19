"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";
import axios from "axios";

const API_URL = "http://openslice-1.euprojects.net/tmf-api";

const httpClient = axios.create({
  headers: {},
});
export const tmf634DataProvider = dataProviderSimpleRest(
  "/openslice/resourceCatalogManagement/v4",
  httpClient
);
