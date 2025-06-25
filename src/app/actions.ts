"use server";

export type ServiceCharacteristic = {
  name: string;
  value: string;
  valueType: string;
};

export type ServiceItem = {
  categoryId: string;
  category: string;
  description: string;
  serviceSpecificationId: string;
  name: string;
  version: string;
  characteristics: ServiceCharacteristic[];
};

export async function getAccessToken() {
  console.log("get access token...");
  const tokenUrl =
    "https://maestro-keycloak.euprojects.net/realms/tmf/protocol/openid-connect/token";

  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", "tmf-api");
  params.append("client_secret", "A0cx2x4YT5vqYX3hpmA4kURyGncsl4Vd");
  params.append("username", "age");
  params.append("password", "@gep@ss!");

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

export async function makeServiceOrder(payload: any) {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      "https://maestro.euprojects.net/tmf-api/serviceOrdering/v4/serviceOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json(); // or .json() if applicable
      return {
        success: false,
        error: `Server responded with ${response.status}: ${errorDetails}`,
      };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Unknown error" };
  }
}

export async function fetchAggregatedServices(): Promise<ServiceItem[]> {
  const services: ServiceItem[] = [];

  // Step 1: Fetch service categories
  const categoriesRes = await fetch(
    "https://maestro.euprojects.net/tmf-api/serviceCatalogManagement/v4/serviceCategory"
  );
  if (!categoriesRes.ok) throw new Error("Failed to fetch service categories");
  const categories = await categoriesRes.json();

  // Step 2: Iterate categories → candidates → service specs
  for (const category of categories) {
    for (const candidate of category.serviceCandidate || []) {
      try {
        const specRes = await fetch(
          `https://maestro.euprojects.net/tmf-api/serviceCatalogManagement/v4/serviceSpecification/${candidate.id}`
        );
        if (!specRes.ok) continue;
        const spec = await specRes.json();

        // const characteristics: ServiceCharacteristic[] = (
        //   spec.specCharacteristic || []
        // ).flatMap((char: any) =>
        //   (char.characteristicValueSpecification || [])
        //     .filter((v: any) => v.isDefault)
        //     .map((v: any) => ({
        //       name: char.name,
        //       value: v.value?.value,
        //       valueType: v.valueType || v.value?.valueType || "TEXT",
        //     }))
        // );
        const characteristics = (spec.specCharacteristic || []).map(
          (char: any) => {
            const defaultSpec = (
              char.characteristicValueSpecification || []
            ).find((v: any) => v.isDefault);

            return {
              name: char.name,
              value: defaultSpec?.value?.value ?? "", // use default if present, else empty string
              valueType: char.valueType || "TEXT",
            };
          }
        );
        services.push({
          categoryId: category.id,
          category: category.name,
          description: category.description,
          serviceSpecificationId: spec.id,
          name: spec.name,
          version: spec.version || "1.0.0",
          characteristics,
        });
      } catch (err) {
        console.error(
          `Failed to fetch spec for candidate ${candidate.id}`,
          err
        );
      }
    }
  }

  // 3. Fetch all available service specifications directly
  const globalSpecsRes = await fetch(
    "https://maestro.euprojects.net/tmf-api/serviceCatalogManagement/v4/serviceSpecification"
  );
  if (!globalSpecsRes.ok)
    throw new Error("Failed to fetch global service specifications");
  const globalSpecs = await globalSpecsRes.json();

  // 4. Add missing specs (not already in `services`)
  for (const spec of globalSpecs) {
    const alreadyIncluded = services.some(
      (s) => s.serviceSpecificationId === spec.id
    );
    if (alreadyIncluded) continue;

    // const characteristics = (spec.specCharacteristic || []).flatMap(
    //   (char: any) =>
    //     (char.characteristicValueSpecification || [])
    //       .filter((v: any) => v.isDefault)
    //       .map((v: any) => ({
    //         name: char.name,
    //         value: v.value?.value,
    //         valueType: char.valueType || "TEXT",
    //       }))
    // );
    const characteristics = (spec.specCharacteristic || []).map((char: any) => {
      const defaultSpec = (char.characteristicValueSpecification || []).find(
        (v: any) => v.isDefault
      );

      return {
        name: char.name,
        value: defaultSpec?.value?.value ?? "", // use default if present, else empty string
        valueType: char.valueType || "TEXT",
      };
    });

    services.push({
      categoryId: "uncategorized", // fallback for uncategorized
      category: "Uncategorized",
      description: "",
      serviceSpecificationId: spec.id,
      name: spec.name,
      version: spec.version || "1.0.0",
      characteristics,
    });
  }

  return services;
}
