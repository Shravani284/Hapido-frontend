export interface CategoryFormType {
  isSubCategory: boolean;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  meta_title_en?: string;
  meta_title_ar?: string;
  meta_description_en?: string;
  meta_description_ar?: string;
  meta_keywords_en?: string;
  meta_keywords_ar?: string;
  meta_deal_title_en?: string;
  meta_deal_title_ar?: string;
  meta_deal_description_en?: string;
  meta_deal_description_ar?: string;
  meta_deal_keywords_en?: string;
  meta_deal_keywords_ar?: string;
  parent_category?: { id: string } | null;
  show_in_menu?: boolean;
  show_in_featured?: boolean;
  feature_widget_priority: string;
  show_in_home_widgets?: boolean;
  sort?: number;
  home_widget_type: null | Dropdown;
  home_placement_id: null | Dropdown;
  active?: boolean;
  image_ids?: string;
  video_ids?: string;
  image_ids_ar?: string;
  video_ids_ar?: string;
}

export interface Role {
  module_id: number;
  access: string;
}

export interface Dropdown {
  id: string;
  label: string;
}

export interface TranslationType {
  locale: string;
  table_name: string;
  column_name: string;
  text: string;
}

export interface CategoryType {
  id: number;
  name_trans_ids: string;
  sub_category: boolean;
  description_trans_ids: string;
  tree_level: number;
  parent_category_id: number | null;
  image_ids: string | null;
  video_ids: string | null;
  image_ids_ar: string | null;
  video_ids_ar: string | null;
  is_menu: boolean;
  is_featured: boolean;
  feature_widget_priority: string;
  is_home_widget: boolean;
  slug: string;
  sort: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  active: boolean;
  translations: TranslationType[];
  parent_category_name: string | null;
  metaData: {
    meta_for: string;
    translations: TranslationType[];
  };
  dealMetaData: {
    meta_for: string;
    translations: TranslationType[];
  };
  home_widget_type: null | Dropdown;
  home_placement_id: string | Dropdown;
  name?: string;
  description?: string;
  images: {
    extfilepath: string;
    extfilepathId: number;
    imageId: number;
  }[];
  videos: {
    extfilepath: string;
    extfilepathId: number;
    videoId: number;
  }[];
  images_ar: {
    extfilepath: string;
    extfilepathId: number;
    imageId: number;
  }[];
  videos_ar: {
    extfilepath: string;
    extfilepathId: number;
    videoId: number;
  }[];
}
