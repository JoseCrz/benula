import createImageBuilder from "@sanity/image-url";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "../data";

const imageBuilder = createImageBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
});

export function urlForImage(source: any) {
  return imageBuilder.image(source).auto("format").dpr(3);
}
