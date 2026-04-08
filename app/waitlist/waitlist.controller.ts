import { NextRequest, NextResponse } from "next/server";
import { createWaitlistEntry, checkDuplicate } from "./waitlist.service";
import { BuildingStatus, Framework } from "../generated/prisma/enums";
export async function postWaitlistEntry(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, building, frameworks } = body;

    if (!name || !email || !building) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const existing = await checkDuplicate(email);
    if (existing) {
      const field = existing.email === email ? "email" : "name";
      return NextResponse.json(
        { error: `That ${field} is already on the waitlist.` },
        { status: 409 }
      );
    }

    const buildingStatusMap: Record<string, BuildingStatus> = {
      "Yes, actively in production": BuildingStatus.IN_PRODUCTION,
      "Yes, in development / experimenting": BuildingStatus.IN_DEVELOPMENT,
      "Evaluating for future use": BuildingStatus.EVALUATING,
      "Just exploring for now": BuildingStatus.EXPLORING,
    };
    const frameworkMap: Record<string, Framework> = {
      "LangChain": Framework.LANGCHAIN,
      "CrewAI": Framework.CREWAI,
      "AutoGen": Framework.AUTOGEN,
      "LlamaIndex": Framework.LLAMAINDEX,
      "Agno": Framework.AGNO,
      "Haystack": Framework.HAYSTACK,
      "Custom / Other": Framework.CUSTOM_OTHER,
    };
    const mappedFrameworks = frameworks.map((f: string) => frameworkMap[f]).filter(Boolean);


    const buildingStatus = buildingStatusMap[building];
    if (!buildingStatus) {
      return NextResponse.json(
        { error: "Invalid building status." },
        { status: 400 }
      );
    }

    const entry = await createWaitlistEntry({ name, email, building: buildingStatus, frameworks: mappedFrameworks });
    return NextResponse.json({ success: true, id: entry.id }, { status: 201 });

  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}