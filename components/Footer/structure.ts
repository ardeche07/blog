import { SectionData, Link } from "components/Launchpad";
import data from "./footer.yaml";

let copyrightLinks: Link[] = [];
let launchpadData: SectionData[] = [];

if (isCopyright(data?.copyright)) {
  copyrightLinks = data.copyright;
}

if (isLaunchpad(data?.launchpad)) {
  launchpadData = data.launchpad;
}

function isCopyright(maybyLinks: unknown): maybyLinks is Link[] {
  if (!Array.isArray(maybyLinks)) {
    throw new Error("footer:copyright is not a list");
  }

  // we should add an accurate validation here if applicable

  return true;
}

function isLaunchpad(maybeLaunchpad: unknown): maybeLaunchpad is SectionData[] {
  if (!Array.isArray(maybeLaunchpad)) {
    throw new Error("footer:launchpad is not a list");
  }

  // we should add an accurate validation here if applicable

  return true;
}

export { copyrightLinks, launchpadData };
