import { postWaitlistEntry } from "@/app/waitlist/waitlist.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return postWaitlistEntry(req);
}