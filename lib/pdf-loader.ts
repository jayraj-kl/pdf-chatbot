import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { env } from "./config";
import { console } from "inspector";

export async function getChunkedDocsFromPDF() {
  try {
    console.log("Loading PDF file...");
    const loader = new PDFLoader(env.PDF_PATH);
    const docs = await loader.load();
    console.log("PDF file loaded successfully from: ", env.PDF_PATH);

    console.log("Splitting PDF docs into chunks...");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    console.log("PDF docs split into chunks successfully: ", textSplitter);

    console.log("Chunking PDF docs...");
    const chunkedDocs = await textSplitter.splitDocuments(docs);
    console.log("PDF docs chunked successfully: ", chunkedDocs);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}
