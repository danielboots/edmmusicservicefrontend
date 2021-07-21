import { sanityClient, urlFor } from "../../sanity";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Service from "@/components/Service";
import Info from "@/components/Info";

const service = ({ service }) => {
  const [serviceData, setServiceData] = useState(null);

  console.log(serviceData);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'service'] | order(id asc){
        title,
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

    }`
      )
      .then((data) => setServiceData(data))
      .catch(console.error);
  }, []);

  return (
    <Layout title="services | EDM" description="services | EDM Music Services">
      <div className=" p-4 container mx-auto font-body ">
        <h1 className="flex justify-center text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl ">
          Our Top Services
        </h1>

        <div className=" m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {serviceData &&
            serviceData.map((service, index) => (
              <div>
                <Service key={service.id} service={service} />
              </div>
            ))}
        </div>
      </div>
      <Info />
    </Layout>
  );
};

export default service;
