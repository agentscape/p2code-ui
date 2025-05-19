import { ollama } from "ollama-ai-provider";
import { streamText } from "ai";
import { z } from "zod";
import { generateText, tool } from "ai";
import { useList } from "@refinedev/core";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const system = `
You are an AI code assistant who answers questions about the TM Forum APIs.
Your target audience is a technical user who is looking to deploy servicers or resources via the TM Forum Service or Resource Ordering APIs.

AI assistant is a brand new, powerful, human-like artificial intelligence. The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
AI is a well-behaved and well-mannered individual.
AI is always friendly, kind and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
AI will provide the detailed answer, giving step by step instructions, including code snippets, how to interact with the APIs.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // const res = await fetch("http://localhost:4000/service");

  // const services = await res.json();

  const services = `
  "service": [
    {
      "id": "svc-1001",
      "href": "https://api.example.com/serviceInventory/v4/service/svc-1001",
      "name": "Temperature Monitoring Service",
      "category": "CustomerFacingService",
      "description": "Provides temperature sensor data through an IoT gateway.",
      "endDate": "2025-12-31T23:59:59Z",
      "hasStarted": true,
      "isBundle": false,
      "isServiceEnabled": true,
      "isStateful": true,
      "serviceDate": "2025-01-01T00:00:00Z",
      "serviceType": "IoT Sensor",
      "startDate": "2025-01-01T08:00:00Z",
      "startMode": "3",
      "state": "active",
      "serviceSpecification": {
        "id": "spec-1001",
        "href": "https://api.example.com/serviceCatalog/v4/serviceSpecification/spec-1001",
        "name": "Sensor Service Specification",
        "version": "1.0",
        "@referredType": "ServiceSpecification"
      },
      "serviceCharacteristic": [
        {
          "name": "SamplingFrequency",
          "value": "10s",
          "valueType": "string"
        },
        {
          "name": "MeasurementUnit",
          "value": "Celsius",
          "valueType": "string"
        }
      ],
      "relatedParty": [
        {
          "id": "party-001",
          "href": "https://api.example.com/party/party-001",
          "name": "Example Corp",
          "role": "Customer",
          "@referredType": "Organization"
        }
      ],
      "feature": [
        {
          "id": "ftr-001",
          "name": "Remote Access",
          "isBundle": false,
          "isEnabled": true,
          "featureCharacteristic": [
            {
              "name": "Protocol",
              "value": "MQTT",
              "valueType": "string"
            }
          ]
        }
      ],
      "place": [
        {
          "id": "plc-001",
          "href": "https://api.example.com/place/plc-001",
          "name": "Berlin IoT Lab",
          "role": "installation"
        }
      ],
      "note": [
        {
          "author": "admin@example.com",
          "date": "2025-01-02T10:15:00Z",
          "text": "Initial deployment complete."
        }
      ],
      "supportingResource": [
        {
          "id": "res-9001",
          "href": "https://api.example.com/resource/res-9001",
          "name": "Gateway A",
          "@referredType": "PhysicalResource"
        }
      ],
      "supportingService": [
        {
          "id": "svc-1000",
          "href": "https://api.example.com/serviceInventory/v4/service/svc-1000",
          "name": "Sensor Connectivity Service"
        }
      ]
    },
    {
      "id": "svc-2002",
      "href": "https://api.example.com/serviceInventory/v4/service/svc-2002",
      "name": "Smart Home Security Monitoring",
      "description": "Real-time security alerts and camera feeds for smart homes.",
      "category": "CustomerFacingService",
      "state": "active",
      "hasStarted": true,
      "isServiceEnabled": true,
      "isStateful": true,
      "isBundle": true,
      "serviceType": "Security",
      "startMode": "automatic",
      "startDate": "2025-04-01T08:00:00Z",
      "endDate": null,
      "serviceDate": "2025-04-01T08:00:00Z",
      "serviceSpecification": {
        "id": "spec-2002",
        "href": "https://api.example.com/serviceCatalog/v4/serviceSpecification/spec-2002",
        "name": "Smart Home Security Spec",
        "version": "2.0",
        "@referredType": "ServiceSpecification"
      },
      "serviceCharacteristic": [
        {
          "id": "char-01",
          "name": "CameraResolution",
          "value": "1080p",
          "valueType": "string"
        },
        {
          "id": "char-02",
          "name": "MotionDetection",
          "value": true,
          "valueType": "boolean"
        }
      ],
      "relatedParty": [
        {
          "id": "cust-002",
          "href": "https://api.example.com/partyManagement/v4/individual/cust-002",
          "name": "Jane Smith",
          "role": "Customer",
          "@referredType": "Individual",
          "@type": "RelatedParty"
        }
      ],
      "feature": [
        {
          "id": "feat-02",
          "name": "Night Vision",
          "isEnabled": true,
          "isBundle": false,
          "featureCharacteristic": [
            {
              "name": "InfraredRange",
              "value": "20m",
              "valueType": "string"
            }
          ]
        }
      ],
      "place": [
        {
          "id": "place-02",
          "href": "https://api.example.com/place/place-02",
          "name": "Customer Residence - NY",
          "role": "installation",
          "@referredType": "GeographicAddress"
        }
      ],
      "supportingResource": [
        {
          "id": "res-1002",
          "href": "https://api.example.com/resourceInventory/v4/resource/res-1002",
          "name": "Indoor Camera Model X",
          "@referredType": "PhysicalResource"
        }
      ],
      "supportingService": [
        {
          "id": "svc-1003",
          "href": "https://api.example.com/serviceInventory/v4/service/svc-1003",
          "name": "Internet Access Service",
          "@referredType": "Service"
        }
      ],
      "note": [
        {
          "id": "note-1002",
          "author": "tech@example.com",
          "date": "2025-04-01T09:30:00Z",
          "text": "Service activated remotely.",
          "@type": "Note"
        }
      ],
      "@type": "Service",
      "@baseType": "Entity",
      "@schemaLocation": "https://open-api.tmforum.org/TMF638_ServiceInventoryManagement/schema/Service.schema.json"
    },
    {
      "id": "svc-3003",
      "href": "https://api.example.com/serviceInventory/v4/service/svc-3003",
      "name": "Enterprise VPN Access",
      "description": "Secure VPN service connecting remote employees to the enterprise network.",
      "category": "Connectivity",
      "state": "active",
      "hasStarted": true,
      "isServiceEnabled": true,
      "isStateful": true,
      "isBundle": false,
      "serviceType": "VPN",
      "startMode": "manual",
      "startDate": "2025-04-01T10:00:00Z",
      "endDate": null,
      "serviceDate": "2025-04-01T10:00:00Z",
      "serviceSpecification": {
        "id": "spec-3003",
        "href": "https://api.example.com/serviceCatalog/v4/serviceSpecification/spec-3003",
        "name": "VPN Service Specification",
        "version": "3.1",
        "@referredType": "ServiceSpecification"
      },
      "serviceCharacteristic": [
        {
          "id": "vpn-protocol",
          "name": "VPNProtocol",
          "value": "IPSec",
          "valueType": "string"
        },
        {
          "id": "bandwidth",
          "name": "MaxBandwidth",
          "value": "200Mbps",
          "valueType": "string"
        },
        {
          "id": "redundancy",
          "name": "RedundancyEnabled",
          "value": true,
          "valueType": "boolean"
        }
      ],
      "relatedParty": [
        {
          "id": "org-789",
          "href": "https://api.example.com/partyManagement/v4/organization/org-789",
          "name": "Global Enterprises Ltd.",
          "role": "Customer",
          "@referredType": "Organization",
          "@type": "RelatedParty"
        }
      ],
      "feature": [
        {
          "id": "feat-3003",
          "name": "Auto Failover",
          "isEnabled": true,
          "isBundle": false,
          "featureCharacteristic": [
            {
              "name": "FailoverDelay",
              "value": "2s",
              "valueType": "string"
            }
          ]
        }
      ],
      "place": [
        {
          "id": "hq-london",
          "href": "https://api.example.com/place/hq-london",
          "name": "London Headquarters",
          "role": "primary-endpoint",
          "@referredType": "GeographicSite"
        }
      ],
      "supportingResource": [
        {
          "id": "router-9003",
          "href": "https://api.example.com/resourceInventory/v4/resource/router-9003",
          "name": "Cisco ISR 4451",
          "@referredType": "PhysicalResource"
        }
      ],
      "supportingService": [],
      "note": [
        {
          "id": "note-3003",
          "author": "netops@example.com",
          "date": "2025-04-01T11:00:00Z",
          "text": "Customer confirmed encryption requirements met.",
          "@type": "Note"
        }
      ],
      "@type": "Service",
      "@baseType": "Entity",
      "@schemaLocation": "https://open-api.tmforum.org/TMF638_ServiceInventoryManagement/schema/Service.schema.json"
    }
  ]
  `;

  const context = `    
    Available Services are the following:
    ${JSON.stringify(services)}

    An example service order looks the following:
    {
      "id": "order-001",
      "href": "https://api.example.com/serviceOrdering/v4/serviceOrder/order-001",
      "externalId": "ORD-20250326-001",
      "priority": "1",
      "description": "Order to activate IoT sensor service",
      "category": "activation",
      "requestedStartDate": "2025-03-27T09:00:00Z",
      "requestedCompletionDate": "2025-03-28T18:00:00Z",
      "expectedCompletionDate": "2025-03-28T18:00:00Z",
      "startDate": "2025-03-27T09:00:00Z",
      "completionDate": null,
      "cancellationDate": null,
      "cancellationReason": null,
      "notificationContact": "support@iotservices.com",
      "orderDate": "2025-03-26T10:15:00Z",
      "state": "acknowledged",
      "relatedParty": [
        {
          "id": "cust-001",
          "href": "https://api.example.com/partyManagement/v4/organization/cust-001",
          "name": "Acme Corp",
          "role": "customer",
          "@referredType": "Organization",
          "@type": "RelatedParty"
        }
      ],
      "serviceOrderItem": [
        {
          "id": "item-001",
          "action": "add",
          "service": {
            "id": "svc-1001",
            "name": "IoT Sensor Connectivity",
            "category": "CFS",
            "serviceType": "IoT",
            "isServiceEnabled": true,
            "state": "feasibilityChecked",
            "serviceCharacteristic": [
              {
                "name": "SamplingFrequency",
                "value": "10s",
                "valueType": "string"
              },
              {
                "name": "MeasurementUnit",
                "value": "Celsius",
                "valueType": "string"
              }
            ],
            "serviceSpecification": {
              "id": "spec-1001",
              "href": "https://api.example.com/serviceCatalog/v4/serviceSpecification/spec-1001",
              "name": "Sensor Service Specification",
              "version": "1.0",
              "@referredType": "ServiceSpecification"
            }
          },
          "state": "acknowledged",
          "appointment": {
            "id": "appt-001",
            "href": "https://api.example.com/appointment/v4/appointment/appt-001"
          },
          "note": [
            {
              "id": "note-001",
              "author": "jane.doe@example.com",
              "date": "2025-03-26T10:16:00Z",
              "text": "Customer requested expedited provisioning.",
              "@type": "Note"
            }
          ],
          "@type": "ServiceOrderItem"
        }
      ],
      "note": [
        {
          "id": "note-002",
          "author": "support-agent@example.com",
          "date": "2025-03-26T11:00:00Z",
          "text": "Assigned to provisioning team.",
          "@type": "Note"
        }
      ],
      "@type": "ServiceOrder",
      "@baseType": "Entity",
      "@schemaLocation": "https://open-api.tmforum.org/TMF641_ServiceOrderingManagement/schema/ServiceOrder.schema.json"
    }
  `;
  const result = streamText({
    model: ollama("llama3.2", { simulateStreaming: true }),
    system: system,
    prompt: `
    START CONTEXT BLOCK
    
    ${context}

    END CONTEXT BLOCK

    AI assistant will take into account the services and service order example that is provided in the CONTEXT BLOCK.
    If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question."
    AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
    AI assistant will not invent anything that is not drawn directly from the context.
    Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering the question.

    The question is the following:
    ${messages[messages.length - 1].content}
    `,
  });

  return result.toDataStreamResponse();
}

// https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-tool-usage
// https://sdk.vercel.ai/docs/foundations/prompts#system-messages
