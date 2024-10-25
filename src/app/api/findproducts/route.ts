import { NextResponse } from "next/server";
import Exa from "exa-js";

export async function POST(request: Request) {
  try {
    const { url, includeText, excludeText } = await request.json();

    const exa = new Exa("2460b671-5495-4cc4-abf7-2ab09c3a93b2");

    // Convert includeText and excludeText to arrays
    const includeTextArray = includeText
      ? includeText.split(",").map((item: string) => item.trim())
      : [];
    const excludeTextArray = excludeText
      ? excludeText.split(",").map((item: string) => item.trim())
      : [];

    const result = await exa.findSimilarAndContents(url, {
      numResults: 10,
      includeText: includeTextArray,
      excludeText: excludeTextArray,
      highlights: {
        numSentences: 3,
        highlightsPerUrl: 1,
      },
      summary: true,
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error in findproducts API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
