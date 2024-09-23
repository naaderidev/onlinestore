import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header";
import Categories from "@/components/templates/home/Categories";
import QuickAccess from "@/components/templates/home/QuickAccess";
import HandPicked from "@/components/templates/home/HandPicked";
import Brands from "@/components/templates/home/Brands";
import Application from "@/components/templates/home/Application";
import Offers from "@/components/templates/home/Offers";
import { authUser } from "@/utils/authentication/serverHelpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handpickModel from "@/models/Handpick";

export default async function page() {
  const user = await authUser();
  const handpicks = await handpickModel.find({}).lean();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={user ? true : false} />
      <main className="flex-grow">
        <section className="hidden sm:flex-center p-2 bg-slate-200">
          <div className="subtitle-sm text-center">
            We are currently experiencing local customs clearance delays. For
            the latest updates, please check your order status here
          </div>
        </section>
        <section className="bg-hero-pattern baner"></section>
        <Categories />
        <QuickAccess />
        <HandPicked handpicks={JSON.parse(JSON.stringify(handpicks))} />
        <Brands />
        <Application />
        <Offers />
      </main>
      <Footer />
      <ToastContainer position="bottom-left" theme="dark" />
    </div>
  );
}
