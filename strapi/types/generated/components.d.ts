import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleSectionsArticleHero extends Struct.ComponentSchema {
  collectionName: 'components_article_sections_article_heroes';
  info: {
    description: '';
    displayName: 'Article Hero';
  };
  attributes: {
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    SubText: Schema.Attribute.String;
    Title: Schema.Attribute.String;
    TypewriterTexts: Schema.Attribute.Component<
      'shared.typewriter-texts',
      true
    >;
  };
}

export interface ArticleSectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_article_sections_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    SubText: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
    TypewriterTexts: Schema.Attribute.Component<
      'shared.typewriter-texts',
      true
    >;
  };
}

export interface ArticleSectionsTags extends Struct.ComponentSchema {
  collectionName: 'components_article_sections_tags';
  info: {
    displayName: 'Tags';
  };
  attributes: {
    TagName: Schema.Attribute.String;
  };
}

export interface BlocksAbout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_abouts';
  info: {
    description: '';
    displayName: 'About';
  };
  attributes: {
    AboutImages: Schema.Attribute.Component<'shared.about-images', true>;
    AboutKeyPoints: Schema.Attribute.Component<'shared.about-key-points', true>;
    AboutText: Schema.Attribute.Text;
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksAccordion extends Struct.ComponentSchema {
  collectionName: 'components_blocks_accordions';
  info: {
    displayName: 'Accordion';
  };
  attributes: {
    AccordionItem: Schema.Attribute.Component<'shared.title-and-text', true>;
  };
}

export interface BlocksBatches extends Struct.ComponentSchema {
  collectionName: 'components_blocks_batches';
  info: {
    displayName: 'Batches';
  };
  attributes: {
    Batches: Schema.Attribute.Component<'shared.text-with-button', true>;
  };
}

export interface BlocksContactForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_forms';
  info: {
    description: '';
    displayName: 'Contact Form';
  };
  attributes: {
    Address: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Karl Johansgatan 152'>;
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    City: Schema.Attribute.String & Schema.Attribute.DefaultTo<'G\u00F6teborg'>;
    CompanyName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Contrain'>;
    Email: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'info@contrain.se'>;
    EmailLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<' E-post'>;
    FacebookUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://www.facebook.com/contrainrobot'>;
    FormTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Skicka oss ett Meddelande'>;
    InstagramUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://www.instagram.com/contrain_robot/'>;
    LinkedInUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://www.linkedin.com/company/contrain-ab/'>;
    MessageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<' Meddelande'>;
    NameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Namn'>;
    Phone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'+46 (0) 705 61 46 56'>;
    SectionSubText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Ta steget och f\u00F6rverkliga din dr\u00F6mvision'>;
    SectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'L\u00E5t oss B\u00F6rja din resa'>;
    SocialMediaSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Kontakta oss'>;
    SocialMediaSubText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'F\u00F6lj oss p\u00E5 social medier'>;
  };
}

export interface BlocksExpandingCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_expanding_cards';
  info: {
    description: '';
    displayName: 'Expanding Cards';
  };
  attributes: {
    Content: Schema.Attribute.Component<'shared.slider-content', true>;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    BorderButtonLabel: Schema.Attribute.String;
    BorderButtonUrl: Schema.Attribute.String;
    ButtonWithBackgroundLabel: Schema.Attribute.String;
    ButtonWithBackgroundUrl: Schema.Attribute.String;
    ShowButton: Schema.Attribute.Boolean;
    SubText: Schema.Attribute.String;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    TypewriterTexts: Schema.Attribute.Component<
      'shared.typewriter-texts',
      true
    >;
  };
}

export interface BlocksImageAndText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_and_texts';
  info: {
    displayName: 'ImageAndText';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    TextContent: Schema.Attribute.Blocks;
  };
}

export interface BlocksImages extends Struct.ComponentSchema {
  collectionName: 'components_blocks_images';
  info: {
    description: '';
    displayName: 'Images';
  };
  attributes: {
    Alt: Schema.Attribute.String;
    HoverDescription: Schema.Attribute.String;
    HoverTitle: Schema.Attribute.String;
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Url: Schema.Attribute.String;
  };
}

export interface BlocksMaterial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_materials';
  info: {
    description: '';
    displayName: 'Material';
  };
  attributes: {
    MaterialDescription: Schema.Attribute.Component<'shared.material', true>;
  };
}

export interface BlocksMaterialList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_material_lists';
  info: {
    description: '';
    displayName: 'Material List';
  };
  attributes: {
    MaterialDetailsLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Detaljer'>;
    MaterialEnduranceLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<' T\u00E5lighet (\u00B0C)'>;
    MaterialFlexibilityLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Flexibilitet'>;
    MaterialList: Schema.Attribute.Component<'shared.material-property', true>;
    MaterialNameLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Material'>;
    MaterialSustainabilityLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'H\u00E5llbarhet'>;
    MaterialUsageLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Anv\u00E4ndning'>;
  };
}

export interface BlocksOffertComponent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_offert_components';
  info: {
    description: '';
    displayName: 'Offert Component';
  };
  attributes: {
    ContactInfo: Schema.Attribute.Component<'shared.contact-info', false>;
    OffertForm: Schema.Attribute.Component<'blocks.printing-form', false>;
    PageSubTitle: Schema.Attribute.Text;
    PageTitle: Schema.Attribute.String;
  };
}

export interface BlocksOurServices extends Struct.ComponentSchema {
  collectionName: 'components_blocks_our_services';
  info: {
    description: '';
    displayName: 'Our Services';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    Service: Schema.Attribute.Component<'blocks.service', true>;
    SubText: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksPrintingForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_printing_forms';
  info: {
    description: '';
    displayName: 'Printing Form';
  };
  attributes: {
    ButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Skicka offertf\u00F6rfr\u00E5gan'>;
    ColorLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'F\u00E4rg'>;
    ColorOptions: Schema.Attribute.Component<'shared.form-options', true>;
    CompanyInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'F\u00F6retagsnamn'>;
    CompanyPlaceholder: Schema.Attribute.String;
    ContactPersonInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Kontaktperson'>;
    ContactPersonPlaceholder: Schema.Attribute.String;
    DeliveryDateLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00D6nskat leveransdatum'>;
    DeliveryTimeLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Leveranstid'>;
    DeliveryTimeOptions: Schema.Attribute.Component<
      'shared.form-options',
      true
    >;
    EmailInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'E-post'>;
    EmailPlaceholder: Schema.Attribute.String;
    ExtraServicesLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Extra tj\u00E4nster'>;
    ExtraServicesOptions: Schema.Attribute.Component<
      'shared.form-options',
      true
    >;
    FileInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'3d modell (.stl, .3mf, .gcode)'>;
    MaterialOptions: Schema.Attribute.Component<'shared.form-options', true>;
    MaterialRadioLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Materialval'>;
    MessageInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00D6vrigt meddelande'>;
    PhoneInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Telefonnummer'>;
    PhonePlaceholder: Schema.Attribute.String;
    ProjectDescriptionInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Projektbeskrivning'>;
    ProjectDescriptionPlaceholder: Schema.Attribute.String;
    QuantityInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Antal exemplar'>;
    SectionTitle: Schema.Attribute.String;
  };
}

export interface BlocksProjectDetails extends Struct.ComponentSchema {
  collectionName: 'components_blocks_project_details';
  info: {
    description: '';
    displayName: 'Project Details';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    ClientInput: Schema.Attribute.String;
    ClientLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Klient'>;
    ProjectlengthInput: Schema.Attribute.String;
    ProjectlengthLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Projektl\u00E4ngd'>;
    ProjectManagerInput: Schema.Attribute.String;
    ProjectManagerLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Projektansvarig'>;
    ProjectNameInput: Schema.Attribute.String;
    ProjectNameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Projektnamn'>;
    ProjectText: Schema.Attribute.Blocks;
    ProjectTextTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Om Projektet'>;
    ProjecttypeInput: Schema.Attribute.String;
    ProjecttypeLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Projekttyp'>;
  };
}

export interface BlocksQuote extends Struct.ComponentSchema {
  collectionName: 'components_blocks_quotes';
  info: {
    description: '';
    displayName: 'Quote';
  };
  attributes: {
    Author: Schema.Attribute.String & Schema.Attribute.Required;
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    Text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_texts';
  info: {
    description: '';
    displayName: 'Rich Text';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    RichText: Schema.Attribute.Blocks;
  };
}

export interface BlocksService extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services';
  info: {
    displayName: 'Service';
  };
  attributes: {
    Icon: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface BlocksServiceTitleAndText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_service_title_and_texts';
  info: {
    description: '';
    displayName: 'Service - Title and Text';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Service: Schema.Attribute.Component<'shared.skills', true>;
  };
}

export interface BlocksServicesForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services_forms';
  info: {
    description: '';
    displayName: 'Services Form';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    ButtonLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Skicka'>;
    ButtonUrl: Schema.Attribute.String;
    EmailInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<' E-post'>;
    FormTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Skaffa denna fantastiska tj\u00E4nst'>;
    MessageInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<' Meddelande'>;
    NameInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Namn'>;
    SectionTitle: Schema.Attribute.String;
    SubjectInputLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00C4mne'>;
    SubText: Schema.Attribute.Text;
  };
}

export interface BlocksServicesHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services_heroes';
  info: {
    description: '';
    displayName: 'Services Hero';
  };
  attributes: {
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
    TypewriterTexts: Schema.Attribute.Component<
      'shared.typewriter-texts',
      true
    >;
    Url: Schema.Attribute.String;
  };
}

export interface BlocksServicesLarge extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services_larges';
  info: {
    description: '';
    displayName: 'Services Large';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    Services: Schema.Attribute.Component<'blocks.services-hero', true>;
  };
}

export interface BlocksSeveralImages extends Struct.ComponentSchema {
  collectionName: 'components_blocks_several_images';
  info: {
    description: '';
    displayName: 'Several Images';
  };
  attributes: {
    Image: Schema.Attribute.Component<'shared.image-without-url', true>;
  };
}

export interface BlocksSkills extends Struct.ComponentSchema {
  collectionName: 'components_blocks_skills';
  info: {
    description: '';
    displayName: 'Skills';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    SkillImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Skills: Schema.Attribute.Component<'shared.skills', true>;
    SubText: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sliders';
  info: {
    description: '';
    displayName: 'Slider';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    Images: Schema.Attribute.Component<'blocks.images', true>;
    SectionTitle: Schema.Attribute.String;
  };
}

export interface BlocksSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_blocks_social_medias';
  info: {
    description: '';
    displayName: 'Social Media';
  };
  attributes: {
    FacebookIcon: Schema.Attribute.String;
    FacebookUrl: Schema.Attribute.String;
    InstagramIcon: Schema.Attribute.String;
    InstagramUrl: Schema.Attribute.String;
    LinkedInIcon: Schema.Attribute.String;
    LinkedInUrl: Schema.Attribute.String;
    SubText: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksStackedSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stacked_sliders';
  info: {
    description: '';
    displayName: 'Stacked Slider';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['Default', 'Dark navy', 'Darker navy', 'Steel', 'Violet']
    >;
    Images: Schema.Attribute.Component<'shared.images', true>;
    SectionTitle: Schema.Attribute.String;
  };
}

export interface BlocksTest extends Struct.ComponentSchema {
  collectionName: 'components_blocks_tests';
  info: {
    displayName: 'test';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface BlocksTextWithBackgroundImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_with_background_images';
  info: {
    description: '';
    displayName: 'TextWithBackgroundImage';
  };
  attributes: {
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    ButtonLabel: Schema.Attribute.String;
    ButtonUrl: Schema.Attribute.String;
    SectionTitle: Schema.Attribute.String;
    SubText: Schema.Attribute.Text;
  };
}

export interface BlocksTitleSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_title_sections';
  info: {
    description: '';
    displayName: 'Title Section';
  };
  attributes: {
    SubTitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_metas';
  info: {
    displayName: 'Meta';
  };
  attributes: {
    Content: Schema.Attribute.String;
    Name: Schema.Attribute.String;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    MetaComponent: Schema.Attribute.Component<'seo.meta', true>;
    MetaDescription: Schema.Attribute.Text;
    MetaImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    MetaTitle: Schema.Attribute.String;
    PreventIndexing: Schema.Attribute.Boolean;
    StructureData: Schema.Attribute.JSON;
  };
}

export interface SharedAboutImages extends Struct.ComponentSchema {
  collectionName: 'components_shared_about_images';
  info: {
    displayName: 'AboutImages';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    ImageAltText: Schema.Attribute.String;
  };
}

export interface SharedAboutKeyPoints extends Struct.ComponentSchema {
  collectionName: 'components_shared_about_key_points';
  info: {
    displayName: 'AboutKeyPoints';
  };
  attributes: {
    Icon: Schema.Attribute.String;
    Text: Schema.Attribute.String;
  };
}

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_infos';
  info: {
    description: '';
    displayName: 'ContactInfo';
  };
  attributes: {
    Address: Schema.Attribute.String;
    City: Schema.Attribute.String;
    Country: Schema.Attribute.String;
    Email: Schema.Attribute.String;
    Phone: Schema.Attribute.String;
    SocialMedia: Schema.Attribute.Component<'shared.social-media', true>;
    SocialMediaSectionTitle: Schema.Attribute.String;
    SubText: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedFormOptions extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_options';
  info: {
    displayName: 'FormOptions';
  };
  attributes: {
    Option: Schema.Attribute.String;
  };
}

export interface SharedImageWithoutUrl extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_without_urls';
  info: {
    description: '';
    displayName: 'ImageWithoutUrl';
  };
  attributes: {
    Alt: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedImages extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'Images';
  };
  attributes: {
    Alt: Schema.Attribute.String;
    HoverDescription: Schema.Attribute.String;
    HoverTitle: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Url: Schema.Attribute.String;
  };
}

export interface SharedMaterial extends Struct.ComponentSchema {
  collectionName: 'components_shared_materials';
  info: {
    displayName: 'Material';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    MaterialFullName: Schema.Attribute.String;
    MaterialImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    MaterialShortName: Schema.Attribute.String;
  };
}

export interface SharedMaterialProperty extends Struct.ComponentSchema {
  collectionName: 'components_shared_material_properties';
  info: {
    description: '';
    displayName: 'MaterialProperty';
  };
  attributes: {
    Details: Schema.Attribute.String;
    Endurance: Schema.Attribute.String;
    Flexibility: Schema.Attribute.String;
    Name: Schema.Attribute.String;
    Sustainability: Schema.Attribute.String;
    Usage: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    MetaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    MetaImage: Schema.Attribute.Media<'images'>;
    MetaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSkills extends Struct.ComponentSchema {
  collectionName: 'components_shared_skills';
  info: {
    description: '';
    displayName: 'Skills';
  };
  attributes: {
    Icon: Schema.Attribute.String;
    SkillText: Schema.Attribute.Text;
    SkillTitle: Schema.Attribute.String;
  };
}

export interface SharedSliderContent extends Struct.ComponentSchema {
  collectionName: 'components_shared_slider_contents';
  info: {
    description: '';
    displayName: 'Slider Content';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    Text: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String;
  };
}

export interface SharedSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_medias';
  info: {
    description: '';
    displayName: 'SocialMedia';
  };
  attributes: {
    Icon: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface SharedTextWithButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_with_buttons';
  info: {
    description: '';
    displayName: 'Text with Button';
  };
  attributes: {
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    ButtonLabel: Schema.Attribute.String;
    ButtonUrl: Schema.Attribute.String;
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SharedTitleAndText extends Struct.ComponentSchema {
  collectionName: 'components_shared_title_and_texts';
  info: {
    displayName: 'Title and Text';
  };
  attributes: {
    Text: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SharedTypewriterTexts extends Struct.ComponentSchema {
  collectionName: 'components_shared_typewriter_texts';
  info: {
    description: '';
    displayName: 'TypewriterTexts';
  };
  attributes: {
    Text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article-sections.article-hero': ArticleSectionsArticleHero;
      'article-sections.hero': ArticleSectionsHero;
      'article-sections.tags': ArticleSectionsTags;
      'blocks.about': BlocksAbout;
      'blocks.accordion': BlocksAccordion;
      'blocks.batches': BlocksBatches;
      'blocks.contact-form': BlocksContactForm;
      'blocks.expanding-cards': BlocksExpandingCards;
      'blocks.hero': BlocksHero;
      'blocks.image-and-text': BlocksImageAndText;
      'blocks.images': BlocksImages;
      'blocks.material': BlocksMaterial;
      'blocks.material-list': BlocksMaterialList;
      'blocks.offert-component': BlocksOffertComponent;
      'blocks.our-services': BlocksOurServices;
      'blocks.printing-form': BlocksPrintingForm;
      'blocks.project-details': BlocksProjectDetails;
      'blocks.quote': BlocksQuote;
      'blocks.rich-text': BlocksRichText;
      'blocks.service': BlocksService;
      'blocks.service-title-and-text': BlocksServiceTitleAndText;
      'blocks.services-form': BlocksServicesForm;
      'blocks.services-hero': BlocksServicesHero;
      'blocks.services-large': BlocksServicesLarge;
      'blocks.several-images': BlocksSeveralImages;
      'blocks.skills': BlocksSkills;
      'blocks.slider': BlocksSlider;
      'blocks.social-media': BlocksSocialMedia;
      'blocks.stacked-slider': BlocksStackedSlider;
      'blocks.test': BlocksTest;
      'blocks.text-with-background-image': BlocksTextWithBackgroundImage;
      'blocks.title-section': BlocksTitleSection;
      'seo.meta': SeoMeta;
      'seo.seo': SeoSeo;
      'shared.about-images': SharedAboutImages;
      'shared.about-key-points': SharedAboutKeyPoints;
      'shared.contact-info': SharedContactInfo;
      'shared.form-options': SharedFormOptions;
      'shared.image-without-url': SharedImageWithoutUrl;
      'shared.images': SharedImages;
      'shared.material': SharedMaterial;
      'shared.material-property': SharedMaterialProperty;
      'shared.seo': SharedSeo;
      'shared.skills': SharedSkills;
      'shared.slider-content': SharedSliderContent;
      'shared.social-media': SharedSocialMedia;
      'shared.text-with-button': SharedTextWithButton;
      'shared.title-and-text': SharedTitleAndText;
      'shared.typewriter-texts': SharedTypewriterTexts;
    }
  }
}
