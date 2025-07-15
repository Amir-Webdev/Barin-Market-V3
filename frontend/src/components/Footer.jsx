import { Link } from "react-router-dom";
import { LOGO_URL } from "../constants/constants";
import { toPersianDigits } from "../utils/toPersianDigits";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineCurrencyDollar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import {
  RiFacebookLine,
  RiTwitterLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiTelegramLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { useState } from "react";

function Footer() {
  const [lineClamped, setLineClamped] = useState(true);

  const ENAMAD_URL =
    "https://ecommerce-v3.s3.ir-thr-at1.arvanstorage.ir/Defaults%2Fenamad.png?versionId=";

  const SAMANDEHI_URL =
    "https://ecommerce-v3.s3.ir-thr-at1.arvanstorage.ir/Defaults%2Fsamandehi.png?versionId=";

  return (
    <footer className="bg-neutral text-neutral-content bg-surface text-text-primary flex flex-col gap-10 justify-between px-8 sm:px-16 pt-8 pb-24 md:pb-0">
      <div className="flex flex-col lg:flex-row gap-7 justify-between items-center">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex flex-col gap-4 grid-flow-col">
            <Link to="/" className="flex justify-center items-center gap-6 ">
              <img src={LOGO_URL} className="w-12 fill-current" />
              <p className="font-bold">بارین مارکت</p>
            </Link>
          </div>
          <div className="text-[13px] px-5 flex items-center gap-6">
            <p className="font-light">
              {" "}
              شماره تماس:
              <span className="font-bold">
                {" "}
                {toPersianDigits("026123456")}{" "}
              </span>
            </p>
            <div className="border-r-[1.5px] border-slate-500/60 h-4 w-1"></div>
            <p className="leading-normal">
              تمامی هفته از ساعت {toPersianDigits(10)} تا {toPersianDigits(20)}{" "}
              پاسخگو تماس های شما هستیم.
            </p>
          </div>
          <p className="flex text-[13px] font-normal gap-2 items-center px-4">
            <span className="text-base -mt-1">
              <HiOutlineLocationMarker />
            </span>
            کرج، بلوار یادگار امام، مجتمع تجاری نور هشتم، طبقه{" "}
            {toPersianDigits(7)}، واحد {toPersianDigits(7)}
          </p>
          <p className="flex text-[13px] font-normal gap-2 items-center px-4">
            <span className="text-base -mt-1">
              <HiOutlineMail />
            </span>
            barintechnology@gmail.com
          </p>
        </div>
        <div className="flex justify-center items-center gap-8">
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="text-3xl bg-white border p-2 pt-[0.6rem] pl-[0.6rem] rounded-full">
              <HiOutlineShieldCheck />
            </span>
            <p className="text-[13px] font-semibold text-center">
              ضمانت اصالت کالا
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="text-3xl bg-white border p-2 pt-[0.6rem] pl-[0.6rem] rounded-full">
              <HiOutlineCurrencyDollar />
            </span>
            <p className="text-[13px] font-semibold text-center">
              ضمانت بازگشت وجه
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="text-3xl bg-white border p-2 pt-[0.6rem] pl-[0.6rem] rounded-full">
              <HiOutlineTruck />
            </span>
            <p className="text-[13px] font-semibold text-center">
              ارسال سریع کالا
            </p>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-text-primary/25"></div>

      <div className="footer sm:footer-horizontal px-5">
        <nav>
          <h6 className="mb-2 font-semibold">خدمات</h6>
          <Link className="link link-hover text-xs">درباره ما</Link>
          <Link className="link link-hover text-xs">پرسش های متداول</Link>
          <Link className="link link-hover text-xs">تماس با ما</Link>
          <Link className="link link-hover text-xs">خدمات پس از فروش</Link>
        </nav>
        <nav>
          <h6 className="mb-2 font-semibold">راهنمای خرید</h6>
          <Link className="link link-hover text-xs">روند ارسال سفارش</Link>
          <Link className="link link-hover text-xs">
            آموزش فعال سازی موبایل
          </Link>
          <Link className="link link-hover text-xs">ثبت شکایات</Link>
          <Link className="link link-hover text-xs">خرید موبایل</Link>
        </nav>
        <nav>
          <h6 className="mb-2 font-semibold">صفحات مهم وبسایت</h6>
          <Link to="/" className="link link-hover text-xs">
            تماس با ما
          </Link>
          <Link to="/" className="link link-hover text-xs">
            درباره ما
          </Link>
          <Link to="/" className="link link-hover text-xs">
            پاسخ به پرسش های متداول
          </Link>
          <Link to="/terms" className="link link-hover text-xs">
            قوانین و مقررات
          </Link>
          <Link to="/privacy" className="link link-hover text-xs">
            حریم خصوصی
          </Link>
        </nav>
        <nav>
          <h6 className="mb-2 font-semibold">با ما همراه باشید</h6>
          <div className="flex items-center gap-5 text-2xl">
            <a href="#" className="hover:text-primary-dark transition">
              <RiYoutubeLine />
            </a>
            <a href="#" className="hover:text-primary-dark transition">
              <RiInstagramLine />
            </a>
            <a href="#" className="hover:text-primary-dark transition">
              <RiTelegramLine />
            </a>
            <a href="#" className="hover:text-primary-dark transition">
              <RiWhatsappLine />
            </a>
          </div>
        </nav>
      </div>

      <div className="mt-10 px-3 flex flex-col md:flex-row gap-7 justify-between items-center">
        <div className="text-sm space-y-2">
          <h2 className="font-medium">فروشگاه اینترنتی بارین مارکت</h2>
          <p className="font-extralight max-w-lg">
            <span
              className={`text-[13px] leading-8 ${
                lineClamped && "line-clamp-4"
              }`}
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
              ایجاد کرد در این صورت می توان امید داشت که تمام و دشواری موجود در
              ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
              حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود
              طراحی اساسا مورد استفاده قرار گیرد. و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. و جوابگوی سوالات
              پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. و
              جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
              قرار گیرد.
            </span>
            <span
              className="flex items-center gap-1 cursor-pointer text-cyan-600 hover:text-cyan-700 transition mt-1"
              onClick={() => setLineClamped((cur) => !cur)}
            >
              {lineClamped ? (
                <>
                  <span className="font-normal">مشاهده بیشتر</span>
                  <HiOutlineChevronDown className="-mb-1" />{" "}
                </>
              ) : (
                <>
                  <span className="font-normal">مشاهده کمتر</span>
                  <HiOutlineChevronUp className="-mb-1" />
                </>
              )}
            </span>
          </p>
        </div>
        <div className="flex gap-10 justify-center items-center">
          <img src={ENAMAD_URL} alt="اینماد" className="h-32 w-32" />
          <img src={SAMANDEHI_URL} alt="ساماندهی" className="h-32 w-32" />
        </div>
      </div>

      <div className="w-full border-t border-text-primary/25"></div>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center -mt-4 -pb-9 text-text-primary/50 text-xs">
        <p className="leading-6">
          تمامی حقوق وبسایت بارین مارکت متعلق به شرکت گسترش ارتباط پیام بارین
          میباشد.
        </p>
        <p>BarinCo. Copyright {new Date().getFullYear()} &copy;</p>
      </div>
    </footer>
  );
}

export default Footer;
