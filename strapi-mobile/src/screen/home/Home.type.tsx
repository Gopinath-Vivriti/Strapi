export interface Home {
  data: HomeData;
}

export interface HomeData {
  id: number;
  attributes: HomeAttributes;
}

export interface HomeAttributes {
  bannerText: BannerText;
  bannerImage: Media;
  introVideo: Media;
  blogs: Blogs;
  tutorial_videos: TutorialVideos;
}

export interface Media {
  data: MediaData;
}

export interface MediaData {
  id: number;
  attributes: MediaAttributes;
}

export interface MediaAttributes {
  name: string;
  width: number;
  height: number;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
}

export interface BannerText {
  title: string;
  description: string;
}

export interface Blogs {
  data: BlogsData[];
}

export interface BlogsData {
  id: number;
  attributes: BlogsAttributes;
}

export interface BlogsAttributes {
  title: string;
  description: string;
  blogURL: string;
  image: Media;
}

export interface TutorialVideos {
  data: TutorialVideosDatum[];
}

export interface TutorialVideosDatum {
  id: number;
  attributes: TutorialVideoAttributes;
}

export interface TutorialVideoAttributes {
  title: string;
  videoUrl: string;
  thumbnailURL: string;
}
