import "server-only";
// Next.JS
import { type Metadata } from "next";

// Optimizely Graph types and SDK
import { type Locales, type BlogPostPageDataFragment, BlogPostPageDataFragmentDoc } from "@gql/graphql";
import { getSdk } from "@gql";

// Implementation components
import ContainerBlock from "@/components/cms/component/LayoutContainerBlock";
import TextBlock from "@/components/cms/component/TextBlock";
import BlogListingBlock from "@/components/cms/component/BlogListingBlock";
import Image from "@/components/shared/cms_image";
import { getLinkData, linkDataToUrl } from "@/lib/urls";
import { toValidOpenGraphType } from "@/lib/opengraph";

// SDK Components
import { type OptimizelyNextPage } from "@remkoj/optimizely-cms-nextjs";
import { CmsEditable, getServerContext } from "@remkoj/optimizely-cms-react/rsc";
import { RichText } from "@remkoj/optimizely-cms-react/components";
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client";

export const BlogPostPage: OptimizelyNextPage<BlogPostPageDataFragment> = ({
  contentLink,
  data: { blogTitle: title, blogImage: image, blogBody: description, blogAuthor: author, blogSubtitle: subtitle },
}) => {

  const { factory } = getServerContext()

  return (
    <>
      <div className="outer-padding">
      { image && <div className="relative col-span-12 mt-16 lg:mt-32 mb-24 mx-auto aspect-[1/1] md:aspect-[16/5] flex items-end">
        <CmsEditable cmsFieldName="BlogPostPromoImage" as={ Image } className="top-0 left-0 rounded-[40px] aspect-[1/1] md:aspect-[16/5] object-cover absolute -z-50" src={image} alt="" width={1920} height={1080} />
        <div className="container max-w-[1024px] px-[24px] mx-auto bg-[rgba(248,248,252,0.75)] dark:bg-[rgba(16,20,29,0.75)] rounded-t-[40px]">
          <CmsEditable cmsFieldName="Heading" as="h1" className="mt-[24px] mb-[24px] text-[48px] font-extrabold">{ title ?? "" }</CmsEditable>
        </div>
      </div> }
        <div className="container mx-auto grid grid-cols-12">
          <section className="col-span-12 lg:col-span-10 lg:col-start-2 mx-auto">
            <div className="prose max-w-[960px] prose-h2:text-[36px] prose-h2:leading-[40px] prose-h2:mb-[24px] prose-h2:mt-[48px] prose-a:text-azure prose-a:font-bold prose-a:no-underline hover:prose-a:underline focus:prose-a:underline prose-img:rounded-[40px] prose-img:p-[20px] prose-img:border-2">
              { !image && <CmsEditable cmsFieldName="Heading" as="h1" className="mb-[24px] text-[48px]">{ title ?? "" }</CmsEditable> }
              <CmsEditable cmsFieldName="ArticleAuthor" as="p" className="text-people-eater my-[24px] text-[24px]">{ author ?? "" }</CmsEditable>
              <CmsEditable cmsFieldName="ArticleSubHeading" as="p" className="text-[30px] leading-[36px] mt-[24px] mb-20">{ subtitle ?? "" }</CmsEditable>
              <CmsEditable cmsFieldName="BlogPostBody" as={ RichText } text={ description?.json } factory={ factory } />
              <div className="col-span-12 lg:col-span-10 lg:col-start-2 mx-auto border-t-2 my-64"></div>
            </div>
          </section>
        </div>
      </div>
      <ContainerBlock
        data={{ columns: 1, containerColor: "none", marginBottom: "large" }}
        contentLink={contentLink}
      >
        <TextBlock
          contentLink={contentLink}
          data={{
            center: true,
            overline: "More picks just for you",
            heading: "Want to keep reading?",
            headingSize: "medium",
          }}
        />
      </ContainerBlock>
      <BlogListingBlock
        contentLink={contentLink}
        data={{
          showFilters: false,
          selectedPageSize: 3,
        }}
      ></BlogListingBlock>
    </>
  );
};

BlogPostPage.getDataFragment = () => ["BlogPostPageData", BlogPostPageDataFragmentDoc];
BlogPostPage.getMetaData = async (contentLink, locale, client) => {
  const sdk = getSdk(client)
  const result = await sdk.getBlogPostPageMetaData({ ...contentLink, locale: locale ? localeToGraphLocale(locale) as Locales : null })
  const matchingPosts = (result.BlogPostPage?.pages || []).filter(isNotNullOrUndefined)
  if (matchingPosts.length != 1)
    return {}
  const cmsManagedData = matchingPosts[0]
  const meta : WithPropertySet<Metadata, 'openGraph'> = {
    title: cmsManagedData.SeoSettings?.MetaTitle ?? cmsManagedData.Heading ?? cmsManagedData._metadata?.displayName,
    description: cmsManagedData.SeoSettings?.MetaDescription,
    openGraph: {
      type: toValidOpenGraphType(cmsManagedData.SeoSettings?.GraphType, 'article') ?? 'article',
      title: cmsManagedData.SeoSettings?.MetaTitle ?? cmsManagedData.Heading ?? cmsManagedData._metadata?.displayName ?? undefined,
      description: cmsManagedData.SeoSettings?.MetaDescription ?? undefined,
    },
    other: {
      "idio:content-type": "Blog post"
    }
  }
  const pageImage = linkDataToUrl(getLinkData(cmsManagedData.SeoSettings?.SharingImage)) ?? linkDataToUrl(getLinkData(cmsManagedData.BlogPostPromoImage))
  if (pageImage) {
    meta.openGraph.images = [{
      url: pageImage
    }]
  }
  return meta
}

type WithPropertySet<T, K extends keyof T> = Omit<T, K> & { [P in K] -?: NonNullable<Required<T>[P]> }

function isNotNullOrUndefined<T>(toTest?: T | null | undefined): toTest is T
{
  return toTest ? true : false
}

export default BlogPostPage;