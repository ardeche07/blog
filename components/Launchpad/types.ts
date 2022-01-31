export interface Link {
  title: string;
  url: string;
}

export interface SectionData {
  title: string;
  items: Array<Link | SectionData>;
}
