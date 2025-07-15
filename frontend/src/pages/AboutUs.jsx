import Logo from "../components/UI/Logo";
import SEOMeta from "../components/Util/SEOMeta";

function AboutUs() {
  return (
    <>
      <SEOMeta title="درباره ما | بارین مارکت" />

      <div className="max-w-5xl mx-auto px-4 py-12 text-right">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h1 className="text-3xl font-bold mb-10 border-b pb-4 text-center">
          درباره ما
        </h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">بارین مارکت چیست؟</h2>
          <p className="leading-loose text-justify">
            <strong>بارین مارکت</strong> یکی از پروژه‌های شرکت{" "}
            <strong>گسترش ارتباط پیام بارین</strong> می‌باشد که با هدف ارائه‌ی
            تجربه‌ای متفاوت در خرید اینترنتی، فعالیت خود را آغاز کرده است. این
            مجموعه با بهره‌گیری از تکنولوژی‌های روز دنیا و تیمی متخصص، سعی در
            فراهم کردن بستری امن، سریع و حرفه‌ای برای خرید آنلاین محصولات مختلف
            دارد.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">ماموریت ما</h2>
          <p className="leading-loose text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">ارزش‌های ما</h2>
          <ul className="list-disc pr-6 space-y-2 leading-loose">
            <li>احترام به حقوق مشتریان و شفافیت در فرایند خرید</li>
            <li>تعهد به کیفیت و خدمات پس از فروش حرفه‌ای</li>
            <li>نوآوری مستمر در بهبود تجربه کاربری</li>
            <li>پاسخ‌گویی سریع و مسئولانه در برابر نیاز مشتری</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">چشم‌انداز آینده</h2>
          <p className="leading-loose text-justify">
            هدف ما توسعه‌ی سبد محصولات، افزایش رضایت مشتریان، و ورود به بازارهای
            بین‌المللی در آینده‌ای نزدیک است. بارین مارکت با بهره‌گیری از فناوری
            و رویکردی مشتری‌محور، در مسیر تبدیل شدن به یکی از برندهای برتر فروش
            آنلاین در کشور حرکت می‌کند.
          </p>
        </section>
      </div>
    </>
  );
}

export default AboutUs;
