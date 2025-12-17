import "dotenv/config";

import { runAutomation } from "../src/lib/automation";

async function main() {
  try {
    const result = await runAutomation();
    console.log("Automation finished", result);
  } catch (error) {
    console.error("Automation failed", error);
    process.exitCode = 1;
  }
}

void main();
