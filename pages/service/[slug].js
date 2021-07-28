import { sanityClient, urlFor } from "../../sanity";
import Layout from "@/components/Layout";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import Info from "@/components/Info";

const Service = ({
  title,
  body,
  slug,
  tagline,
  id,
  mainImage,
  description,
  tags,
}) => {
  return (
    <Layout title="About | EDM" description="About| EDM Music Services">
      <div>
        <main>
          <div>
            {/* Main container div */}

            <div className="absolute h-full w-full flex overflow-x-auto bg-coolgray-900 bg-opacity-50 backdrop-filter  "></div>
            <h1 className=" text-white z-20 uppercase font-body text-center font-bold   text-3xl  sm:text-4xl md:text-5xl ">
              {title}
            </h1>
          </div>

          <div className="   container mx-auto text-lg text-gray-500 text-justify grid  grid-cols-1 p-4  sm:grid-cols-2">
            <div className="  flex items-center ">
              <img
                src={mainImage.asset.url}
                className="hover:shadow-2xl transition duration-300 ease-in-out relative border-1"
                alt=""
              />
            </div>
            <div className=" px-4 mb-6 flex font-body">
              <div className=" pt-6">
                <div className=" text-3xl  justify-center font-black  text-gray-700 pb-4">
                  {title}...
                  <div className=" text-sm text-gray-400 tracking-widest">
                    {tagline}.
                  </div>
                </div>
                {description}
              </div>
            </div>
          </div>

          <div className="container mx-auto ">
            <div className=" text-lg font-body text-gray-500 m-4 text-justify  leading-relaxed ">
              <BlockContent
                blocks={body}
                projectId="ta2muy7p"
                dataset="production"
              />
            </div>
            <Link href="/contact">
              <button
                type="button"
                className=" m-3 py-3 px-4  uppercase  text-xs  rounded-sm font-bold  text-white bg-gray-900 hover:bg-gray-800 justify-end"
              >
                Enquire ...
              </button>
            </Link>
          </div>
        </main>
      </div>
      <Info />
    </Layout>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  console.log(pageSlug);

  const query = `*[_type == 'service' && slug.current == $pageSlug][0]{
    title,
    body,
    slug,
    tagline,
    id,
    mainImage {
      asset-> {
          _id,
          url,
      },
      alt,
  },
  


    description,
    tags,

}`;

  const service = await sanityClient.fetch(query, { pageSlug });

  if (!service) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: service.title,
        slug: service.slug,
        tagline: service.tagline,
        id: service.id,
        mainImage: service.mainImage,
        description: service.description,
        tags: service.tags,
        body: service.body,
      },
    };
  }
};

export default Service;
