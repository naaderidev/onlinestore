import React from "react";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import { authUser } from "@/utils/authentication/serverHelpers";

export default async function page() {
  const user = await authUser();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={user ? true : false} />
      <main className="flex-grow">
        <div className="mx-12 sm:mx-24 my-12" dir="rtl">
          <h1 className="font-Lalezar text-3xl text-teal mb-4">درباره سایت</h1>
          <p className="font-VazirRegular leading-7 tracking-tight text-sm sm:text-base sm:leading-9 text-justify">
            فروشگاه آنلاین کیف و کفش با متافریمورک <strong>Next.js</strong> و
            تکنولوژی <strong>App-Router</strong>
            پیاده سازی شده است. استایل دهی پروژه با استفاده از فریمورک
            <strong>TailwindCSS</strong> صورت گرفته و از
            <strong>MongoDB</strong> برای ذخیره سازی اطلاعات استفاده شده است. در
            پیاده سازی پروژه سعی بر آن شده است تا دو اصل اولیه SOLID یعنی اصل تک
            مسئولتی و اصل باز/بسته در طراحی کامپوننت ها و نوشتن API ها رعایت
            شود. فروشگاه در حال حاضر شامل دو بخش مارکت و پنل کاربری می باشد.
            مشاهده پنل کاربری از طریق ثبت نام و ورود به وبسایت امکان پذیر است.
            درصورت عدم تمایل به ثبت نام لطفا از ایمیل
            <code className="font-bold bg-slate-300 p-1 rounded">
              naaderidev@gmail.com
            </code>{" "}
            و رمزعبور
            <code className="font-bold bg-slate-300 p-1 rounded">
              Naderi#1234
            </code>{" "}
            استفاده کنید.
          </p>
          <h2 className="font-Lalezar text-3xl text-teal my-4">مشخصات سایت</h2>
          <ul className="font-VazirRegular text-sm sm:text-base text-justify leading-7 sm:leading-9 tracking-tight child:mb-1 list-inside indent-4 list-disc">
            <li>
              طراحی سایت به صورت کاملا <strong>Responsive</strong> بوده و در هر
              سه فرمت دسکتاپ، تبلت و موبایل قابل استفاده می باشد.
            </li>
            <li>
              احراز هویت کاربر و ارزیابی صحت اطلاعات به هنگام ثبت نام و ورود به
              سایت با استفاده از پکیج های <strong>jsonwebtoken،</strong>{" "}
              <strong>bcryptjs</strong> و <strong>yup</strong> صورت گرفته است.
            </li>
            <li>
              ورود به پنل کاربری از طریق{" "}
              <strong className="text-tint underline">رمز یکبار مصرف</strong>{" "}
              امکان پذیر است و از پنل پیامکی{" "}
              <strong className="text-tint underline">فراز اس ام اس</strong> در
              این پروژه استفاده شده است.
            </li>
            <li>
              تمامی فرم ها با استفاده از پکیج محبوب و کاربری{" "}
              <strong>Formik</strong> پیاده سازی شده و اعتبارسنجی ورودی های آنها
              قبل از ثبت، با استفاده از پکیج <strong>yup</strong> انجام شده است.
            </li>
            <li>
              در بخش مارکت امکان فیلتر محصولات به طرق مختلف امکان پذیر است از
              جمله کتگوری، برند، جدیدترین محصولات، محصولات با موجودی کامل و
              محصولات نخفیف خورده.
            </li>
            <li>
              لازم به ذکر است که <strong>UI/UX</strong> بخش فیلترینگ مارکت در
              فرمت موبایل متناسب با استفاده هرچه راحتتر کاربر تغییر می کند و
              صفحه بندی مارکت به صورت <strong>custom-component</strong> می
              باشد..
            </li>
            <li>
              در صفحه جزئیات محصول امکان افزودن محصول متناسب با رنگ و سایز
              موردنظر به سبد خرید لحاظ شده و سبد خرید پس از ذخیره در
              <strong>local storage</strong> با ثبت سفارش در دیتابیس ذخیره می
              شود..
            </li>
            <li>
              برای بهبود عملکرد و امنیت سایت، افزودن محصول به لیست علاقه مندی
              ها، افزودن محصول به سبد خرید و ثبت و ارسال دیدگاه برای هر محصول،
              <span className="underline">
                فقط درصورت به ورود به سایت امکان پذیر است.
              </span>
            </li>
            <li>
              دیدگاه های ارسالی برای هر محصول تنها پس از تایید مدیریت سایت به
              دیگران نمایش داده می شود.(بخش پنل مدیریت به سایت افزوده می شود.)
            </li>
            <li>
              سفارش های ثبت شده، لیست علاقه مندی ها، ویرایش پروفایل و ثبت و
              دریافت تیکت در پنل کاربری پیاده شده است.
            </li>
            <li>
              ارتباط کاربر از طریق صفحه Contact و تیکت های پنل کاربری با
              پشتیبانی و مدیریت سایت امکان پذیر است.
            </li>
          </ul>
          <h2 className="font-Lalezar text-3xl text-teal my-4">
            تکنولوژی های سایت
          </h2>
          <ul className="font-VazirRegular child:mb-1 list-inside indent-4 list-disc">
            <li>NextJs</li>
            <li>React</li>
            <li>JWT</li>
            <li>Formik</li>
            <li>Axios</li>
            <li>Mongoose</li>
            <li>Swiper</li>
            <li>Bcryptjs</li>
            <li>Yup</li>
            <li>Aos</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
