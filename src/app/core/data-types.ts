
// GALLERY TPYES //
export interface badge {
    name: string,
    color: string
  }
export interface galleryFeature {
    id?: string,
    title: string,
    image_url: string,
    type: 'app' | 'modal' | 'website',
    content_url: string,
    categories: badge[],
    tags: badge[],
    description: string
}
// GALLERY TPYES //




// items //
export interface mapActivitiesPagesType {
  id: string,
  route: string,
  title: string,
  verbose_title: string,
  colorType: string,
  icon: any,
  sub_menus: galleryFeature[]
}