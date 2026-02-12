// Charg Dashboard MUI layouts
import Default from "layouts/dashboards/default";
import Overview from "layouts/ecommerce/overview";

import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductsList from "layouts/ecommerce/products/products-list";

import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";

import SignInCover from "layouts/authentication/sign-in";
import Track from "layouts/applications/order-track";
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
// import Category from "layouts/category/category";
import CreateCategory from "layouts/category/createCategory";

import Banner from "layouts/ecommerce/banner/new-banner";
import EditBanner from "layouts/ecommerce/banner/edit-banner";
import BannerList from "layouts/ecommerce/banner/banner-list";

import Brand from "layouts/ecommerce/brand/new-brand";
import EditBrand from "layouts/ecommerce/brand/edit-brand";
import BrandList from "layouts/ecommerce/brand/brand-list";

import Category from "layouts/ecommerce/category/new-category";
import EditCategory from "layouts/ecommerce/category/edit-category";
import CategoryList from "layouts/ecommerce/category/category-list";

import SubCategory from "layouts/ecommerce/sub-category/new-sub-category";
import EditSubCategory from "layouts/ecommerce/sub-category/edit-sub-category";
import SubCategoryList from "layouts/ecommerce/sub-category/sub-category-list";

import PrivateRoute from "privateRoute";
import config from "config";
import CreateCampaign from "layouts/ecommerce/campaign/new-campaign";
import { BrandingWatermark, Campaign, CategoryOutlined, CountertopsOutlined, Image, LocalOffer, LocalShipping, MoneyOffCsredRounded, PagesOutlined, PlayCircleRounded, ProductionQuantityLimits, Settings, Store, SubdirectoryArrowLeft, VerifiedUserOutlined, WarehouseRounded } from "@mui/icons-material";
import CampaignList from "layouts/ecommerce/campaign/campaign-list";
import EditCampaign from "layouts/ecommerce/campaign/edit-campaign";
import CreateOffer from "layouts/ecommerce/offer/new-offer";
import OfferList from "layouts/ecommerce/offer/offer-list";
import EditOffer from "layouts/ecommerce/offer/edit-offer";
import CreateCoupon from "layouts/ecommerce/coupon/new-coupon";
import EditCoupon from "layouts/ecommerce/coupon/edit-coupon";
import CouponList from "layouts/ecommerce/coupon/coupon-list";
import EditSocial from "layouts/ecommerce/social";
import CareerList from "layouts/ecommerce/career/career-list";
import CareerDetails from "layouts/ecommerce/career/edit-career";
import EditAddress from "layouts/ecommerce/address";
import ContactList from "layouts/ecommerce/contact/contact-list";
import ContactDetails from "layouts/ecommerce/contact/edit-contact";
import UserList from "layouts/ecommerce/user/user-list";
import UserDetails from "layouts/ecommerce/user/edit-user";
import EwarrentyList from "layouts/ecommerce/ewarrrenty/ewarrrenty-list";
import EwarrentyDetails from "layouts/ecommerce/ewarrrenty/edit-ewarrrenty";
import ShippingList from "layouts/ecommerce/shipping/shipping-list";
import EditShipping from "layouts/ecommerce/shipping/edit-shipping";
import Shipping from "layouts/ecommerce/shipping/new-shipping";
import ProductReview from "layouts/ecommerce/products/product-review";
import ProductsReviewList from "layouts/ecommerce/products/products-review";
import ProductsQuestionList from "layouts/ecommerce/products/products-question";
import BrandVideo from "layouts/ecommerce/brandVideo/new-brandVideo";
import EditBrandVideo from "layouts/ecommerce/brandVideo/brandVideo-brand";
import BrandVideoList from "layouts/ecommerce/brandVideo/brandVideo-list";
import NewPageList from "layouts/ecommerce/newPage/newPage-list";
import EditNewPage from "layouts/ecommerce/newPage/edit-newPage";
import NewPage from "layouts/ecommerce/newPage/new-newPage";
import StoreList from "layouts/ecommerce/store/store-list";
import EditStore from "layouts/ecommerce/store/edit-store";
import NewStore from "layouts/ecommerce/store/new-store";

const routes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <DashboardIcon />,
    collapse: [
      {
        name: "Default",
        key: "default",
        route: "/",
        component: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "User",
    key: "user",
    icon: <VerifiedUserOutlined />,
    collapse: [
      {
        name: "User List",
        key: "User Lists",
        route: "/user/user-list",
        component: <PrivateRoute><UserList /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Campaign",
        route: "/ecommerce/users/edit-user/:id",
        component: <PrivateRoute><UserDetails /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  // { type: "title", title: "Pages", key: "title-pages" },

  // {
  //   name: "Overview",
  //   key: "overview",
  //   route: "/ecommerce/overview",
  //   component: (
  //     <PrivateRoute>
  //       <Overview />
  //     </PrivateRoute>
  //   ),
  //   auth: true,
  // },
  {
    type: "collapse",
    icon: <Image />,
    name: "Banner",
    key: "banner",
    collapse: [
      {
        name: "New Banner",
        key: "new-banner",
        route: "/ecommerce/new-banner",
        component: <PrivateRoute><Banner /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Banner",
        // key: "Edit-banner",
        route: "/ecommerce/banner/edit-banner/:id",
        component: <PrivateRoute> <EditBanner /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Banner List",
        key: "banner-list",
        route: "/ecommerce/banner-list",
        component: <PrivateRoute><BannerList /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    icon: <BrandingWatermark />,
    name: "Brand",
    key: "brand",
    collapse: [
      {
        name: "New Brand",
        key: "new-brand",
        route: "/ecommerce/new-brand",
        component: <PrivateRoute><Brand /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Brand",
        // key: "Edit-brand",
        route: "/ecommerce/brand/edit-brand/:id",
        component: <PrivateRoute> <EditBrand /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Brand List",
        key: "brand-list",
        route: "/ecommerce/brand-list",
        component: <PrivateRoute><BrandList /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    icon: <PlayCircleRounded />,
    name: "Brand Video",
    key: "brand-video",
    collapse: [
      {
        name: "New Brand Video",
        key: "new-brand-video",
        route: "/ecommerce/new-brand-video",
        component: <PrivateRoute><BrandVideo /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Brand",
        // key: "Edit-brand",
        route: "/ecommerce/brand-video/edit-brand-video/:id",
        component: <PrivateRoute> <EditBrandVideo /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Brand Video List",
        key: "brand-video-list",
        route: "/ecommerce/brand-video-list",
        component: <PrivateRoute><BrandVideoList /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    icon: <LocalShipping />,
    name: "Shipping",
    key: "shipping",
    collapse: [
      {
        name: "New Shipping",
        key: "new-category",
        route: "/ecommerce/new-shipping",
        component: <PrivateRoute><Shipping /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Category",
        // key: "Edit-category",
        route: "/ecommerce/shipping/edit-shipping/:id",
        component: <PrivateRoute> <EditShipping /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Shipping List",
        key: "shipping-list",
        route: "/ecommerce/shipping-list",
        component: <PrivateRoute><ShippingList /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    icon: <CategoryOutlined />,
    name: "Category",
    key: "category",
    collapse: [
      {
        name: "New Category",
        key: "new-category",
        route: "/ecommerce/new-category",
        component: <PrivateRoute><Category /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Category",
        // key: "Edit-category",
        route: "/ecommerce/category/edit-category/:id",
        component: <PrivateRoute> <EditCategory /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Category List",
        key: "category-list",
        route: "/ecommerce/category-list",
        component: <PrivateRoute><CategoryList /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    icon: <SubdirectoryArrowLeft />,
    name: "Sub Category",
    key: "sub-category",
    collapse: [
      {
        name: "New Sub Category",
        key: "new-sub-category",
        route: "/ecommerce/new-sub-category",
        component: <PrivateRoute><SubCategory /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Sub Category",
        // key: "Edit-sub-category",
        route: "/ecommerce/sub-category/edit-sub-category/:id",
        component: <PrivateRoute> <EditSubCategory /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Sub Category List",
        key: "category-list",
        route: "/ecommerce/sub-category-list",
        component: <PrivateRoute><SubCategoryList /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    icon: <ProductionQuantityLimits />,
    name: "Products",
    key: "products",
    collapse: [
      {
        name: "New Product",
        key: "new-product",
        route: "/ecommerce/products/new-product",
        component: <PrivateRoute><NewProduct /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Product",
        // key: "edit-product",
        route: "/ecommerce/products/edit-product/:productId",
        component: <PrivateRoute> <EditProduct /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Products List",
        key: "products-list",
        route: "/ecommerce/products/products-list",
        component: <PrivateRoute><ProductsList /></PrivateRoute>,
        auth: true,
      },
      {
        route: "/ecommerce/products/review/:id",
        component: <PrivateRoute><ProductsReviewList /></PrivateRoute>,
        auth: true,
      },
      {
        route: "/ecommerce/products/question/:id",
        component: <PrivateRoute><ProductsQuestionList /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Review Product",
        key: "review-product",
        route: "/ecommerce/products/review",
        component: <PrivateRoute><ProductReview /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    icon: <MoneyOffCsredRounded />,
    name: "Orders",
    key: "orders",
    collapse: [
      {
        name: "Order List",
        key: "order-list",
        route: "/ecommerce/orders/order-list",
        component: <PrivateRoute><OrderList /></PrivateRoute>,
        auth: true,
      },
      {
        route: "/ecommerce/orders/order-details/:id",
        component: <PrivateRoute><OrderDetails /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    icon: <WarehouseRounded />,
    name: "E-warrenty",
    key: "e-warrenty",
    collapse: [
      {
        name: "E-warrenty List",
        key: "ewarrenty-list",
        route: "/ecommerce/ewarrenty/ewarrenty-list",
        component: <PrivateRoute><EwarrentyList /></PrivateRoute>,
        auth: true,
      },
      {
        route: "/ecommerce/ewarrenty/ewarrenty-details/:id",
        component: <PrivateRoute> <EwarrentyDetails /></PrivateRoute>,
        auth: true,
      },
    ],
  },

  {
    // type: "collapse",
    // name: "Authentication",
    // key: "authentication",
    // icon: <VerifiedUserIcon />,
    collapse: [
      {
        name: "Log In",
        key: "sign-in",
        route: "/authentication/sign-in",
        component: <SignInCover />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Campaign",
    key: "campaign",
    icon: <Campaign />,
    collapse: [
      {
        name: "Campaign List",
        key: "Campaign Lists",
        route: "/campaign/campaign-list",
        component: <PrivateRoute><CampaignList /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Campaign",
        route: "/ecommerce/campaign/edit-campaign/:id",
        component: <PrivateRoute><EditCampaign /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Create campaign",
        key: "Create-campaign",
        route: "/campaign/create-campaign",
        component: <PrivateRoute><CreateCampaign /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Offer",
    key: "offer",
    icon: <LocalOffer />,
    collapse: [
      {
        name: "Offer List",
        key: "Offer Lists",
        route: "/offer/offer-list",
        component: <PrivateRoute><OfferList /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Campaign",
        route: "/ecommerce/offer/edit-offer/:id",
        component: <PrivateRoute> <EditOffer /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Create offer",
        key: "Create-offer",
        route: "/offer/create-offer",
        component: <PrivateRoute><CreateOffer /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Coupon",
    key: "coupon",
    icon: <CountertopsOutlined />,
    collapse: [
      {
        name: "Coupon List",
        key: "Coupon Lists",
        route: "/coupon/coupon-list",
        component: <PrivateRoute> <CouponList /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Campaign",
        route: "/ecommerce/coupon/edit-coupon/:id",
        component: <PrivateRoute> <EditCoupon /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Create coupon",
        key: "Create-coupon",
        route: "/coupon/create-coupon",
        component: <PrivateRoute><CreateCoupon /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Pages",
    key: "newPage",
    icon: <PagesOutlined />,
    collapse: [
      {
        name: "Page List",
        key: "Page Lists",
        route: "/ecommerce/page-list",
        component: <PrivateRoute> <NewPageList /></PrivateRoute>,
        auth: true,
      },
      {

        route: "/ecommerce/page/edit-page/:id",
        component: <PrivateRoute> <EditNewPage /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Create Page",
        key: "Create-page",
        route: "/ecommerce/new-page",
        component: <PrivateRoute><NewPage /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Store",
    key: "newStore",
    icon: <Store />,
    collapse: [
      {
        name: "Store List",
        key: "Store-Lists",
        route: "/ecommerce/store-list",
        component: <PrivateRoute> <StoreList /></PrivateRoute>,
        auth: true,
      },
      {

        route: "/ecommerce/store/edit-store/:id",
        component: <PrivateRoute> <EditStore /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Create Store",
        key: "Create-store",
        route: "/ecommerce/new-store",
        component: <PrivateRoute><NewStore /></PrivateRoute>,
        auth: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Settings />,
    collapse: [
      {
        name: "Social Media List",
        key: "Media Lists",
        route: "/social",
        component: <PrivateRoute><EditSocial /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Address List",
        key: "Address Lists",
        route: "/address",
        component: <PrivateRoute><EditAddress /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Career List",
        key: "Career Lists",
        route: "/career/career-list",
        component: <PrivateRoute> <CareerList /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit Career",
        route: "/ecommerce/career/edit-career/:id",
        component: <PrivateRoute><CareerDetails /></PrivateRoute>,
        auth: true,
      },
      {
        name: "Contact List",
        key: "Contact Lists",
        route: "/contact/contact-list",
        component: <PrivateRoute><ContactList /></PrivateRoute>,
        auth: true,
      },
      {
        // name: "Edit contact",
        route: "/ecommerce/contact/edit-contact/:id",
        component: <PrivateRoute><ContactDetails /></PrivateRoute>,
        auth: true,
      },

    ],
  },
  // {
  //   type: "collapse",
  //   name: "Order Track",
  //   key: "Order track",
  //   icon: <DirectionsRunIcon />,
  //   collapse: [
  //     {
  //       route: "/order-track",
  //       name: "Order Track",
  //       key: "settings",
  //       component: <Track />,
  //     },
  //   ],
  // },
];

export default routes;
