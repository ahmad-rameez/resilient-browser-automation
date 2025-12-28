/******************** CONFIG ********************/
const MAX_SIMILAR_ROLES = 5;   // cancel if more than this
const DEFAULT_DELAY = 1200;
/***********************************************/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Handles "Apply to other similar jobs" modal
 * - Cancels if roles > MAX_SIMILAR_ROLES
 * - Applies otherwise
 */
async function handleSimilarJobsModal() {
  // Find modal by title text
  const modal = Array.from(document.querySelectorAll("div"))
    .find(el =>
      el.innerText &&
      el.innerText.includes("Want to apply to other similar jobs")
    );

  if (!modal) return false;

  console.log("🟡 Similar jobs modal detected");

  // Count selectable roles (checkbox rows)
  const roleCheckboxes = modal.querySelectorAll('input[type="checkbox"]');
  const roleCount = roleCheckboxes.length;

  console.log(`📊 Similar roles found: ${roleCount}`);

  if (roleCount > MAX_SIMILAR_ROLES) {
    console.log("🚫 Too many roles — cancelling");

    const cancelBtn = Array.from(modal.querySelectorAll("button"))
      .find(btn => btn.innerText.trim().toLowerCase() === "cancel");

    if (cancelBtn) {
      cancelBtn.click();
      await sleep(800);
      return true;
    }
  } else {
    console.log("✅ Role count acceptable — applying");

    const applyBtn = Array.from(modal.querySelectorAll("button"))
      .find(btn => btn.innerText.trim().toLowerCase() === "apply");

    if (applyBtn) {
      applyBtn.click();
      await sleep(1200);
      return true;
    }
  }

  return false;
}

/**
 * Auto apply main function
 */
async function autoApply(maxClicks = 10) {
  console.log("🚀 Starting Instahyre Auto-Apply");
  const start = Date.now();
  let applied = 0;

  while (applied < maxClicks) {
    const applyButton = document.querySelector(
      "#candidate-suggested-employers div.apply.ng-scope > button"
    );

    if (!applyButton) {
      console.log("❌ No Apply button found. Retrying...");
      await sleep(1000);
      continue;
    }

    if (!applyButton.disabled) {
      applyButton.click();
      console.log("🖱️ Clicked primary Apply");
      await sleep(DEFAULT_DELAY);

      // Handle similar jobs modal if present
      await handleSimilarJobsModal();

      applied++;
      console.log(`✅ Applied ${applied}/${maxClicks}`);
      await sleep(1800);
    } else {
      console.log("⏳ Apply button disabled, waiting...");
      await sleep(1200);
    }

    // Handle error popup
    const errorPopup = document.querySelector("#messages > div > div > div > div");
    if (errorPopup) {
      console.log("⚠️ Error popup detected");

      const closeBtn = document.querySelector(
        "#messages button"
      );

      if (closeBtn) {
        closeBtn.click();
        console.log("✅ Closed error popup");
        await sleep(1000);
      }
    }
  }

  const end = Date.now();
  console.log("🏁 Auto-Apply Finished");
  console.log(`📌 Total applied: ${applied}`);
  console.log(`⏱️ Time taken: ${(end - start) / 1000}s`);
}
