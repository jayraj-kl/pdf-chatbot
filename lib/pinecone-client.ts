import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./config";
import { delay } from "./utils";

let pineconeClientInstance: Pinecone | null = null;

async function createIndex(client: Pinecone, indexName: string) {
    const pc = new Pinecone();
    try {
        await pc.createIndex({
            name: indexName,
            dimension: 1536,
            spec: {
                serverless: {
                    cloud: 'aws',
                    region: 'us-east-1',
                }
            },
            suppressConflicts: true,
            tags: { 'team': 'data-science' }
        });
        console.log(`Waiting for ${env.INDEX_INIT_TIMEOUT} seconds for the index to be created...`);
        await delay(env.INDEX_INIT_TIMEOUT);
        console.log(`Index ${indexName} created successfully!`);
    } catch (error) {
        console.error(`Failed to create index ${indexName}: ${error}`);
        throw new Error(`Failed to create index ${indexName}: ${error}`);
    }
}

// Initialize index and ready to be accessed.
async function initPineconeClient() {
    try {
      const pineconeClient = new Pinecone({
        apiKey: env.PINECONE_API_KEY,
        // environment: env.PINECONE_ENVIRONMENT,
      });
      const indexName = env.PINECONE_INDEX_NAME;
      const existingIndexes = await pineconeClient.listIndexes();
  
      if (!existingIndexes.indexes?.map(index => index.name).includes(indexName)) {
        createIndex(pineconeClient, indexName);
      } else {
        console.log("Your index already exists. nice !!");
      }
  
      return pineconeClient;
    } catch (error) {
      console.error("error", error);
      throw new Error("Failed to initialize Pinecone Client");
    }
}

export async function getPineconeClient() {
    if (!pineconeClientInstance) {
      pineconeClientInstance = await initPineconeClient();
    }
  
    return pineconeClientInstance;
  }