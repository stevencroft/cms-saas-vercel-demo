/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: _Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      _metadata {\n        types\n      }\n    }\n  }\n}": types.getContentTypeDocument,
    "fragment ReferenceData on ContentReference {\n  key\n  url {\n    ...LinkData\n  }\n}": types.ReferenceDataFragmentDoc,
    "fragment LinkItemData on Link {\n  title\n  text\n  target\n  url {\n    ...LinkData\n  }\n}": types.LinkItemDataFragmentDoc,
    "fragment ElementData on _IElement {\n  ...IElementData\n}": types.ElementDataFragmentDoc,
    "fragment ExperienceData on _IExperience {\n  composition {\n    ...CompositionData\n  }\n}": types.ExperienceDataFragmentDoc,
    "fragment IElementData on _IElement {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}": types.IElementDataFragmentDoc,
    "fragment IContentListItem on _IContent {\n  ...IContentData\n}": types.IContentListItemFragmentDoc,
    "fragment PageData on _IContent {\n  ...IContentData\n}": types.PageDataFragmentDoc,
    "fragment CompositionData on ICompositionNode {\n  name: displayName\n  layoutType: nodeType\n  type\n  key\n  template: displayTemplateKey\n  settings: displaySettings {\n    key\n    value\n  }\n  ... on ICompositionStructureNode {\n    nodes @recursive(depth: 10) {\n      name: displayName\n    }\n  }\n  ... on ICompositionElementNode {\n    element {\n      ...ElementData\n    }\n  }\n}": types.CompositionDataFragmentDoc,
    "fragment BlockData on _IContent {\n  ...IContentData\n}": types.BlockDataFragmentDoc,
    "fragment IContentInfo on IContentMetadata {\n  key\n  locale\n  types\n  displayName\n  version\n  url {\n    ...LinkData\n  }\n}": types.IContentInfoFragmentDoc,
    "query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: _Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...BlockData\n      ...PageData\n    }\n  }\n}": types.getContentByIdDocument,
    "query getContentByPath($path: String!, $version: String, $locale: [Locales!], $domain: String) {\n  content: _Content(\n    where: {_metadata: {url: {default: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...PageData\n    }\n  }\n}": types.getContentByPathDocument,
    "fragment LinkData on ContentUrl {\n  base\n  hierarchical\n  default\n}": types.LinkDataFragmentDoc,
    "fragment IContentData on _IContent {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}": types.IContentDataFragmentDoc,
    "query searchContent($term: String!, $topInterest: String, $locale: [String!], $types: [String!], $pageSize: Int) {\n  Content: _Content(\n    where: {_or: [{_fulltext: {contains: $term}}, {_fulltext: {contains: $topInterest, boost: 2}}], _fulltext: {contains: $term}, _metadata: {types: {in: \"_Page\"}}}\n    orderBy: {_ranking: SEMANTIC}\n    limit: $pageSize\n  ) {\n    total\n    cursor\n    items {\n      _score\n      ...IContentData\n      _metadata {\n        published\n      }\n      _fulltext(highlight: {enabled: true, startToken: \"<span>\", endToken: \"</span>\"})\n    }\n    facets {\n      _metadata {\n        types(filters: $types) {\n          name\n          count\n        }\n        locale(filters: $locale) {\n          name\n          count\n        }\n      }\n    }\n  }\n}": types.searchContentDocument,
    "fragment BlogListingBlockData on BlogListingBlock {\n  _metadata {\n    name: displayName\n  }\n  showFilters: BlogListingShowFilters\n  selectedPageSize: BlogListingItemCount\n}": types.BlogListingBlockDataFragmentDoc,
    "\nfragment CardBlockData on CardBlock {\n  cardButton: CardButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  cardColor: CardColor\n  cardDescription: CardDescription {\n    json\n    html\n  }\n  cardHeading: CardHeading\n  cardIcon: CardIcon {\n    ...ReferenceData\n  }\n  cardImage: CardImage {\n    ...ReferenceData\n  }\n  cardSubheading: CardSubHeading\n  cardImageLayout: ImageLayout\n}\n": types.CardBlockDataFragmentDoc,
    "fragment CarouselBlockData on CarouselBlock {\n    CarouselItemsContentArea {\n        ...IContentListItem\n    }\n}": types.CarouselBlockDataFragmentDoc,
    "\nfragment LayoutContainerBlockData on LayoutContainerBlock {\n  columns: ColumnsCount\n  containerColor: ContainerBackgroundColor\n  backgroundImage: ContainerBackgroundImage {\n    ...ReferenceData\n  }\n  marginBottom: ContainerMarginBottom\n  marginTop: ContainerMarginTop\n  paddingBottom: ContainerPaddingBottom\n  paddingTop: ContainerPaddingTop\n  gap: GapSize\n  LayoutContentArea {\n    ...IContentListItem\n  }\n}\n  ": types.LayoutContainerBlockDataFragmentDoc,
    "fragment HomeHeroBlockData on HomePageHeroBlock {\n  homeHeroHeading: HomeHeroBlockHeading\n  homeHeroSubheading: HomeHeroBlockSubHeading\n  homeHeroButton: HomeHeroButtonBlock {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  leftImage: HomeHeroLeftImage {\n    ...ReferenceData\n  }\n  rightImage: HomeHeroRightImage {\n    ...ReferenceData\n  }\n}": types.HomeHeroBlockDataFragmentDoc,
    "fragment HeroBlockData on HeroBlock {\n  heroHeading: Heading\n  heroSubheading: SubHeading\n  heroButton: HeroButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  heroColor: HeroColor\n  heroDescription: Description {\n    html\n    json\n  }\n  eyebrow: Eyebrow\n  heroImage: HeroImage {\n    ...ReferenceData\n  }\n}": types.HeroBlockDataFragmentDoc,
    "\n  fragment OdpEmbedBlockData on OdpEmbedBlock {\n    ContentId\n  }\n": types.OdpEmbedBlockDataFragmentDoc,
    "\n    fragment QuoteBlockData on QuoteBlock {\n      quote: QuoteText\n      color: QuoteColor\n      active: QuoteActive\n      name: QuoteProfileName\n      profilePicture: QuoteProfilePicture {\n        ...ReferenceData\n      }\n      location: QuoteProfileLocation\n    }\n  ": types.QuoteBlockDataFragmentDoc,
    "\n    fragment TextBlockData on TextBlock {\n      overline: TextBlockOverline\n      headingSize: TextBlockHeadingSize\n      heading: TextBlockHeading\n      description: TextBlockDescription {\n        json\n        html\n      }\n      center: TextCenter\n      width: TextBlockWidth\n      className: TextClassName\n    }\n  ": types.TextBlockDataFragmentDoc,
    "fragment ContentRecsBlockData on ContentRecsBlock {\n  BlockDeliveryApiKey\n  BlockRecommendationCount\n}": types.ContentRecsBlockDataFragmentDoc,
    "fragment PageSeoSettingsPropertyData on PageSeoSettingsProperty {\n  MetaTitle\n  MetaDescription\n  SharingImage {\n    ...ReferenceData\n  }\n  GraphType\n}": types.PageSeoSettingsPropertyDataFragmentDoc,
    "fragment ArticleListElementData on ArticleListElement {\n  articleListCount\n}": types.ArticleListElementDataFragmentDoc,
    "query getArticleListElementItems($count: Int, $locale: [Locales]) {\n  BlogPostPage(\n    orderBy: {_metadata: {published: DESC}}\n    limit: $count\n    locale: $locale\n    where: {_metadata: {status: {eq: \"Published\"}}}\n  ) {\n    items {\n      ...IContentData\n      articleMeta: _metadata {\n        key\n        published\n        lastModified\n      }\n      blogTitle: Heading\n      blogSubtitle: ArticleSubHeading\n      blogImage: BlogPostPromoImage {\n        ...ReferenceData\n      }\n      blogBody: BlogPostBody {\n        json\n      }\n      blogAuthor: ArticleAuthor\n    }\n  }\n}": types.getArticleListElementItemsDocument,
    "fragment CTAElementData on CTAElement {\n  cta_text: Text\n  cta_link: Link {\n    ...LinkData\n  }\n}": types.CTAElementDataFragmentDoc,
    "fragment ContentRecsElementData on ContentRecsElement {\n  ElementDeliveryApiKey\n  ElementRecommendationCount\n}": types.ContentRecsElementDataFragmentDoc,
    "fragment HeadingElementData on HeadingElement {\n  headingText\n}": types.HeadingElementDataFragmentDoc,
    "fragment ImageElementData on ImageElement {\n  altText\n  imageLink {\n    ...ReferenceData\n  }\n}": types.ImageElementDataFragmentDoc,
    "fragment ParagraphElementData on ParagraphElement {\n  text {\n    json\n  }\n}": types.ParagraphElementDataFragmentDoc,
    "fragment TestimonialElementData on TestimonialElement {\n  customerName\n  customerLocation\n  customerImage {\n    ...ReferenceData\n  }\n  referenceTitle\n  referenceText {\n    json\n  }\n}": types.TestimonialElementDataFragmentDoc,
    "fragment BlankExperienceData on BlankExperience {\n  BlankExperienceSeoSettings {\n    ...PageSeoSettingsPropertyData\n  }\n  ...ExperienceData\n}": types.BlankExperienceDataFragmentDoc,
    "query getBlankExperienceMetaData($key: String!, $locale: [Locales]) {\n  page: BlankExperience(where: {_metadata: {key: {eq: $key}}}, locale: $locale) {\n    items {\n      meta: _metadata {\n        displayName\n      }\n      seo: BlankExperienceSeoSettings {\n        title: MetaTitle\n        description: MetaDescription\n        image: SharingImage {\n          ...ReferenceData\n        }\n        type: GraphType\n      }\n    }\n  }\n}": types.getBlankExperienceMetaDataDocument,
    "fragment BlankSectionData on BlankSection {\n  _metadata {\n    key\n  }\n}": types.BlankSectionDataFragmentDoc,
    "query getFooter($locale: [Locales] = en) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      footerSubLinks: FooterNavigationSubLinks {\n        ...LinkItemData\n      }\n      footerCopyright: FooterNavigationCopyrightText\n      footerNavigation: FooterNavigationContentArea {\n        __typename\n        ...FooterMenuNavigationItem\n        ...HtmlBlock\n      }\n    }\n  }\n}\n\nfragment HtmlBlock on HtmlBlock {\n  title: HtmlBlockHeading\n  content: HtmlContent {\n    json\n    html\n  }\n  __typename\n}\n\nfragment FooterMenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}": types.getFooterDocument,
    "query getHeader($locale: [Locales]) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      headerNavigation: MainNavigationContentArea {\n        ...MegaMenuItem\n      }\n      UtilityNavigationContentArea {\n        ...MenuItem\n      }\n    }\n  }\n}\n\nfragment MegaMenuItem on MegaMenuGroupBlock {\n  menuName: MenuMenuHeading\n  menuData: MegaMenuContentArea {\n    ...MenuItem\n  }\n}\n\nfragment MenuItem on _IContent {\n  __typename\n  ...MenuNavigationItem\n  ...MenuCardItem\n  ...MenuButton\n}\n\nfragment MenuButton on ButtonBlock {\n  text: ButtonText\n  url: ButtonUrl {\n    ...LinkData\n  }\n  type: ButtonType\n  variant: ButtonVariant\n  __typename\n}\n\nfragment MenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    ...LinkItemData\n  }\n  __typename\n}\n\nfragment MenuCardItem on CardBlock {\n  heading: CardHeading\n  subheading: CardSubHeading\n  description: CardDescription {\n    json\n  }\n  color: CardColor\n  image: CardImage {\n    src: url {\n      ...LinkData\n    }\n  }\n  link: CardButton {\n    title: ButtonText\n    url: ButtonUrl {\n      ...LinkData\n    }\n  }\n  __typename\n}\n\nfragment LinkItemData on Link {\n  title\n  text\n  target\n  url {\n    ...LinkData\n  }\n}": types.getHeaderDocument,
    "fragment BlogPostPageData on BlogPostPage {\n  blogTitle: Heading\n  blogSubtitle: ArticleSubHeading\n  blogImage: BlogPostPromoImage {\n    ...ReferenceData\n  }\n  blogBody: BlogPostBody {\n    json\n  }\n  blogAuthor: ArticleAuthor\n}": types.BlogPostPageDataFragmentDoc,
    "query getBlogPostPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  BlogPostPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      Heading\n      BlogPostPromoImage {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}": types.getBlogPostPageMetaDataDocument,
    "query getLandingPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  LandingPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}": types.getLandingPageMetaDataDocument,
    "fragment LandingPageData on LandingPage {\n  TopContentArea {\n    ...BlockData\n  }\n  MainContentArea {\n    ...BlockData\n  }\n}": types.LandingPageDataFragmentDoc,
    "query getStandardPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  StandardPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      StandardPageHeading\n      StandardPromoImage {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}": types.getStandardPageMetaDataDocument,
    "fragment StandardPageData on StandardPage {\n  sptitle: StandardPageHeading\n  spsubtitle: StandardSubHeading\n  spimage: StandardPromoImage {\n    ...ReferenceData\n  }\n  spdescription: MainBody {\n    json\n  }\n}": types.StandardPageDataFragmentDoc,
    "fragment StartPageData on StartPage {\n  HomePageHeroContentArea {\n    ...BlockData\n  }\n  HomePageMainContentArea {\n    ...BlockData\n  }\n}": types.StartPageDataFragmentDoc,
    "query getStartPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  StartPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      SiteImageLogo {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}": types.getStartPageMetaDataDocument,
    "query getArticles($pageSize: Int! = 10, $start: Int! = 0, $locale: [Locales], $author: [String!], $published: Date, $publishedEnd: Date) {\n  getArticles: BlogPostPage(\n    where: {_and: [{_metadata: {published: {gte: $published}}}, {_metadata: {published: {lte: $publishedEnd}}}]}\n    locale: $locale\n    limit: $pageSize\n    skip: $start\n    orderBy: {_metadata: {published: DESC}}\n  ) {\n    total\n    items {\n      ...IContentData\n      _metadata {\n        published\n      }\n      title: Heading\n      description: SeoSettings {\n        text: MetaDescription\n      }\n      author: ArticleAuthor\n      image: BlogPostPromoImage {\n        ...ReferenceData\n      }\n    }\n    facets {\n      author: ArticleAuthor(orderType: VALUE, orderBy: ASC, filters: $author) {\n        count\n        name\n      }\n      _metadata {\n        published(unit: DAY) {\n          count\n          name\n        }\n      }\n    }\n  }\n}": types.getArticlesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: _Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      _metadata {\n        types\n      }\n    }\n  }\n}"): (typeof documents)["query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: _Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      _metadata {\n        types\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ReferenceData on ContentReference {\n  key\n  url {\n    ...LinkData\n  }\n}"): (typeof documents)["fragment ReferenceData on ContentReference {\n  key\n  url {\n    ...LinkData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment LinkItemData on Link {\n  title\n  text\n  target\n  url {\n    ...LinkData\n  }\n}"): (typeof documents)["fragment LinkItemData on Link {\n  title\n  text\n  target\n  url {\n    ...LinkData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ElementData on _IElement {\n  ...IElementData\n}"): (typeof documents)["fragment ElementData on _IElement {\n  ...IElementData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ExperienceData on _IExperience {\n  composition {\n    ...CompositionData\n  }\n}"): (typeof documents)["fragment ExperienceData on _IExperience {\n  composition {\n    ...CompositionData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IElementData on _IElement {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}"): (typeof documents)["fragment IElementData on _IElement {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IContentListItem on _IContent {\n  ...IContentData\n}"): (typeof documents)["fragment IContentListItem on _IContent {\n  ...IContentData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageData on _IContent {\n  ...IContentData\n}"): (typeof documents)["fragment PageData on _IContent {\n  ...IContentData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CompositionData on ICompositionNode {\n  name: displayName\n  layoutType: nodeType\n  type\n  key\n  template: displayTemplateKey\n  settings: displaySettings {\n    key\n    value\n  }\n  ... on ICompositionStructureNode {\n    nodes @recursive(depth: 10) {\n      name: displayName\n    }\n  }\n  ... on ICompositionElementNode {\n    element {\n      ...ElementData\n    }\n  }\n}"): (typeof documents)["fragment CompositionData on ICompositionNode {\n  name: displayName\n  layoutType: nodeType\n  type\n  key\n  template: displayTemplateKey\n  settings: displaySettings {\n    key\n    value\n  }\n  ... on ICompositionStructureNode {\n    nodes @recursive(depth: 10) {\n      name: displayName\n    }\n  }\n  ... on ICompositionElementNode {\n    element {\n      ...ElementData\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment BlockData on _IContent {\n  ...IContentData\n}"): (typeof documents)["fragment BlockData on _IContent {\n  ...IContentData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IContentInfo on IContentMetadata {\n  key\n  locale\n  types\n  displayName\n  version\n  url {\n    ...LinkData\n  }\n}"): (typeof documents)["fragment IContentInfo on IContentMetadata {\n  key\n  locale\n  types\n  displayName\n  version\n  url {\n    ...LinkData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: _Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...BlockData\n      ...PageData\n    }\n  }\n}"): (typeof documents)["query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: _Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...BlockData\n      ...PageData\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getContentByPath($path: String!, $version: String, $locale: [Locales!], $domain: String) {\n  content: _Content(\n    where: {_metadata: {url: {default: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...PageData\n    }\n  }\n}"): (typeof documents)["query getContentByPath($path: String!, $version: String, $locale: [Locales!], $domain: String) {\n  content: _Content(\n    where: {_metadata: {url: {default: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...PageData\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment LinkData on ContentUrl {\n  base\n  hierarchical\n  default\n}"): (typeof documents)["fragment LinkData on ContentUrl {\n  base\n  hierarchical\n  default\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IContentData on _IContent {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}"): (typeof documents)["fragment IContentData on _IContent {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query searchContent($term: String!, $topInterest: String, $locale: [String!], $types: [String!], $pageSize: Int) {\n  Content: _Content(\n    where: {_or: [{_fulltext: {contains: $term}}, {_fulltext: {contains: $topInterest, boost: 2}}], _fulltext: {contains: $term}, _metadata: {types: {in: \"_Page\"}}}\n    orderBy: {_ranking: SEMANTIC}\n    limit: $pageSize\n  ) {\n    total\n    cursor\n    items {\n      _score\n      ...IContentData\n      _metadata {\n        published\n      }\n      _fulltext(highlight: {enabled: true, startToken: \"<span>\", endToken: \"</span>\"})\n    }\n    facets {\n      _metadata {\n        types(filters: $types) {\n          name\n          count\n        }\n        locale(filters: $locale) {\n          name\n          count\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query searchContent($term: String!, $topInterest: String, $locale: [String!], $types: [String!], $pageSize: Int) {\n  Content: _Content(\n    where: {_or: [{_fulltext: {contains: $term}}, {_fulltext: {contains: $topInterest, boost: 2}}], _fulltext: {contains: $term}, _metadata: {types: {in: \"_Page\"}}}\n    orderBy: {_ranking: SEMANTIC}\n    limit: $pageSize\n  ) {\n    total\n    cursor\n    items {\n      _score\n      ...IContentData\n      _metadata {\n        published\n      }\n      _fulltext(highlight: {enabled: true, startToken: \"<span>\", endToken: \"</span>\"})\n    }\n    facets {\n      _metadata {\n        types(filters: $types) {\n          name\n          count\n        }\n        locale(filters: $locale) {\n          name\n          count\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment BlogListingBlockData on BlogListingBlock {\n  _metadata {\n    name: displayName\n  }\n  showFilters: BlogListingShowFilters\n  selectedPageSize: BlogListingItemCount\n}"): (typeof documents)["fragment BlogListingBlockData on BlogListingBlock {\n  _metadata {\n    name: displayName\n  }\n  showFilters: BlogListingShowFilters\n  selectedPageSize: BlogListingItemCount\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment CardBlockData on CardBlock {\n  cardButton: CardButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  cardColor: CardColor\n  cardDescription: CardDescription {\n    json\n    html\n  }\n  cardHeading: CardHeading\n  cardIcon: CardIcon {\n    ...ReferenceData\n  }\n  cardImage: CardImage {\n    ...ReferenceData\n  }\n  cardSubheading: CardSubHeading\n  cardImageLayout: ImageLayout\n}\n"): (typeof documents)["\nfragment CardBlockData on CardBlock {\n  cardButton: CardButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  cardColor: CardColor\n  cardDescription: CardDescription {\n    json\n    html\n  }\n  cardHeading: CardHeading\n  cardIcon: CardIcon {\n    ...ReferenceData\n  }\n  cardImage: CardImage {\n    ...ReferenceData\n  }\n  cardSubheading: CardSubHeading\n  cardImageLayout: ImageLayout\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CarouselBlockData on CarouselBlock {\n    CarouselItemsContentArea {\n        ...IContentListItem\n    }\n}"): (typeof documents)["fragment CarouselBlockData on CarouselBlock {\n    CarouselItemsContentArea {\n        ...IContentListItem\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment LayoutContainerBlockData on LayoutContainerBlock {\n  columns: ColumnsCount\n  containerColor: ContainerBackgroundColor\n  backgroundImage: ContainerBackgroundImage {\n    ...ReferenceData\n  }\n  marginBottom: ContainerMarginBottom\n  marginTop: ContainerMarginTop\n  paddingBottom: ContainerPaddingBottom\n  paddingTop: ContainerPaddingTop\n  gap: GapSize\n  LayoutContentArea {\n    ...IContentListItem\n  }\n}\n  "): (typeof documents)["\nfragment LayoutContainerBlockData on LayoutContainerBlock {\n  columns: ColumnsCount\n  containerColor: ContainerBackgroundColor\n  backgroundImage: ContainerBackgroundImage {\n    ...ReferenceData\n  }\n  marginBottom: ContainerMarginBottom\n  marginTop: ContainerMarginTop\n  paddingBottom: ContainerPaddingBottom\n  paddingTop: ContainerPaddingTop\n  gap: GapSize\n  LayoutContentArea {\n    ...IContentListItem\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment HomeHeroBlockData on HomePageHeroBlock {\n  homeHeroHeading: HomeHeroBlockHeading\n  homeHeroSubheading: HomeHeroBlockSubHeading\n  homeHeroButton: HomeHeroButtonBlock {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  leftImage: HomeHeroLeftImage {\n    ...ReferenceData\n  }\n  rightImage: HomeHeroRightImage {\n    ...ReferenceData\n  }\n}"): (typeof documents)["fragment HomeHeroBlockData on HomePageHeroBlock {\n  homeHeroHeading: HomeHeroBlockHeading\n  homeHeroSubheading: HomeHeroBlockSubHeading\n  homeHeroButton: HomeHeroButtonBlock {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  leftImage: HomeHeroLeftImage {\n    ...ReferenceData\n  }\n  rightImage: HomeHeroRightImage {\n    ...ReferenceData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment HeroBlockData on HeroBlock {\n  heroHeading: Heading\n  heroSubheading: SubHeading\n  heroButton: HeroButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  heroColor: HeroColor\n  heroDescription: Description {\n    html\n    json\n  }\n  eyebrow: Eyebrow\n  heroImage: HeroImage {\n    ...ReferenceData\n  }\n}"): (typeof documents)["fragment HeroBlockData on HeroBlock {\n  heroHeading: Heading\n  heroSubheading: SubHeading\n  heroButton: HeroButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  heroColor: HeroColor\n  heroDescription: Description {\n    html\n    json\n  }\n  eyebrow: Eyebrow\n  heroImage: HeroImage {\n    ...ReferenceData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment OdpEmbedBlockData on OdpEmbedBlock {\n    ContentId\n  }\n"): (typeof documents)["\n  fragment OdpEmbedBlockData on OdpEmbedBlock {\n    ContentId\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment QuoteBlockData on QuoteBlock {\n      quote: QuoteText\n      color: QuoteColor\n      active: QuoteActive\n      name: QuoteProfileName\n      profilePicture: QuoteProfilePicture {\n        ...ReferenceData\n      }\n      location: QuoteProfileLocation\n    }\n  "): (typeof documents)["\n    fragment QuoteBlockData on QuoteBlock {\n      quote: QuoteText\n      color: QuoteColor\n      active: QuoteActive\n      name: QuoteProfileName\n      profilePicture: QuoteProfilePicture {\n        ...ReferenceData\n      }\n      location: QuoteProfileLocation\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment TextBlockData on TextBlock {\n      overline: TextBlockOverline\n      headingSize: TextBlockHeadingSize\n      heading: TextBlockHeading\n      description: TextBlockDescription {\n        json\n        html\n      }\n      center: TextCenter\n      width: TextBlockWidth\n      className: TextClassName\n    }\n  "): (typeof documents)["\n    fragment TextBlockData on TextBlock {\n      overline: TextBlockOverline\n      headingSize: TextBlockHeadingSize\n      heading: TextBlockHeading\n      description: TextBlockDescription {\n        json\n        html\n      }\n      center: TextCenter\n      width: TextBlockWidth\n      className: TextClassName\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ContentRecsBlockData on ContentRecsBlock {\n  BlockDeliveryApiKey\n  BlockRecommendationCount\n}"): (typeof documents)["fragment ContentRecsBlockData on ContentRecsBlock {\n  BlockDeliveryApiKey\n  BlockRecommendationCount\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageSeoSettingsPropertyData on PageSeoSettingsProperty {\n  MetaTitle\n  MetaDescription\n  SharingImage {\n    ...ReferenceData\n  }\n  GraphType\n}"): (typeof documents)["fragment PageSeoSettingsPropertyData on PageSeoSettingsProperty {\n  MetaTitle\n  MetaDescription\n  SharingImage {\n    ...ReferenceData\n  }\n  GraphType\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ArticleListElementData on ArticleListElement {\n  articleListCount\n}"): (typeof documents)["fragment ArticleListElementData on ArticleListElement {\n  articleListCount\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getArticleListElementItems($count: Int, $locale: [Locales]) {\n  BlogPostPage(\n    orderBy: {_metadata: {published: DESC}}\n    limit: $count\n    locale: $locale\n    where: {_metadata: {status: {eq: \"Published\"}}}\n  ) {\n    items {\n      ...IContentData\n      articleMeta: _metadata {\n        key\n        published\n        lastModified\n      }\n      blogTitle: Heading\n      blogSubtitle: ArticleSubHeading\n      blogImage: BlogPostPromoImage {\n        ...ReferenceData\n      }\n      blogBody: BlogPostBody {\n        json\n      }\n      blogAuthor: ArticleAuthor\n    }\n  }\n}"): (typeof documents)["query getArticleListElementItems($count: Int, $locale: [Locales]) {\n  BlogPostPage(\n    orderBy: {_metadata: {published: DESC}}\n    limit: $count\n    locale: $locale\n    where: {_metadata: {status: {eq: \"Published\"}}}\n  ) {\n    items {\n      ...IContentData\n      articleMeta: _metadata {\n        key\n        published\n        lastModified\n      }\n      blogTitle: Heading\n      blogSubtitle: ArticleSubHeading\n      blogImage: BlogPostPromoImage {\n        ...ReferenceData\n      }\n      blogBody: BlogPostBody {\n        json\n      }\n      blogAuthor: ArticleAuthor\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CTAElementData on CTAElement {\n  cta_text: Text\n  cta_link: Link {\n    ...LinkData\n  }\n}"): (typeof documents)["fragment CTAElementData on CTAElement {\n  cta_text: Text\n  cta_link: Link {\n    ...LinkData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ContentRecsElementData on ContentRecsElement {\n  ElementDeliveryApiKey\n  ElementRecommendationCount\n}"): (typeof documents)["fragment ContentRecsElementData on ContentRecsElement {\n  ElementDeliveryApiKey\n  ElementRecommendationCount\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment HeadingElementData on HeadingElement {\n  headingText\n}"): (typeof documents)["fragment HeadingElementData on HeadingElement {\n  headingText\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ImageElementData on ImageElement {\n  altText\n  imageLink {\n    ...ReferenceData\n  }\n}"): (typeof documents)["fragment ImageElementData on ImageElement {\n  altText\n  imageLink {\n    ...ReferenceData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ParagraphElementData on ParagraphElement {\n  text {\n    json\n  }\n}"): (typeof documents)["fragment ParagraphElementData on ParagraphElement {\n  text {\n    json\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment TestimonialElementData on TestimonialElement {\n  customerName\n  customerLocation\n  customerImage {\n    ...ReferenceData\n  }\n  referenceTitle\n  referenceText {\n    json\n  }\n}"): (typeof documents)["fragment TestimonialElementData on TestimonialElement {\n  customerName\n  customerLocation\n  customerImage {\n    ...ReferenceData\n  }\n  referenceTitle\n  referenceText {\n    json\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment BlankExperienceData on BlankExperience {\n  BlankExperienceSeoSettings {\n    ...PageSeoSettingsPropertyData\n  }\n  ...ExperienceData\n}"): (typeof documents)["fragment BlankExperienceData on BlankExperience {\n  BlankExperienceSeoSettings {\n    ...PageSeoSettingsPropertyData\n  }\n  ...ExperienceData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getBlankExperienceMetaData($key: String!, $locale: [Locales]) {\n  page: BlankExperience(where: {_metadata: {key: {eq: $key}}}, locale: $locale) {\n    items {\n      meta: _metadata {\n        displayName\n      }\n      seo: BlankExperienceSeoSettings {\n        title: MetaTitle\n        description: MetaDescription\n        image: SharingImage {\n          ...ReferenceData\n        }\n        type: GraphType\n      }\n    }\n  }\n}"): (typeof documents)["query getBlankExperienceMetaData($key: String!, $locale: [Locales]) {\n  page: BlankExperience(where: {_metadata: {key: {eq: $key}}}, locale: $locale) {\n    items {\n      meta: _metadata {\n        displayName\n      }\n      seo: BlankExperienceSeoSettings {\n        title: MetaTitle\n        description: MetaDescription\n        image: SharingImage {\n          ...ReferenceData\n        }\n        type: GraphType\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment BlankSectionData on BlankSection {\n  _metadata {\n    key\n  }\n}"): (typeof documents)["fragment BlankSectionData on BlankSection {\n  _metadata {\n    key\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getFooter($locale: [Locales] = en) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      footerSubLinks: FooterNavigationSubLinks {\n        ...LinkItemData\n      }\n      footerCopyright: FooterNavigationCopyrightText\n      footerNavigation: FooterNavigationContentArea {\n        __typename\n        ...FooterMenuNavigationItem\n        ...HtmlBlock\n      }\n    }\n  }\n}\n\nfragment HtmlBlock on HtmlBlock {\n  title: HtmlBlockHeading\n  content: HtmlContent {\n    json\n    html\n  }\n  __typename\n}\n\nfragment FooterMenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}"): (typeof documents)["query getFooter($locale: [Locales] = en) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      footerSubLinks: FooterNavigationSubLinks {\n        ...LinkItemData\n      }\n      footerCopyright: FooterNavigationCopyrightText\n      footerNavigation: FooterNavigationContentArea {\n        __typename\n        ...FooterMenuNavigationItem\n        ...HtmlBlock\n      }\n    }\n  }\n}\n\nfragment HtmlBlock on HtmlBlock {\n  title: HtmlBlockHeading\n  content: HtmlContent {\n    json\n    html\n  }\n  __typename\n}\n\nfragment FooterMenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getHeader($locale: [Locales]) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      headerNavigation: MainNavigationContentArea {\n        ...MegaMenuItem\n      }\n      UtilityNavigationContentArea {\n        ...MenuItem\n      }\n    }\n  }\n}\n\nfragment MegaMenuItem on MegaMenuGroupBlock {\n  menuName: MenuMenuHeading\n  menuData: MegaMenuContentArea {\n    ...MenuItem\n  }\n}\n\nfragment MenuItem on _IContent {\n  __typename\n  ...MenuNavigationItem\n  ...MenuCardItem\n  ...MenuButton\n}\n\nfragment MenuButton on ButtonBlock {\n  text: ButtonText\n  url: ButtonUrl {\n    ...LinkData\n  }\n  type: ButtonType\n  variant: ButtonVariant\n  __typename\n}\n\nfragment MenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    ...LinkItemData\n  }\n  __typename\n}\n\nfragment MenuCardItem on CardBlock {\n  heading: CardHeading\n  subheading: CardSubHeading\n  description: CardDescription {\n    json\n  }\n  color: CardColor\n  image: CardImage {\n    src: url {\n      ...LinkData\n    }\n  }\n  link: CardButton {\n    title: ButtonText\n    url: ButtonUrl {\n      ...LinkData\n    }\n  }\n  __typename\n}\n\nfragment LinkItemData on Link {\n  title\n  text\n  target\n  url {\n    ...LinkData\n  }\n}"): (typeof documents)["query getHeader($locale: [Locales]) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      headerNavigation: MainNavigationContentArea {\n        ...MegaMenuItem\n      }\n      UtilityNavigationContentArea {\n        ...MenuItem\n      }\n    }\n  }\n}\n\nfragment MegaMenuItem on MegaMenuGroupBlock {\n  menuName: MenuMenuHeading\n  menuData: MegaMenuContentArea {\n    ...MenuItem\n  }\n}\n\nfragment MenuItem on _IContent {\n  __typename\n  ...MenuNavigationItem\n  ...MenuCardItem\n  ...MenuButton\n}\n\nfragment MenuButton on ButtonBlock {\n  text: ButtonText\n  url: ButtonUrl {\n    ...LinkData\n  }\n  type: ButtonType\n  variant: ButtonVariant\n  __typename\n}\n\nfragment MenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    ...LinkItemData\n  }\n  __typename\n}\n\nfragment MenuCardItem on CardBlock {\n  heading: CardHeading\n  subheading: CardSubHeading\n  description: CardDescription {\n    json\n  }\n  color: CardColor\n  image: CardImage {\n    src: url {\n      ...LinkData\n    }\n  }\n  link: CardButton {\n    title: ButtonText\n    url: ButtonUrl {\n      ...LinkData\n    }\n  }\n  __typename\n}\n\nfragment LinkItemData on Link {\n  title\n  text\n  target\n  url {\n    ...LinkData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment BlogPostPageData on BlogPostPage {\n  blogTitle: Heading\n  blogSubtitle: ArticleSubHeading\n  blogImage: BlogPostPromoImage {\n    ...ReferenceData\n  }\n  blogBody: BlogPostBody {\n    json\n  }\n  blogAuthor: ArticleAuthor\n}"): (typeof documents)["fragment BlogPostPageData on BlogPostPage {\n  blogTitle: Heading\n  blogSubtitle: ArticleSubHeading\n  blogImage: BlogPostPromoImage {\n    ...ReferenceData\n  }\n  blogBody: BlogPostBody {\n    json\n  }\n  blogAuthor: ArticleAuthor\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getBlogPostPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  BlogPostPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      Heading\n      BlogPostPromoImage {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}"): (typeof documents)["query getBlogPostPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  BlogPostPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      Heading\n      BlogPostPromoImage {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getLandingPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  LandingPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}"): (typeof documents)["query getLandingPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  LandingPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment LandingPageData on LandingPage {\n  TopContentArea {\n    ...BlockData\n  }\n  MainContentArea {\n    ...BlockData\n  }\n}"): (typeof documents)["fragment LandingPageData on LandingPage {\n  TopContentArea {\n    ...BlockData\n  }\n  MainContentArea {\n    ...BlockData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getStandardPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  StandardPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      StandardPageHeading\n      StandardPromoImage {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}"): (typeof documents)["query getStandardPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  StandardPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      StandardPageHeading\n      StandardPromoImage {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment StandardPageData on StandardPage {\n  sptitle: StandardPageHeading\n  spsubtitle: StandardSubHeading\n  spimage: StandardPromoImage {\n    ...ReferenceData\n  }\n  spdescription: MainBody {\n    json\n  }\n}"): (typeof documents)["fragment StandardPageData on StandardPage {\n  sptitle: StandardPageHeading\n  spsubtitle: StandardSubHeading\n  spimage: StandardPromoImage {\n    ...ReferenceData\n  }\n  spdescription: MainBody {\n    json\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment StartPageData on StartPage {\n  HomePageHeroContentArea {\n    ...BlockData\n  }\n  HomePageMainContentArea {\n    ...BlockData\n  }\n}"): (typeof documents)["fragment StartPageData on StartPage {\n  HomePageHeroContentArea {\n    ...BlockData\n  }\n  HomePageMainContentArea {\n    ...BlockData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getStartPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  StartPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      SiteImageLogo {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}"): (typeof documents)["query getStartPageMetaData($key: String!, $version: String, $locale: [Locales]) {\n  StartPage(\n    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    pages: items {\n      _metadata {\n        displayName\n        key\n        version\n        locale\n      }\n      SiteImageLogo {\n        ...ReferenceData\n      }\n      SeoSettings {\n        MetaTitle\n        MetaDescription\n        SharingImage {\n          ...ReferenceData\n        }\n        GraphType\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getArticles($pageSize: Int! = 10, $start: Int! = 0, $locale: [Locales], $author: [String!], $published: Date, $publishedEnd: Date) {\n  getArticles: BlogPostPage(\n    where: {_and: [{_metadata: {published: {gte: $published}}}, {_metadata: {published: {lte: $publishedEnd}}}]}\n    locale: $locale\n    limit: $pageSize\n    skip: $start\n    orderBy: {_metadata: {published: DESC}}\n  ) {\n    total\n    items {\n      ...IContentData\n      _metadata {\n        published\n      }\n      title: Heading\n      description: SeoSettings {\n        text: MetaDescription\n      }\n      author: ArticleAuthor\n      image: BlogPostPromoImage {\n        ...ReferenceData\n      }\n    }\n    facets {\n      author: ArticleAuthor(orderType: VALUE, orderBy: ASC, filters: $author) {\n        count\n        name\n      }\n      _metadata {\n        published(unit: DAY) {\n          count\n          name\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query getArticles($pageSize: Int! = 10, $start: Int! = 0, $locale: [Locales], $author: [String!], $published: Date, $publishedEnd: Date) {\n  getArticles: BlogPostPage(\n    where: {_and: [{_metadata: {published: {gte: $published}}}, {_metadata: {published: {lte: $publishedEnd}}}]}\n    locale: $locale\n    limit: $pageSize\n    skip: $start\n    orderBy: {_metadata: {published: DESC}}\n  ) {\n    total\n    items {\n      ...IContentData\n      _metadata {\n        published\n      }\n      title: Heading\n      description: SeoSettings {\n        text: MetaDescription\n      }\n      author: ArticleAuthor\n      image: BlogPostPromoImage {\n        ...ReferenceData\n      }\n    }\n    facets {\n      author: ArticleAuthor(orderType: VALUE, orderBy: ASC, filters: $author) {\n        count\n        name\n      }\n      _metadata {\n        published(unit: DAY) {\n          count\n          name\n        }\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;