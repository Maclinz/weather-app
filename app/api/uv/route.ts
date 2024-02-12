import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  try {
    const lat = 40.7128;
    const lon = -74.006;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error Getting Uv Data");

    return new Response("Error getting Uv Data", { status: 500 });
  }
}
