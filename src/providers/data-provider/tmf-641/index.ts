"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";
import axios from "axios";

const API_URL = "https://maestro.euprojects.net/tmf-api"; //"http://localhost:4000";

const httpClient = axios.create({
  headers: {},
});

export const tmf641DataProvider = dataProviderSimpleRest(
  "/maestro/serviceOrdering/v4",
  httpClient
);
