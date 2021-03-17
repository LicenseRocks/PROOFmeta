import React from "react";
import { Button, ErrorTemplate } from "@licenserocks/kit";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const Page404 = () => {
  const { t } = useTranslation("common");

  const goToHomeButton = (
    <Link href="/" passHref>
      <Button content={t(`errorPage.notFoundError.action`)} />
    </Link>
  );

  return (
    <ErrorTemplate
      action={goToHomeButton}
      statusCode={404}
      subTitle={t(`errorPage.notFoundError.subTitle`)}
      title={t(`errorPage.notFoundError.title`)}
    />
  );
};

export default Page404;
