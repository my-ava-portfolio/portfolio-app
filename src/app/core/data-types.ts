export type activities = 'job'|'personal-project'|'volunteer';

// GALLERY TYPES //
export interface badge {
    name: string,
    color: string
}
interface badgeClass {
  name: string,
  class: string
}
interface badgeIcon {
  name: string,
  icon: {
    title: string,
    icon: any
  }
}
export interface galleryFeature {
  id?: string,
  title: string,
  image_url: string,
  type: 'app' | 'modal' | 'website' | 'video',
  content_url: string,
  categories: badge[], // map home & blog page (color compute dynamically)
  tags: badge[], // map home & blog page (color compute dynamically)
  activityType?: badgeClass,
  experienceName?: badge,
  mediaType?: badgeIcon,
  description: string,
  addons?: any
}
// GALLERY TYPES //

export interface mapFeature {
  id: string,
  title: string,
  image_url: string,
  type: 'app' | 'modal' | 'website' | 'video',
  stack: stackFeature[],  // img url
  status?: 'Done' | 'Dev',
  content_url: string,
  categories: badge[], // map home & blog page (color compute dynamically)
  tags: badge[], // map home & blog page (color compute dynamically)
  description: string,
}


interface stackFeature {
  type: 'Pre-Proc' | 'Back-end' | 'Front-end',
  language: string,
  img: string,
}

export interface activityFeature {
  id: string,
  title: string,
  fragment: string,
  icon: any,
}



// items //
// TODO split interfaces
export interface activitiesPagesType {
  id: string,
  route: string,
  title: string,
  verbose_title?: string,
  colorType?: string,
  icon: any,
  sub_menus: galleryFeature[] | activityFeature[]
}

export interface mapPagesType {
  id: string,
  route: string,
  title: string,
  verbose_title?: string,
  colorType?: string,
  icon: any,
  sub_menus: mapFeature[]
}