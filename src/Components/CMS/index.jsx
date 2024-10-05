import { useSelector } from "react-redux";
import { logger } from "../../helpers/commonHelper";
import NoRecordFound from "../Common/NoRecordFound";
import AppContent from "./Sections/AppContent";
import Banner from "./Sections/Banner";
import BestSaller from "./Sections/BestSaller";
import Feature from "./Sections/Feature";
import Content from "./Sections/Content";
import Promotion from "./Sections/Promotion";
import StoreCategories from "./Sections/StoreCategories";
import Testimonial from "./Sections/Testimonial";
import Slider from "./Sections/Slider";
import Gallery from "./Sections/Gallery";

export default function CMS({ details }) {
    const { isLoading, message } = useSelector(s => s.page);

    logger("CMS DETAILS ::: ", details);

    if (!!details)
        return (
            <>
                {details?.sections?.map(((section, key) => {
                    if (section?.status === "active") {
                        switch (section?.type) {
                            case "appcontent":
                                return <AppContent details={section} />;
                            case "banner":
                                return <Banner details={section} />;
                            case "bestseller":
                                return <BestSaller details={section} />;
                            case "content":
                                return <Content details={section} />;
                            case "feature":
                                return <Feature details={section} />;
                            case "promotion":
                                return <Promotion details={section} />;
                            case "storecategories":
                                return <StoreCategories details={section} />;
                            case "testimonial":
                                return <Testimonial details={section} />;
                            case "slider":
                                return <Slider details={section} />;
                            case "gallery":
                                return <Gallery details={section} />;
                            default:
                                return null;
                        }
                    }
                    return null;
                }))}
            </>
        );

    else if (!isLoading && !details)
        return <NoRecordFound />

    return null;
}