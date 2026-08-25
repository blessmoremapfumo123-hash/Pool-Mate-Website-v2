import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] || "http://127.0.0.1:8080";
const dir = "/workspace/screenshots";
await mkdir(dir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE", m.text());
});

async function shot(name) {
  await page.screenshot({ path: `${dir}/${name}.png`, fullPage: false });
  console.log("shot", name, page.url());
}

await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(400);
await shot("home-services");

await page.evaluate(() => window.scrollTo(0, 2200));
await page.waitForTimeout(400);
await shot("home-how");

await page.evaluate(() => window.scrollTo(0, 5000));
await page.waitForTimeout(400);
await shot("home-download");

await page.goto(`${base}/login`, { waitUntil: "networkidle" });
await shot("login");

await page.getByRole("button", { name: "Create an account" }).click();
const email = `rider.${Date.now()}@poolmate.test`;
await page.getByPlaceholder("Chanda Mwale").fill("Chanda Mwale");
await page.getByPlaceholder("you@email.com").fill(email);
await page.getByPlaceholder("At least 8 characters").fill("corridor1");
await page.getByRole("button", { name: "Create account" }).click();
await page.waitForURL(/select-role|dashboard|login/, { timeout: 20000 });
await page.waitForTimeout(800);
await shot("after-signup");

if (page.url().includes("select-role")) {
  await page.getByRole("button", { name: /Ride with PoolMate/i }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForURL(/dashboard/, { timeout: 15000 });
  await page.waitForTimeout(800);
  await shot("dashboard");
}

if (page.url().includes("dashboard")) {
  const pickup = page.getByPlaceholder("Cairo Road, CBD");
  if (await pickup.count()) {
    await pickup.click();
    await pickup.fill("Cairo");
    await page.waitForTimeout(300);
    const hint = page.getByRole("button", { name: "Cairo Road, CBD" });
    if (await hint.count()) await hint.first().click();
    else await pickup.fill("Cairo Road, CBD");
  }
  const dest = page.getByPlaceholder("Kenneth Kaunda Airport");
  if (await dest.count()) {
    await dest.click();
    await dest.fill("Airport");
    await page.waitForTimeout(300);
    const hint = page.getByRole("button", { name: "Kenneth Kaunda Airport" });
    if (await hint.count()) await hint.first().click();
    else await dest.fill("Kenneth Kaunda Airport");
  }
  await page.getByRole("button", { name: "Request PoolMate" }).click();
  await page.waitForTimeout(2500);
  await shot("trip-live");
  await page.waitForTimeout(4000);
  await shot("trip-enroute");
}

await page.goto(`${base}/drive`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await shot("drive");

await browser.close();
console.log("done", email);
